import {
  mount,
  shallowMount
} from 'dp-test'
import ComMobileMenu from 'components/modules/mobile-menu/mobile-menu.vue'
import ComButton from 'elements/button/button.vue'
import ComAccordionGroup from 'elements/accordion/src/accordion-group.vue'
import ComAccordion from 'elements/accordion/src/accordion.vue'
import sinon from 'sinon'
import _ from 'lodash'

const navbarItems = [
  {
    'label': 'Insurance',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare insurance',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'travel-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Travel Insurance',
            'url': '/sg/travel-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'car-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Car Insurance',
            'url': '/sg/car-insurance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'health-insurance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Driver & Passenger\' Personal Accident',
            'url': '/sg/personal-accident',
            'target': ''
          }
        ]
      },
      {
        'title': 'Promotion',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'Learn a bunch of stuff here',
            'description': 'Don\'t miss the exclusive campaign because you don\'t want to',
            'target': '_self'
          }
        ]
      }
    ]
  }
]

function createWrapper(options) {
  let shallowOption = _.merge({
    propsData: {
      title: 'Menu',
      home: {
        label: 'Home',
        url: '/sg'
      },
      itemsTitle: 'Compare:',
      items: navbarItems
    },
    stubs: {
      'dp-button': ComButton,
      'dp-accordion-group': ComAccordionGroup,
      'dp-accordion': ComAccordion
    }
  }, options || {})
  return shallowMount(ComMobileMenu, shallowOption)
}

function generateWrapper(option) {
  return mount(ComMobileMenu, _.merge(option, {}))
}

describe('modules/Com Mobile Menu', () => {
  describe('cases without Timers', () => {
    let wrapper
    let sanbox

    beforeEach(() => {
      sanbox = sinon.createSandbox()
      wrapper = createWrapper()
    })

    afterEach(() => {
      wrapper.destroy()
      sanbox.restore()
    })

    it('when mobile menu is set, mobile menu should be shown', () => {
      wrapper = createWrapper()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('when mobile menu is resized, mobile menu resize should be triggered', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.isOpen).toBe(false)
      expect(wrapper.vm.isClosing).toBe(false)
      expect(wrapper.vm.resizeTimeout).not.toBe(false)
    })

    it('when $screen.resize changed, mobile menu toggleOpen should be triggered', () => {
      let resizeStub = sanbox.stub()
      wrapper = generateWrapper({
        data() {
          return {
            isOpen: true
          }
        },
        methods: {
          toggleOpen: resizeStub
        },
        mocks: {
          $screen: {
            resize: 1,
            desktop: () => true
          }
        }
      })
      wrapper.vm.$screen.resize = 2
      expect(resizeStub.called).toBe(true)
    })

    it('when mobile menu items is set, mobile menu items length should be correct', () => {
      wrapper = createWrapper()
      expect(wrapper.findAll('.dp-accordion').length).toBe(1)
    })

    it('when mobile menu item content is clicked, mobile menu item content should be shown', () => {
      wrapper = createWrapper()
      wrapper.findAll('.accordion__header').at(0).trigger('click')
      expect(wrapper.findAll('.dp-accordion').at(0).classes()).toContain('dp-accordion--expanded')
    })

    it('when mobile menu props title is set, mobile menu title should be correct', () => {
      let text = 'Hey Men!'
      wrapper = createWrapper()
      wrapper.setProps({
        title: text
      })
      expect(wrapper.findAll('.dp-mobile-menu__header span').at(0).text()).toBe(text)
    })

    it('when mobile menu props home is set, mobile menu home should be correct', () => {
      let obj = {
        label: 'HoHo',
        url: 'http://google.com'
      }
      wrapper = shallowMount(ComMobileMenu, _.merge({
        propsData: {
          home: obj
        }
      }))
      expect(wrapper.findAll('.dp-mobile-menu__header + .dp-mobile-menu__blocks span').at(0).text()).toBe(obj.label)
      expect(wrapper.findAll('.dp-mobile-menu__header + .dp-mobile-menu__blocks .dp-button--text').at(0).attributes().href).toBe(obj.url)
    })

    it('when mobile menu props compare is set, mobile menu compare should be correct', () => {
      let text = 'Hallllloooooooooo'
      wrapper = createWrapper()
      wrapper.setProps({
        itemsTitle: text
      })
      expect(wrapper.findAll('.accordion-group__title span').at(0).text()).toBe(text)
    })

    it('when mobile menu props items is not set, mobile menu items should be empty by default', () => {
      wrapper = shallowMount(ComMobileMenu, _.merge({
        propsData: {
          title: 'Menu',
          home: {
            label: 'Home',
            url: '/sg'
          },
          itemsTitle: 'Compare:'
        }
      }))
      expect(wrapper.vm.items).toEqual([])
    })

    it('when mobile menu is destroyed, mobile menu destroy should be called', () => {
      const spy = sinon.stub()
      wrapper = createWrapper({
        destroyed() {
          spy()
        }
      }).destroy()
      expect(spy.calledOnce).toBe(true)
      wrapper = createWrapper() // So it will not break in afterEach wrapper.destroy()
    })
  })
  describe('cases with Timers', () => {
    let wrapper
    let sanbox
    let clock

    beforeEach(() => {
      sanbox = sinon.createSandbox()
      wrapper = createWrapper()
      clock = sinon.useFakeTimers()
    })

    afterEach(() => {
      wrapper.destroy()
      sanbox.restore()
      clock.restore()
    })

    it('when mobile menu is closed, mobile menu should be hidden', () => {
      wrapper = shallowMount(ComMobileMenu, _.merge({
        propsData: {
          items: navbarItems
        }
      }))
      wrapper.vm.toggleOpen()
      expect(wrapper.find('.dp-mobile-menu').classes()).toContain('dp-mobile-menu--opened')
      wrapper.findAll('.dp-mobile-menu__close').at(0).trigger('click')
      clock.tick(300)
      expect(wrapper.find('.dp-mobile-menu').classes()).not.toContain('dp-mobile-menu--opened')
    })

    it('when mobile menu toggled open, mobile menu toggleOpen should be triggered', () => {
      wrapper = createWrapper()
      wrapper.vm.toggleOpen()
      expect(wrapper.vm.isOpen).toBe(true)
      expect(wrapper.vm.isClosing).toBe(true)
      expect(document.body.style._values.overflow).toBe('hidden')
      wrapper.vm.toggleOpen()
      expect(wrapper.vm.isOpen).toBe(false)
      expect(wrapper.vm.isClosing).toBe(true)
      expect(document.body.style._values).not.toHaveProperty('overflow')
      clock.tick(300)
      expect(wrapper.vm.isClosing).toBe(false)
      expect(wrapper.vm.closeTimeout).not.toBe(false)
    })

    it('when mobile menu openMobileMenu is emitted, mobile menu openMobileMenu should be triggered', () => {
      wrapper = createWrapper()
      wrapper.vm.$root.$emit('openMobileMenu')
      expect(wrapper.vm.isOpen).toBe(true)
      expect(wrapper.vm.isClosing).toBe(true)
      clock.tick(300)
      expect(wrapper.vm.isClosing).toBe(false)
      expect(wrapper.vm.closeTimeout).not.toBe(false)
      expect(wrapper.vm.$root.__emitted).toHaveProperty('openMobileMenu')
    })
  })
})
