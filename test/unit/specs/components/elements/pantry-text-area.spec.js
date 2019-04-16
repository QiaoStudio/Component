import { shallowMount, mount } from 'dp-test'
import ComTextArea from 'components/elements/textarea'
import sinon from 'sinon'
import _ from 'lodash'
import $ from 'jquery'
describe('elements/TextArea', () => {
  let wrapper
  let sanbox
  global.$ = global.jQuery = $
  let textAutoHeightCallBack

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    textAutoHeightCallBack = sanbox.stub()
  })

  function generateWrapper(options) {
    return shallowMount(ComTextArea, _.merge({
      propsData: {
        label: 'label',
        value: '111',
        maxLength: 50
      },
      methods: {
        textAutoHeight: textAutoHeightCallBack
      }
    }, options || {}))
  }
  function createTextInput(option) {
    return mount({
      data () {
        return {
          innerInputValue: '',
          textlabel: 'Com TextArea',
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
        ComTextArea
      },
      template: `<com-text-area :errorStatus="errorStatus" :errorMessage="errorMessage" :label="textlabel" :required="required" :maxLength="max" :minLength="min" :value="innerInputValue" @input="InnerInput"/></com-text-area>`
    })
  }
  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })
  it('label-should be display Correct text ', () => {
    wrapper = generateWrapper()
    expect(wrapper.find('.dp-field__label').text()).toContain('label')
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
    expect(wrapper.find('.dp-field__textarea').classes()).toContain('error')
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
  it('when the value of length is less than minLength then error message was show', () => {
    wrapper = createTextInput()
    wrapper.setData({
      min: 2
    })
    let input = wrapper.find('.dp-field__area')
    input.trigger('focus')
    input.element.value = '6'
    input.trigger('input')
    expect(wrapper.find('.dp-field__textarea').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toContain('The text length is less then 2')
  })
  it('when the value was change then input event should be fired', () => {
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
    expect(wrapper.find('.dp-field__textarea').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toContain('Please enter text.')
  })
  it('when the value of length is more than maxLength then error message was show', () => {
    wrapper = generateWrapper()
    wrapper.find('.dp-field__area').setValue('1212')
    expect(textAutoHeightCallBack.called).toBe(true)
  })
  it('when component blur, emit a blur event', () => {
    wrapper = generateWrapper()
    wrapper.find('textarea').trigger('focus')
    wrapper.find('textarea').trigger('blur')
    expect(wrapper.emitted()['blur'][0].length).toBe(1)
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
    expect(wrapper.find('.dp-com-text-area__error-popup').exists()).toBe(true)
  })
})
