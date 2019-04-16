import { shallowMount, mount } from 'dp-test'
import ComAccordion from 'elements/accordion/src/accordion.vue'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import ComAccordionGroup from 'elements/accordion/src/accordion-group.vue'
import sinon from 'sinon'
import _ from 'lodash'
describe('elements/Accordion', () => {
  let wrapper
  let sanbox
  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComAccordion, _.merge({}, options || {}))
  }

  function createAccordion(option) {
    const Accordion = {
      data () {
        return {
          title: 'What is Travel Insurance?',
          body: 'It is important.',
          iconPosition: 'left',
          ...option
        }
      },
      components: {
        ComAccordion
      },
      template: `<com-accordion :icon-position="iconPosition">
                  <span slot="header">{{ title }}</span>
                  {{ body }}
                 </com-accordion>`
    }
    return mount(Accordion, {
      attachToDocument: true
    })
  }

  function createAccordionGroup(option) {
    const AccordionGroup = {
      data () {
        return {
          title: 'Filter By',
          titleBorder: false,
          ...option
        }
      },
      components: {
        ComAccordion,
        ComAccordionGroup
      },
      template: `<com-accordion-group :title-border="titleBorder">
                    <h4 slot="title" class="dp-title">Group Title</h4>
                    <template slot="accordion">
                      <com-accordion v-for="i of 3" :key="i">
                        <span slot="header">Sample</span>
                        Some content here
                      </com-accordion>
                    </template>
                 </com-accordion-group>`
    }
    return mount(AccordionGroup, {
      attachToDocument: true
    })
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })
  it('when accordion title is set then title should be correct', () => {
    wrapper = createAccordion()
    expect(wrapper.find('.accordion__header').text()).toBe('What is Travel Insurance?')
  })
  it('when accordion body is set then body should be correct', () => {
    wrapper = createAccordion()
    expect(wrapper.find('.accordion__body-inner').text()).toBe('It is important.')
  })
  it('when accordion is clicked then accordion should collapse', () => {
    wrapper = createAccordion()
    wrapper.find('.accordion__header').trigger('click')
    expect(wrapper.find('.dp-accordion').classes()).toContain('dp-accordion--expanded')
  })
  it('when accordion is resize then accordion should update', () => {
    wrapper = generateWrapper()
    // How to test a <transition>?
    wrapper.vm.onEnter(wrapper.vm.$el.querySelector('.accordion__body'))
    wrapper.vm.afterEnter(wrapper.vm.$el.querySelector('.accordion__body'))
    wrapper.vm.onLeave(wrapper.vm.$el.querySelector('.accordion__body'))
    wrapper.vm.afterLeave(wrapper.vm.$el.querySelector('.accordion__body'))
    window.dispatchEvent(new Event('resize'))
    expect(wrapper.vm.expanded).toBe(false)
  })
  it('when accordion iconPosition is set to right then icon should be correct', () => {
    wrapper = createAccordion({ iconPosition: 'right' })
    expect(wrapper.find('.dp-accordion').classes()).toContain('dp-accordion--icon-right')
  })
  it('when accordion group titleBorder is set to true then title should be bordered', () => {
    wrapper = createAccordionGroup({ titleBorder: true })
    expect(wrapper.find('.dp-accordion-group').classes()).toContain('is-title-bordered')
  })
  describe('Keyboard Support', () => {
    function tabindexes (arraywrapper) {
      return arraywrapper.wrappers.map(wrapper => wrapper.attributes().tabindex)
    }
    it('should set tabindex to 0 on first accordion by default', () => {
      wrapper = createAccordionGroup()
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['0', '-1', '-1'])
    })

    it('should move forward only when user press DOWN key', () => {
      wrapper = createAccordionGroup()
      wrapper.find('.accordion__header').element.focus()
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['-1', '0', '-1'])
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_LEFT
      })
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['-1', '0', '-1'])
    })

    it('should move forward only when user press UP key', () => {
      wrapper = createAccordionGroup()
      wrapper.find('.accordion__header').element.focus()
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_UP
      })
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['-1', '-1', '0'])
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_RIGHT
      })
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['-1', '-1', '0'])
    })

    it('should set tabindex to 0 on first expanded accordion when user focus out', () => {
      wrapper = createAccordionGroup()
      wrapper.find('.accordion__header').element.focus()
      // Expand the 2 last accordion
      wrapper.findAll('.accordion__header').at(1).trigger('click')
      wrapper.findAll('.accordion__header').at(2).trigger('click')
      wrapper.trigger('focusout')
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['-1', '0', '-1'])
    })

    it('should set tabindex to 0 on first accordion when user focus out and no accordion is expanded', () => {
      wrapper = createAccordionGroup()
      wrapper.find('.accordion__header').element.focus()
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      wrapper.trigger('focusout')
      expect(tabindexes(wrapper.findAll('.accordion__header'))).toEqual(['0', '-1', '-1'])
    })

    it('should toggle view on focused accordion when user press ENTER or SPACE', () => {
      wrapper = createAccordionGroup()
      wrapper.findAll('.accordion__header').at(1).element.focus()
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ENTER
      })
      expect(wrapper.findAll('.dp-accordion').at(1).classes()).toEqual(['dp-accordion', 'dp-accordion--expanded', 'dp-accordion--icon-left'])
      wrapper.trigger('keydown', {
        key: KEY_VALUES.SPACE
      })
      expect(wrapper.findAll('.dp-accordion').at(1).classes()).toEqual(['dp-accordion', 'dp-accordion--icon-left'])
    })
  })
})
