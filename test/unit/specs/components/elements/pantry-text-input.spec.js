import { shallowMount, mount } from 'dp-test'
import ComTextInput from 'components/elements/text-input/text-input.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('elements/Text Input', () => {
  let wrapper
  let sanbox

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComTextInput, _.merge({
      propsData: {
        label: 'label',
        value: '111',
        maxLength: 50
      }
    }, options || {}))
  }
  function createTextInput(option) {
    return mount({
      data () {
        return {
          innerInputValue: '',
          textlabel: 'Com TextInput',
          required: false,
          errorStatus: false,
          errorMessage: 'Please enter text.',
          max: 50,
          min: 0
        }
      },
      methods: {
        InnerInput (value) {
          this.innerInputValue = value
        }
      },
      components: {
        ComTextInput
      },
      template: `<com-text-input :errorStatus="errorStatus" :errorMessage="errorMessage" :label="textlabel" :required="required" :maxLength="max" :minLength="min" :value="innerInputValue" @input="InnerInput"/></com-text-input>`
    })
  }
  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })
  it('label-should be display Correct text ', () => {
    wrapper = generateWrapper()
    expect(wrapper.find('.dp-field__label').text()).toBe('label')
  })
  it('when required is true and value equal empty then error message was show', () => {
    wrapper = createTextInput()
    wrapper.setData({
      required: true
    })
    let input = wrapper.find('.dp-field__area')
    input.trigger('focus')
    input.element.value = ''
    input.trigger('input')
    expect(wrapper.find('.dp-field__input--text').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toContain('This field is required.')
  })
  it('when the value of length is more than maxLength then error message was show', () => {
    wrapper = generateWrapper({
      propsData: {
        maxLength: 10
      },
      computed: {
        valueLength() {
          return 11
        }
      }
    })
    expect(wrapper.vm.error).toEqual({
      type: 'overLength',
      message: 'The text length is more then 10'
    })
  })
  it('when the value of length is less than minLength then error message was show', () => {
    wrapper = createTextInput()
    wrapper.setData({
      min: 2
    })
    let input = wrapper.find('.dp-field__area')
    input.trigger('focus')
    input.element.value = '6'
    input.trigger('input')
    expect(wrapper.find('.dp-field__input--text').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toContain('The text length is less then 2')
  })
  it('when the field was focus then input event should be fired', () => {
    wrapper = generateWrapper()
    let selectAllCallBack = sanbox.stub()
    wrapper.setMethods({
      selectAll: selectAllCallBack
    })
    wrapper.vm.focus()
    expect(wrapper.vm.active).toBe(true)
    expect(wrapper.vm.inputing).toBe(true)
  })
  it('when the errorStatus was true then errorMessage should show', () => {
    wrapper = createTextInput()
    wrapper.setData({
      errorStatus: true
    })
    let input = wrapper.find('.dp-field__area')
    input.trigger('focus')
    expect(wrapper.find('.dp-field__input--text').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toContain('Please enter text.')
  })
  it('when the value of length is more than maxLength then show shake animation', () => {
    wrapper = generateWrapper({
      propsData: {
        maxLength: 3,
        value: 'test'
      },
      computed: {
        isShowCharacterCounter() {
          return true
        }
      },
      data() {
        return {
          showError: true
        }
      }
    })
    expect(wrapper.classes()).toContain('dp-animate-shake')
  })
  it('errorMessage should be underline when when errorStyle is "" and isError is true', () => {
    wrapper = generateWrapper({
      computed: {
        isError() {
          return true
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })
  it('errorMessage should be popover when when errorStyle is popover and isError is true', () => {
    wrapper = generateWrapper({
      propsData: {
        errorStyle: 'popover'
      },
      computed: {
        isError() {
          return true
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-text-input__error-popup').exists()).toBe(true)
  })
  it('When showError and isValidValue is true, and the length of the value is greater than the maximum length, isShake should return false', () => {
    wrapper = generateWrapper({
      propsData: {
        maxLength: 6,
        value: 'test'
      },
      data() {
        return {
          showError: true,
          isValidValue: true
        }
      }
    })
    expect(wrapper.vm.isShake).toBe(false)
  })

  it('should apply "Input Box" style when box is set to true ', () => {
    wrapper = generateWrapper({
      propsData: {
        box: true
      },
      data() {
        return {
          showCharacterCounter: true
        }
      }
    })

    expect(wrapper.find('.dp-field').classes('dp-field__input_box')).toBeTruthy()
    expect(wrapper.find('.dp-field__label').exists()).toBeFalsy()
    expect(wrapper.find('.dp-character-counter').exists()).toBeFalsy()

    wrapper.setProps({
      box: false
    })

    expect(wrapper.find('.dp-field').classes()).not.toContain('dp-field__input_box')
    expect(wrapper.find('.dp-field__label').exists()).toBeTruthy()
    expect(wrapper.find('.dp-character-counter').exists()).toBeTruthy()
  })

  it('should change input type if it\'s supported', () => {
    wrapper = generateWrapper({
      propsData: {
        box: true
      },
      data() {
        return {
          showCharacterCounter: true
        }
      }
    })

    expect(wrapper.find('input').attributes().type).toBe('text')
    wrapper.setProps({
      inputType: 'email'
    })
    expect(wrapper.find('input').attributes().type).toBe('email')
    wrapper.setProps({
      inputType: 'number'
    })
    expect(wrapper.find('input').attributes().type).toBe('number')
    wrapper.setProps({
      inputType: 'text'
    })
    expect(wrapper.find('input').attributes().type).toBe('text')
    wrapper.setProps({
      inputType: 'date'
    })
    expect(wrapper.find('input').attributes().type).toBe('text')
    wrapper.setProps({
      inputType: 'invalid'
    })
    expect(wrapper.find('input').attributes().type).toBe('text')
  })
})
