import {
  shallowMount
} from 'dp-test'
import ComNavbar from 'components/modules/navbar/navbar.vue'
import ComMegamenu from 'elements/megamenu/megamenu.vue'
import ComButton from 'elements/button/button.vue'
import sinon from 'sinon'
import _ from 'lodash'

const brand = {
  'country': '',
  'type': '',
  'fallbackLogo': 'https://picsum.photos/121/36',
  'fallbackTagline': 'https://picsum.photos/121/11'
}

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
  },
  {
    'label': 'Credit cards',
    'url': 'https://www.xxxxxx.com/sg/credit-card',
    'active': false,
    'megamenu': [
      {
        'title': 'Compare credit cards',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'brand',
            'iconCategory': 'promotion',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Promotion',
            'url': '/sg/promotion',
            'target': ''
          },
          {
            'iconType': 'brand',
            'iconCategory': 'reward',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Reward',
            'url': '/sg/reward',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'ewallet',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Ewallet',
            'url': '/sg/ewallet',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'robofinance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Robofinance',
            'url': '/sg/robofinance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'stocks',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Stocks',
            'url': '/sg/stocks',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'bonds',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Bonds',
            'url': '/sg/bonds',
            'target': ''
          }
        ]
      },
      {
        'title': 'GoBear Credit cards',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/credit-cards',
            'title': 'New Credit cards',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Loans',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare loans',
        'type': 'link',
        'layout': '',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'personal-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Personal Loan',
            'url': '/sg/personal-loan',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'home-loan',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Home Loan',
            'url': '/sg/home-loan',
            'target': ''
          }
        ]
      },
      {
        'title': 'GoBear TV',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'EP 22: Top 5 personal loan myths',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Banking',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare banking products',
        'type': 'link',
        'layout': 'two-column',
        'items': [
          {
            'iconType': 'product',
            'iconCategory': 'savings-account',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Saving account',
            'url': '/sg/savings-account',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'fixed-deposit',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Fixed deposit',
            'url': '/sg/fixed-deposit',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'ewallet',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Ewallet',
            'url': '/sg/ewallet',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'robofinance',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Robofinance',
            'url': '/sg/robofinance',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'stocks',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Stocks',
            'url': '/sg/stocks',
            'target': ''
          },
          {
            'iconType': 'product',
            'iconCategory': 'bonds',
            'iconDisplay': 'dp-icon--sm-only',
            'label': 'Bonds',
            'url': '/sg/bonds',
            'target': ''
          }
        ]
      },
      {
        'title': 'Blog',
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
  },
  {
    'label': 'Blog',
    'url': 'https://www.xxxxxx.com/sg/blog',
    'active': false,
    'megamenu': []
  }
]

function createWrapper(options) {
  let shallowOption = _.merge({
    propsData: {
      brand: brand,
      items: navbarItems
    },
    stubs: {
      'dp-button': ComButton,
      'dp-megamenu': ComMegamenu
    }
  }, options || {})
  return shallowMount(ComNavbar, shallowOption)
}

function createMockDiv(width, height) {
  const div = document.createElement('div')
  Object.assign(div.style, {
    width: width + 'px',
    height: height + 'px'
  })
  div.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height
  })
  return div
}

describe('modules/Com Navbar', () => {
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

    it('when navbar is scrolled, navbar scroll should be triggered', () => {
      wrapper = createWrapper()
      wrapper.vm.handleScroll()
      expect(wrapper.vm.isScrolled).toBe(false)
      sanbox.stub(window, 'scrollY').value(4)
      wrapper.vm.handleScroll()
      expect(wrapper.vm.isScrolled).toBe(true)
    })

    it('when navbar is active and not fixed, body should be overflowX hidden', () => {
      wrapper = createWrapper()
      wrapper.setData({
        isActive: true,
        isFixed: false
      })
      wrapper.vm.toggleOverflow()
      expect(document.body.style.overflowX).toBe('hidden')
      wrapper.setData({
        isActive: true,
        isFixed: true
      })
      wrapper.vm.toggleOverflow()
      expect(document.body.style.overflowX).toBe('')
    })

    it('when navbar content is positioned, navbar content should be positioned correctly', () => {
      let el = null
      wrapper = createWrapper()
      el = createMockDiv(1000, 283)
      wrapper.vm.subPosition(3, el, 1001)
      expect(wrapper.findAll('.dp-navbar__bg').at(0).attributes().style).toBe('transform: translate(1001px) scale(2.5, 1.415);')
      el = createMockDiv(300, 200)
      wrapper.vm.subPosition(3, el, 299)
      expect(wrapper.findAll('.dp-navbar__bg').at(0).attributes().style).toBe('transform: translate(299px) scale(0.75, 1);')
    })

    it('when navbar items is set, navbar items length should be correct', () => {
      wrapper = createWrapper()
      expect(wrapper.findAll('.dp-navbar__item').length).toBe(5)
    })

    it('when navbar transition started, navbar transition enter should be triggered', () => {
      wrapper = createWrapper()
      wrapper.vm.transEnter(wrapper.vm.$el.querySelector('.dp-navbar__sub'))
      expect(wrapper.findAll('.dp-navbar__bg').at(0).attributes().style).toBe('transform: translate(0px) scale(0, 0);')
      expect(wrapper.findAll('.dp-navbar__content').at(0).attributes().style).toBe('transform: translateX(0px);')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('when navbar toggle is clicked, openMobileMenu should be emitted', () => {
      wrapper = createWrapper()
      wrapper.findAll('.dp-navbar__toggle').at(0).trigger('click')
      expect(wrapper.vm.$root.__emitted).toHaveProperty('openMobileMenu')
    })

    it('props items should be default []', () => {
      wrapper = shallowMount(ComNavbar, _.merge({
        propsData: {
          brand: brand
        }
      }))
      expect(wrapper.vm.menuItems).toEqual([])
    })

    it('when call showContent should change item correctly', () => {
      let event = {}
      wrapper = createWrapper({
        propsData: {
          items: [
            {
              'label': 'A',
              'url': 'https://www.xxxxxx.com/sg/a',
              'active': false,
              'megamenu': []
            },
            {
              'label': 'B',
              'url': 'https://www.xxxxxx.com/sg/b',
              'active': false,
              'megamenu': []
            }
          ]
        }
      })
      expect(wrapper.vm.menuItems[1].active).toBe(false)
      wrapper.vm.showContent(event, 1)
      expect(wrapper.vm.menuItems[1].active).toBe(true)
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

    it('when navbar item content is hovered, navbar item content should be shown', () => {
      wrapper = createWrapper()
      wrapper.findAll('.dp-navbar__item').at(3).trigger('mouseenter')
      expect(wrapper.vm.menuItems[3].active).toBe(true)
      wrapper.findAll('.dp-navbar__item').at(3).trigger('mouseleave')
      clock.tick(300)
      expect(wrapper.vm.menuItems[3].active).toBe(false)
    })

    it('when navbar item sub is hovered, navbar item sub should be shown', () => {
      wrapper = createWrapper()
      wrapper.findAll('.dp-navbar__sub').at(0).trigger('mouseenter')
      expect(wrapper.vm.menuItems[0].active).toBe(true)
      expect(wrapper.vm.isActive).toBe(true)
      wrapper.findAll('.dp-navbar__sub').at(0).trigger('mouseleave')
      expect(wrapper.vm.isActive).toBe(false)
      clock.tick(300)
      expect(wrapper.vm.menuItems[0].active).toBe(false)
    })

    it('when showContent is called, navbar toggleOverflow should be triggered', () => {
      let toggleOverflowStub = sanbox.stub()
      let event = {}
      wrapper = createWrapper({
        propsData: {
          items: [
            {
              'label': 'A',
              'url': 'https://www.xxxxxx.com/sg/a',
              'active': false,
              'megamenu': []
            },
            {
              'label': 'B',
              'url': 'https://www.xxxxxx.com/sg/b',
              'active': false,
              'megamenu': []
            }
          ]
        },
        methods: {
          toggleOverflow: toggleOverflowStub
        }
      })
      wrapper.vm.showContent(event, 1)
      clock.tick(300)
      expect(toggleOverflowStub.called).toBe(true)
      expect(toggleOverflowStub.calledOnce).toBe(true)
    })

    it('when hideContent is called, navbar toggleOverflow should be triggered', () => {
      let toggleOverflowStub = sanbox.stub()
      let event = {}
      wrapper = createWrapper({
        propsData: {
          items: [
            {
              'label': 'A',
              'url': 'https://www.xxxxxx.com/sg/a',
              'active': false,
              'megamenu': []
            },
            {
              'label': 'B',
              'url': 'https://www.xxxxxx.com/sg/b',
              'active': false,
              'megamenu': []
            }
          ]
        },
        methods: {
          toggleOverflow: toggleOverflowStub
        }
      })
      wrapper.vm.hideContent(event, 1)
      clock.tick(300)
      expect(toggleOverflowStub.called).toBe(true)
      expect(toggleOverflowStub.calledOnce).toBe(true)
    })

    it('when call hideContent and item.active is false, should not change data', () => {
      let event = {}
      wrapper = createWrapper({
        propsData: {
          items: [
            {
              'label': 'A',
              'url': 'https://www.xxxxxx.com/sg/a',
              'active': false,
              'megamenu': []
            },
            {
              'label': 'B',
              'url': 'https://www.xxxxxx.com/sg/b',
              'active': false,
              'megamenu': []
            }
          ]
        },
        data() {
          return {
            noTransition: false,
            leftTimeout: null,
            showBackground: true
          }
        }
      })
      expect(wrapper.vm.menuItems[1].active).toBe(false)
      expect(wrapper.vm.leftTimeout).toBe(null)
      expect(wrapper.vm.showBackground).toBe(true)
      expect(wrapper.vm.noTransition).toBe(false)
      wrapper.vm.hideContent(event, 1)
      expect(wrapper.vm.leftTimeout).not.toBe(null)
      clock.tick(300)
      expect(wrapper.vm.menuItems[1].active).toBe(false)
      expect(wrapper.vm.showBackground).toBe(false)
      expect(wrapper.vm.noTransition).toBe(true)
    })
  })
})
