import {
  mount,
  shallowMount,
  createLocalVue
} from 'dp-test'

import ComPopover from 'components/elements/popover/src/popover.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('elements/Popover', () => {
  let wrapper
  let sandBox
  let localVue = createLocalVue()

  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return mount(ComPopover, _.merge({
      propsData: {
        title: 'Good to know',
        content: 'Some banks may have different limits on the loan amount based on your income.',
        closeLabel: 'TAP TO DISMISS'
      },
      methods: {
        destroy: () => {}
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sandBox.restore()
  })

  it('when title is set then popover title should be correct', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      title: 'Hey!'
    })
    expect(wrapper.find('.dp-popover__popup .dp-popover__title h3').text()).toBe('Hey!')
  })

  it('when content is set then popover content should be correct', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      content: 'Barbara!'
    })
    expect(wrapper.find('.dp-popover__popup .dp-popover__content div').text()).toBe('Barbara!')
  })

  it('when close label is set then popover close label should be correct', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      closeLabel: 'Oops.'
    })
    wrapper.vm.$screen.resize = () => {
      return true
    }
    wrapper.vm.$screen.mobile = () => {
      return true
    }
    expect(wrapper.find('.dp-popover__popup .dp-popover__close').text()).toBe('Oops.')
  })

  it('when width is set then popover width should be correct', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      width: 440
    })
    expect(wrapper.find('.dp-popover__popup').attributes().style).toMatch(/width: 440px;/)
  })

  it('when always is set then popover should be shown always', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      trigger: 'click',
      appendToBody: true,
      always: true
    })
    // https://github.com/vuejs/vue-test-utils/issues/52#issuecomment-384949284
    expect(wrapper.find('.dp-popover__popup')).not.toBeNull()
  })

  it('when disabled is set then popover should be disabled', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      appendToBody: true,
      disabled: true
    })
    expect(wrapper.find('.dp-popover').classes()).toContain('dp-popover--disabled')
  })

  it('when disabled is not set then popover should not be disabled', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      appendToBody: true,
      disabled: false
    })
    expect(wrapper.find('.dp-popover').classes()).not.toContain('dp-popover--disabled')
  })

  it('when popover hidden then popover should not be displayed', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setData({
      popper: true
    })
    document.body.dispatchEvent(new Event('click'))
    expect(wrapper.vm.isShow).toBe(false)
  })

  it('when popover is clicked then popover should be displayed', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      trigger: 'click',
      appendToBody: true
    })
    wrapper.setData({
      isShow: true
    })
    wrapper.find('.dp-popover').trigger('click')
    expect(wrapper.vm.isShow).toBe(true)
  })

  it('when popover is resized to mobile then popover view should be mobile', () => {
    wrapper = generateWrapper({
      localVue
    })
    wrapper.vm.$screen.resize = () => {
      return false
    }
    wrapper.vm.$screen.mobile = () => {
      return false
    }
    wrapper.vm.$screen.resize = () => {
      return true
    }
    wrapper.vm.$screen.mobile = () => {
      return true
    }
    expect(wrapper.vm.mobileView).toBe(true)
  })

  it('when window resized and in mobile view then body class should exist', () => {
    let clock = sandBox.useFakeTimers()
    wrapper = generateWrapper({
      localVue
    })
    window.dispatchEvent(new Event('resize'))
    wrapper.setData({
      mobileView: true
    })
    wrapper.vm.$screen.resize = () => {
      return true
    }
    wrapper.vm.$screen.mobile = () => {
      return true
    }
    clock.tick(500)
    expect(document.body.className).toContain('dp-popover--mobile')
  })

  it('when window resized and not in mobile view then body class should not exist', () => {
    let clock = sandBox.useFakeTimers()
    wrapper = mount(ComPopover, {
      propsData: {
        title: 'Good to know',
        content: 'Some banks may have different limits on the loan amount based on your income.',
        closeLabel: 'TAP TO DISMISS'
      },
      data() {
        return {
          mobileView: false
        }
      }
    })
    window.dispatchEvent(new Event('resize'))
    wrapper.vm.$screen.resize = () => {
      return true
    }
    wrapper.vm.$screen.mobile = () => {
      return false
    }
    clock.tick(500)
    expect(document.body.className).not.toContain('dp-popover--mobile')
  })

  it('when popover is not clicked then body opened class should not exist', () => {
    let clock = sandBox.useFakeTimers()
    wrapper = generateWrapper({
      localVue
    })
    wrapper.setProps({
      trigger: 'click',
      appendToBody: true
    })
    document.body.dispatchEvent(new Event('click'))
    clock.tick(300)
    expect(document.body.className).not.toContain('dp-popover--opened')
  })

  it('call runPopper when disabled is false', () => {
    let runPopper = sandBox.stub()
    wrapper = generateWrapper({
      propsData: {
        disabled: true
      },
      methods: {
        runPopper: runPopper
      },
      localVue
    })
    wrapper.setProps({
      disabled: false
    })
    expect(runPopper.called).toBeTruthy()
  })

  it('when always is setted true, popover should be visible by default', () => {
    wrapper = shallowMount(ComPopover, {
      propsData: {
        always: true,
        appendToBody: true
      }
    })
    expect(wrapper.isVisible()).toBeTruthy()
  })

  it('mobileView should return false when $screen is undefined', () => {
    wrapper = generateWrapper({
      mocks: {
        $screen: undefined
      }
    })
    expect(wrapper.vm.mobileView).toBe(false)
  })

  it('when trigger is not hover, run hidePopper , isShow should be false imediately', () => {
    wrapper = generateWrapper({
      propsData: {
        trigger: 'click'
      },
      data() {
        return {
          isShow: true
        }
      }
    })
    wrapper.vm.hidePopper()
    expect(wrapper.vm.isShow).toBe(false)
    expect(wrapper.vm.timer).not.toBeNull()
  })

  it('Given timer is not null,clearTimer should be called with timer', () => {
    let clearTimeoutStub = sandBox.stub()
    Object.defineProperty(global, 'clearTimeout', {
      value: clearTimeoutStub
    })
    wrapper = generateWrapper({
      data() {
        return {
          timer: setTimeout(() => {}, 0)
        }
      }
    })
    wrapper.vm.showPopper()
    expect(wrapper.vm.isShow).toBe(true)
    expect(clearTimeoutStub.calledWith(wrapper.vm.timer)).toBe(true)
    expect(clearTimeoutStub.calledWith(wrapper.vm.popperTimer)).toBe(false)
  })

  it('Given popperTimer is not null,clearTimer should be called with popperTimer', () => {
    let clearTimeoutStub = sandBox.stub()
    Object.defineProperty(global, 'clearTimeout', {
      value: clearTimeoutStub
    })
    wrapper = generateWrapper({
      data() {
        return {
          popperTimer: setTimeout(() => {}, 0)
        }
      }
    })
    wrapper.vm.showPopper()
    expect(wrapper.vm.isShow).toBe(true)
    expect(clearTimeoutStub.calledWith(wrapper.vm.timer)).toBe(false)
    expect(clearTimeoutStub.calledWith(wrapper.vm.popperTimer)).toBe(true)
  })

  it('when run resizePopper , and resizeTimer was null , should call clearTimeout with resizeTimer', () => {
    let clearTimeoutStub = sandBox.stub()
    Object.defineProperty(global, 'clearTimeout', {
      value: clearTimeoutStub
    })
    wrapper = generateWrapper({
      data() {
        return {
          resizeTimer: setTimeout(() => {}, 0)
        }
      }
    })
    wrapper.vm.resizePopper()
    expect(clearTimeoutStub.called).toBe(true)
  })

  it('when run createInstance, and popper is not null , called popper.update', () => {
    let updateStub = sandBox.stub()
    wrapper = generateWrapper({
      data() {
        return {
          popper: {
            update: updateStub
          }
        }
      }
    })
    wrapper.vm.createInstance()
    expect(updateStub.called).toBe(true)
  })

  it('when run createInstance, and pass flipPosition, offsetOption, preventOverflowOption, expect to call new Popper with those functions', () => {
    wrapper = generateWrapper({
      propsData: {
        flipPosition: 'test',
        offsetOption: 'test',
        preventOverflowOption: 'test',
        appendToBody: true
      }
    })
    wrapper.vm.createInstance()
    expect(wrapper.vm.popperOptions.modifiers.flip.behavior).toBe('test')
    expect(wrapper.vm.popperOptions.modifiers.preventOverflow).toBe('test')
    expect(wrapper.vm.popperOptions.modifiers.offset).toBe('test')
  })

  it('when run createInstance, and not pass flipPosition, offsetOption, preventOverflowOption, expect to call new Popper with those functions', () => {
    wrapper = generateWrapper({
      propsData: {
        appendToBody: true
      }
    })
    wrapper.vm.createInstance()
    expect(wrapper.vm.popperOptions.modifiers.flip.behavior).toBe('flip')
    expect(wrapper.vm.popperOptions.modifiers.preventOverflow).toEqual({})
    expect(wrapper.vm.popperOptions.modifiers.offset).toEqual({})
  })

  it('when handleClick ,and target is not in $el, and is show is true, run hidePopper', () => {
    let propatationStub = sandBox.stub()
    let hideStub = sandBox.stub()
    let mockEvent = {
      target: document.createElement('div'),
      stopPropagation: propatationStub
    }
    wrapper = generateWrapper({
      data() {
        return {
          isShow: true
        }
      },
      methods: {
        hidePopper: hideStub
      }
    })
    wrapper.vm.handleClick(mockEvent)
    expect(propatationStub.called).toBe(true)
    expect(hideStub.called).toBe(true)
  })

  it('when handleClick ,and target in $el, and is show is false, run createInstance', () => {
    let propatationStub = sandBox.stub()
    let showStub = sandBox.stub()
    let el = document.createElement('div')
    wrapper = generateWrapper({
      data() {
        return {
          isShow: false
        }
      },
      methods: {
        createInstance: showStub
      }
    })
    wrapper.vm.$el.appendChild(el)
    let mockEvent = {
      target: el,
      stopPropagation: propatationStub
    }
    wrapper.vm.handleClick(mockEvent)
    expect(propatationStub.called).toBe(true)
    expect(showStub.called).toBe(true)
  })

  it('when handleClick ,and target in $el, and is show is true, run showPopper', () => {
    let propatationStub = sandBox.stub()
    let hideStub = sandBox.stub()
    let el = document.createElement('div')
    wrapper = generateWrapper({
      data() {
        return {
          isShow: true
        }
      },
      methods: {
        hidePopper: hideStub
      }
    })
    wrapper.vm.$el.appendChild(el)
    let mockEvent = {
      target: el,
      stopPropagation: propatationStub
    }
    wrapper.vm.handleClick(mockEvent)
    expect(propatationStub.called).toBe(true)
    expect(hideStub.called).toBe(true)
  })

  it('dp-popover__popup should contain correct class case popoverClass is setted a value', () => {
    wrapper = generateWrapper()
    wrapper.setProps({
      popoverClass: 'testclass'
    })
    expect(wrapper.find('.dp-popover__popup').classes()).toContain('testclass')
  })

  it('when not pass flipPosition, expect it to be `flip`', () => {
    expect(wrapper.vm.flipPosition).toBe('flip')
  })

  it('validate flipPosition validator', () => {
    const flipPosition = wrapper.vm.$options.props.flipPosition
    expect(flipPosition.type).toEqual([Array, String])
    expect(flipPosition.required).toBeFalsy()
    expect(flipPosition.default).toBe('flip')
    expect(typeof flipPosition.validator).toBe('function')
    expect(flipPosition.validator('testtest')).toBeFalsy()
    expect(flipPosition.validator('clockwise')).toBeTruthy()
    expect(flipPosition.validator('counterclockwise')).toBeTruthy()
    expect(flipPosition.validator(['top', 'right', 'bottom'])).toBeTruthy()
    expect(flipPosition.validator(['top', 'tests', 'bottom'])).toBeFalsy()
  })
})
