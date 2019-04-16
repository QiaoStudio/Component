import {
  shallowMount
} from 'dp-test'
import ComSelect from 'components/elements/select/select.vue'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import sinon from 'sinon'
import _ from 'lodash'
import $ from 'jQuery'

describe('elements/Select', () => {
  let wrapper
  let sanbox
  global.$ = global.jQuery = $

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComSelect, _.merge({
      propsData: {
        label: 'label'
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('components should be shown correct on desktop and mobile', () => {
    wrapper = generateWrapper()
    wrapper.vm.$screen.smallScreen = () => {
      return false
    }

    expect(wrapper.find('.dp-field__dropdown-menu').exists()).toBe(true)
    expect(wrapper.findAll('.dropdown-mobile').exists()).toBe(false)

    // wrapper.vm.$screen.smallScreen = () => {
    //   return true
    // }
    // wrapper.update()
    // expect(wrapper.vm.$el.querySelector('.dp-field__dropdown-menu')).toBeNull()
    // expect(wrapper.vm.$el.querySelector('.dropdown-mobile')).not.toBeNull()
  })

  it('label should be correct', () => {
    wrapper = generateWrapper()
    wrapper.setProps({
      label: 'select label'
    })

    expect(wrapper.find('.dp-field__label').text()).toBe('select label')
  })

  it('option list should be shown on desktop', () => {
    wrapper = generateWrapper({
      attachToDocument: true
    })
    wrapper.vm.$screen.smallScreen = () => {
      return false
    }
    // let options = [{ key: 0, text: 'a11' }, { key: 1, text: 'a22' }, { key: 2, text: 'a33' }, { key: 3, text: 'b11' }]
    wrapper.setProps({
      label: 'select label'
    })
    expect(wrapper.find('.dp-field__dropdown-menu').classes()).not.toContain('open')
    wrapper.findAll('.dp-field__select-holder').trigger('click')
    expect(wrapper.find('.dp-field__dropdown-menu').classes()).toContain('open')
  })

  it('isValidValue should be false if value is equal to "", null or undefined', () => {
    wrapper = generateWrapper()

    wrapper.vm.$attrs = {
      value: ''
    }
    expect(wrapper.vm.isValidValue).toBe(false)

    wrapper.vm.$attrs = {
      value: undefined
    }
    expect(wrapper.vm.isValidValue).toBe(false)

    wrapper.vm.$attrs = {
      value: null
    }
    expect(wrapper.vm.isValidValue).toBe(false)
  })

  it('isValidValue should be true if value is not equal to "", null or undefined', () => {
    wrapper = shallowMount(ComSelect)
    wrapper.vm.$attrs = {
      value: '0'
    }
    expect(wrapper.vm.isValidValue).toBe(true)
    wrapper.vm.$attrs.value = {
      value: 'false'
    }
    expect(wrapper.vm.isValidValue).toBe(true)
    wrapper.vm.$attrs = {
      value: 'value'
    }
    expect(wrapper.vm.isValidValue).toBe(true)
  })

  it('isError should be false if the error is null', () => {
    wrapper = generateWrapper({
      computed: {
        error() {
          return null
        }
      }
    })
    expect(wrapper.vm.isError).toBe(false)
  })

  it('isError should be false if the showError is false', () => {
    wrapper = generateWrapper()
    wrapper.setData({
      showError: false
    })
    expect(wrapper.vm.isError).toBe(false)
  })

  it('error should be null when showError is false', () => {
    wrapper = generateWrapper()
    wrapper.setData({
      showError: false
    })
    expect(wrapper.vm.error).toBeNull()
  })

  it('error should return empty type when required is true and isValidValue is false', () => {
    wrapper = generateWrapper({
      propsData: {
        required: true
      },
      computed: {
        isValidValue() {
          return false
        }
      }
    })
    wrapper.setData({
      showError: true
    })
    expect(wrapper.vm.error).toEqual({
      type: 'empty',
      message: 'This field is required.'
    })
  })

  it('showError filed should be true when change method run', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.showError).toBe(false)
    wrapper.vm.change()
    expect(wrapper.vm.showError).toBe(true)
  })

  it('errorMessage should be underline when errorStyle is "" and isError is true', () => {
    wrapper = generateWrapper({
      data() {
        return {
          showError: true
        }
      },
      propsData: {
        errorMessage: 'testtest'
      },
      computed: {
        isError() {
          return true
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })
  it('errorMessage should be popover when errorStyle is popover and isError is true', () => {
    wrapper = generateWrapper({
      data() {
        return {
          showError: true
        }
      },
      propsData: {
        errorMessage: 'testtest',
        errorStyle: 'popover'
      },
      computed: {
        isError() {
          return true
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-select__error-popup').exists()).toBe(true)
  })
  it('If the dropdown is open,the file will be focus', () => {
    wrapper = generateWrapper()
    wrapper.find('.dp-field__select-holder').trigger('click')
    expect(wrapper.find('.dp-field__select').classes()).toContain('focus')
    wrapper.find('.dp-field__select-holder').trigger('click')
    expect(wrapper.find('.dp-field__select').classes()).not.toContain('focus')
  })
  it('should NOT add shadow/outline class when shadow/outline is NOT enabled', () => {
    wrapper = generateWrapper({
      propsData: {
        outline: false,
        shadow: false
      }
    })
    expect(wrapper.find('.dp-field__select').classes()).not.toContain('dp-field__shadow')
    expect(wrapper.find('.dp-field__select').classes()).not.toContain('dp-field__outline')
  })
  it('should add shadow/outline class when shadow/outline is enabled', () => {
    wrapper = generateWrapper({
      propsData: {
        outline: true,
        shadow: false
      }
    })
    expect(wrapper.find('.dp-field__select').classes()).toContain('dp-field__outline')
    expect(wrapper.find('.dp-field__select').classes()).not.toContain('dp-field__shadow')

    wrapper = generateWrapper({
      propsData: {
        outline: false,
        shadow: true
      }
    })
    expect(wrapper.find('.dp-field__select').classes()).not.toContain('dp-field__outline')
    expect(wrapper.find('.dp-field__select').classes()).toContain('dp-field__shadow')
  })
  it('should have text-align left class when text-align is NOT set', () => {
    wrapper = generateWrapper()
    expect(wrapper.find('.dp-field__area').classes()).toContain('text-left')
  })

  it('should set isFocus to false when calling selectMobileBlur', () => {
    wrapper = generateWrapper()
    wrapper.vm.selectMobileBlur()
    expect(wrapper.vm.isFocus).toBeFalsy()
  })

  it('should set isFocus to true when calling selectMobileClick', () => {
    wrapper = generateWrapper()
    wrapper.vm.selectMobileClick()
    expect(wrapper.vm.isFocus).toBeTruthy()
  })

  it('should add correct text-align class when text-align is set', () => {
    wrapper = generateWrapper({
      propsData: {
        'text-align': 'left'
      }
    })
    expect(wrapper.find('.dp-field__area').classes()).toContain('text-left')
    wrapper = generateWrapper({
      propsData: {
        'text-align': 'center'
      }
    })
    expect(wrapper.find('.dp-field__area').classes()).toContain('text-center')
    wrapper = generateWrapper({
      propsData: {
        'text-align': 'right'
      }
    })
    expect(wrapper.find('.dp-field__area').classes()).toContain('text-right')
  })

  describe('Keyboard Support', () => {
    it('should move show dropdown list when user press key Enter', () => {
      wrapper = generateWrapper({
        sync: false
      })
      let openDropdownCallback = sanbox.stub()
      wrapper.setMethods({
        openDropdown: openDropdownCallback
      })
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ENTER
      })
      expect(openDropdownCallback.calledOnce).toBeTruthy()
    })

    it('seed should increase when openDropdown is called', done => {
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ENTER
      })
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.seed).toBe(1)
        done()
      })
    })

    it('dismiss function should be called when dropdown', done => {
      wrapper = generateWrapper({
        sync: false
      })
      const currSeed = wrapper.vm.seed
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ESCAPE
      })
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.$el).toEqual(document.activeElement)
        expect(wrapper.vm.seed).toBe(currSeed + 1)
        done()
      })
    })

    it('next item should be focused correctly when pressing arrow down keyboard', () => {
      const focus = sanbox.spy()
      wrapper = generateWrapper({
        sync: false
      })
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(1).returns({
        focus: focus
      })
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      expect(focus.calledOnce).toBeTruthy()
    })

    it('previous item should be focused correctly when pressing arrow up keyboard', () => {
      const focus = sanbox.spy()
      wrapper = generateWrapper({
        sync: false
      })
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(-1).returns({
        focus: focus
      })
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ARROW_UP
      })
      expect(focus.calledOnce).toBeTruthy()
    })

    it('onDismiss should be called correctly when pressing esc keyboard', () => {
      const dismiss = sanbox.spy()
      wrapper = generateWrapper({
        sync: false,
        data() {
          return {
            keyboardSettings: {
              onDismiss: dismiss
            }
          }
        }
      })
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ESCAPE
      })
      expect(dismiss.calledOnce).toBeTruthy()
    })

    it('should not open opendown again when pressing esc keyboard, after dismiss event', () => {
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.vm.$el.focus()
      wrapper.find('.dp-field.dp-field__select').trigger('keydown', {
        key: KEY_VALUES.ESCAPE
      })
      expect(wrapper.vm.seed).toBe(0)
    })

    it('item should be clicked when select is called while dropdown is already open and Enter is pressed', () => {
      const focus = sanbox.spy()
      const item = document.createElement('div')
      const eventClick = sanbox.spy()
      item.addEventListener('click', eventClick)
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.vm.$el.focus = focus
      wrapper.vm.select(item, { key: KEY_VALUES.ENTER })
      expect(focus.calledOnce).toBeTruthy()
      expect(eventClick.calledOnce).toBeTruthy()
    })

    it('item should not be clicked when select is called while dropdown is already open and arrow down is pressed', () => {
      const focus = sanbox.spy()
      const item = document.createElement('div')
      const eventClick = sanbox.spy()
      item.addEventListener('click', eventClick)
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.vm.$el.focus = focus
      wrapper.vm.select(item, { key: KEY_VALUES.ARROW_DOWN })
      expect(focus.calledOnce).toBeFalsy()
      expect(eventClick.calledOnce).toBeFalsy()
    })
  })

  describe('Test keyboard support function', () => {
    sanbox = sinon.createSandbox()
    let preventDefault = sanbox.spy()
    let stopPropagation = sanbox.spy()
    let focus = sanbox.spy()
    let onSelect = sanbox.spy()
    let dismiss = sanbox.spy()
    const event = {
      key: KEY_VALUES.ENTER,
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    }
    afterEach(() => {
      preventDefault.resetHistory()
      preventDefault.resetHistory()
      stopPropagation.resetHistory()
      focus.resetHistory()
      onSelect.resetHistory()
      dismiss.resetHistory()
    })
    it('should call preventDefault, stopProbagation and onSelect when user press key Enter', () => {
      event.key = KEY_VALUES.ENTER
      wrapper = generateWrapper({
        sync: false,
        data() {
          return {
            keyboardSettings: {
              onSelect: onSelect
            }
          }
        }
      })
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(1).returns({
        focus: focus
      })
      wrapper.vm.$_KFL_supportKeyboard(event)
      expect(preventDefault.calledOnce).toBeTruthy()
      expect(stopPropagation.calledOnce).toBeTruthy()
      expect(onSelect.calledOnce).toBeTruthy()
      expect(focus.calledOnce).toBeFalsy()
    })

    it('should focus previous with backwardKeys when user press key arrowUp', () => {
      event.key = KEY_VALUES.ARROW_UP
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.vm.$_KFL_settings.backwardKeys = [KEY_VALUES.ARROW_UP]
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(-1).returns({
        focus: focus
      })
      wrapper.vm.$_KFL_supportKeyboard(event)
      expect(focus.calledOnce).toBeTruthy()
    })

    it('should focus next with forwardKeys when user press key arrowRight', () => {
      event.key = KEY_VALUES.ARROW_RIGHT
      wrapper = generateWrapper({
        sync: false
      })
      wrapper.vm.$_KFL_settings.forwardKeys = [KEY_VALUES.ARROW_RIGHT]
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(1).returns({
        focus: focus
      })
      wrapper.vm.$_KFL_supportKeyboard(event)
      expect(focus.calledOnce).toBeTruthy()
    })

    it('should call dismiss when user press key Esc', () => {
      event.key = KEY_VALUES.ESCAPE
      wrapper = generateWrapper({
        sync: false,
        data() {
          return {
            keyboardSettings: {
              onDismiss: dismiss
            }
          }
        }
      })
      wrapper.vm.$_KFL_settings.dismissKeys = [KEY_VALUES.ESCAPE]
      wrapper.vm.$_KFL_supportKeyboard(event)
      expect(dismiss.calledOnce).toBeTruthy()
    })

    it('should call select and focus when forward key and select key are the same', () => {
      event.key = KEY_VALUES.ARROW_DOWN
      wrapper = generateWrapper({
        sync: false,
        data() {
          return {
            keyboardSettings: {
              onSelect: onSelect
            }
          }
        }
      })
      sanbox.stub(wrapper.vm, '$_KFL_findNextFocusable').withArgs(1).returns({
        focus: focus
      })
      wrapper.vm.$_KFL_settings.selectKeys = [KEY_VALUES.ARROW_DOWN]
      wrapper.vm.$_KFL_settings.forwardKeys = [KEY_VALUES.ARROW_DOWN]
      wrapper.vm.$_KFL_supportKeyboard(event)
      expect(onSelect.calledOnce).toBeTruthy()
      expect(focus.calledOnce).toBeTruthy()
    })
  })
})
