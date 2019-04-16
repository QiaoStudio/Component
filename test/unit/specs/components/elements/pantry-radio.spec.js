import { shallowMount, mount } from 'dp-test'
import ComRadio from 'elements/radio/src/radio.vue'
import ComRadioGroup from 'elements/radio/src/radio-group.vue'
import sinon from 'sinon'
import _ from 'lodash'
describe('elements/Select', () => {
  let wrapper
  let sanbox
  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComRadio, _.merge({
      propsData: {
        label: 'OptionA',
        value: 'OptionA'
      }
    }, options || {}))
  }
  function createGroupButton(option) {
    const RadioGroup = _.merge({
      data () {
        return {
          currentValue: '1',
          options: [
            { key: '1', text: 'Option A' },
            { key: '2', text: 'Option B' },
            { key: '3', text: 'Option C' }
          ],
          isValid: false,
          errorMessage: 'Please select one option above',
          errorStyle: ''
        }
      },
      methods: {
        changeSelected (value) {
          this.currentValue = value
        }
      },
      components: {
        ComRadioGroup,
        ComRadio
      },
      template: `<com-radio-group :value="currentValue" @input="changeSelected" :errorStatus="isValid" :message="errorMessage" :errorStyle="errorStyle"><div :key="index" v-for="(option, index) in options"><com-radio :label="option.key">{{ option.text }}</com-radio></div></com-radio-group>`
    }, option || {})
    return mount(RadioGroup, {
      attachToDocument: true
    })
  }
  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })
  it('radio value should correct', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.$el.querySelector('.dp-field__radio .dp-radio__area').value).toBe('OptionA')
    expect(wrapper.find('.dp-field__radio .dp-field__label').text()).toBe('OptionA')
  })
  it('radio selectValue should correct', () => {
    wrapper = generateWrapper()
    wrapper.find('.dp-field__radio .dp-radio__area').trigger('change')
    expect(wrapper.emitted('input')).toBeTruthy()
  })
  it('radioGroup option should correct', () => {
    wrapper = createGroupButton()
    expect(wrapper.find('.dp-field__radio-group')).not.toBe(null)
    expect(wrapper.findAll(' .dp-radio__area').at(0).attributes().value).toBe('1')
    expect(wrapper.findAll(' .dp-radio__area').at(1).attributes().value).toBe('2')
    expect(wrapper.findAll(' .dp-radio__area').at(2).attributes().value).toBe('3')
  })
  it('select value should correct in radioGroup', () => {
    wrapper = createGroupButton()
    wrapper.find('.dp-field__radio-group div:nth-of-type(2) .dp-radio__area').trigger('change')
    expect(wrapper.vm.currentValue).toBe('2')
  })
  it('errorMessage should be underline when errorStyle is "" in radio', () => {
    wrapper = generateWrapper()
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })

  it('errorMessage should be popover when errorStyle is popover in radio', () => {
    wrapper = generateWrapper({
      propsData: {
        errorStyle: 'popover'
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-radio__error-popup').exists()).toBe(true)
  })

  it('errorMessage should be underline when errorStyle is "" in radioGroup', () => {
    wrapper = createGroupButton()
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })

  it('errorMessage should be popover when errorStyle is popover in radioGroup', () => {
    wrapper = createGroupButton({
      data() {
        return {
          errorStyle: 'popover'
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-radio__error-popup').exists()).toBe(true)
  })
})
