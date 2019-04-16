import { shallowMount, mount, createLocalVue } from 'dp-test'
import ComCurrencyInput from 'components/elements/currency-input/currency-input.vue'
import sinon from 'sinon'
import _ from 'lodash'
import $ from 'jquery'
import typeahead from 'bootstrap-3-typeahead'

describe('elements/Currency Input', () => {
  let wrapper
  let sanbox
  let localVue = createLocalVue()
  global.$ = global.jQuery = $
  global.typeahead = typeahead

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComCurrencyInput, _.merge({
      propsData: {
        label: 'label'
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('currency label and text label shound be correct', () => {
    wrapper = generateWrapper({localVue})
    wrapper.setProps({
      currencyLabel: '$',
      value: 10,
      label: 'currency input label'
    })

    let labelElement = wrapper.find('.dp-field__label')
    let $inputElement = $(wrapper.vm.$el).find('.dp-field__area')
    wrapper.vm.value = 1000
    expect($inputElement.val()).toContain('$1,000')
    expect(labelElement.text()).toContain('currency input label')
  })

  it('style should be correct when user click input', () => {
    wrapper = generateWrapper({localVue})
    wrapper.setProps({
      currencyLabel: '$',
      value: 10,
      label: 'currency input label'
    })
    wrapper.trigger('click')
    let currencyInputElement = wrapper.find('.dp-field__input--currency')
    expect(currencyInputElement.classes()).toContain('active')
  })

  it('style should be correct when value is no valid', () => {
    wrapper = generateWrapper({localVue})
    wrapper.setProps({
      currencyLabel: '$',
      value: null,
      label: 'currency input label'
    })
    wrapper.trigger('click')
    let currencyInputElement = wrapper.find('.dp-field__input--currency')
    expect(currencyInputElement.classes()).not.toContain('active')
  })

  it('localized currency label and text label shound be correct', () => {
    wrapper = generateWrapper({localVue})
    wrapper.setProps({
      currencyLabel: 'Rp',
      thousandSeparator: '.',
      decimalSeparator: ',',
      value: 1000,
      label: 'currency input label'
    })

    let labelElement = wrapper.find('.dp-field__label')
    let $inputElement = $(wrapper.vm.$el).find('.dp-field__area')
    wrapper.vm.value = 10000000
    expect($inputElement.val()).toContain('Rp10.000.000')
    expect(labelElement.text()).toContain('currency input label')
  })

  it('created', () => {
    wrapper = generateWrapper()
    let div = wrapper.find('div')
    expect(div.classes()).toContain('active')
    expect(div.classes()).not.toContain('warning')
    expect(div.classes()).not.toContain('error')
    expect(div.classes()).not.toContain('disabled')
  })
  it('mounted', () => {
    let mixin = {
      mounted() {
        this.setupTypeahead()
      }
    }
    let setupTypeahead = sanbox.stub()
    wrapper = generateWrapper({
      methods: {
        setupTypeahead: setupTypeahead
      },
      mixin: [mixin]
    })
    expect(setupTypeahead.called).toBeTruthy()
  })

  it('isValidValue should be false if value is equal to "", null or undefined', () => {
    wrapper = generateWrapper()
    wrapper.setProps({
      value: ''
    })
    let div = wrapper.find('div')
    expect(wrapper.vm.isValidValue).toBe(true)
    expect(div.classes()).toContain('active')

    wrapper.setProps({
      value: undefined
    })
    expect(wrapper.vm.isValidValue).toBe(false)
    expect(div.classes()).not.toContain('active')

    wrapper.setProps({
      value: null
    })
    expect(wrapper.vm.isValidValue).toBe(false)
    expect(div.classes()).not.toContain('active')
  })

  it('isValidValue should be true if value is not equal to "", null or undefined', () => {
    wrapper = generateWrapper()
    wrapper.setProps({
      value: '0'
    })
    expect(wrapper.vm.isValidValue).toBe(true)

    wrapper.setProps({
      value: 'value'
    })
    expect(wrapper.vm.isValidValue).toBe(true)
  })

  it('isActive should be true when isValidValue is true', () => {
    wrapper = generateWrapper({
      computed: {
        isValidValue() {
          return true
        }
      }
    })
    wrapper.setData({
      active: false
    })
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('isActive should be true when active is true', () => {
    wrapper = generateWrapper({
      computed: {
        isValidValue() {
          return false
        }
      }
    })
    wrapper.setData({
      active: true
    })
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('isActive should be false when active is false and isValidValue is false', () => {
    wrapper = generateWrapper({
      computed: {
        isValidValue() {
          return false
        }
      }
    })
    wrapper.setData({
      active: false
    })
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('valueToBind should return format money when isDirty is false', () => {
    wrapper = generateWrapper({
    })
    wrapper.setData({
      isDirty: false
    })
    wrapper.setProps({
      value: '10'
    })
    expect(wrapper.vm.valueToBind).toBe('$10')
  })

  it('valueToBind should return empty string when isDirty is true', () => {
    wrapper = generateWrapper({
    })
    wrapper.setData({
      isDirty: true
    })
    wrapper.setProps({
      value: '10'
    })
    expect(wrapper.vm.valueToBind).toBe('')
  })

  it('formatMoney: should return correct format money when precision is default', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.formatMoney('10')).toBe('$10.00')
  })

  it('formatMoney: should return correct format money when precision is 0', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.formatMoney('10', 0)).toBe('$10')
  })

  it('unformatMoney should retunr correct value', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.unformatMoney('$10.00')).toBe(10)
  })

  it('unformatMoney should retunr correct value', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.unformatMoney('$10.00')).toBe(10)
  })

  it('autocompleteData should correct when autocompleteDigits and inputValue correct', () => {
    wrapper = shallowMount(ComCurrencyInput, {localVue})
    wrapper.setProps({
      autocompleteDigits: {
        min: 6,
        max: 8
      },
      value: 2
    })
    wrapper.setData({
      inputValue: '2'
    })

    expect(wrapper.vm.autocompleteData.length).toBe(3)
    expect(_.some(wrapper.vm.autocompleteData, {id: '200000', name: '$200,000'})).toBe(true)
    expect(_.some(wrapper.vm.autocompleteData, {id: '2000000', name: '$2,000,000'})).toBe(true)
    expect(_.some(wrapper.vm.autocompleteData, {id: '20000000', name: '$20,000,000'})).toBe(true)
  })

  it('autocompleteData should correct when autoComplete digits and inputValue.length is between min and max', () => {
    wrapper = shallowMount(ComCurrencyInput, {localVue})
    wrapper.setProps({
      autocompleteDigits: {
        min: 6,
        max: 8
      },
      value: 2
    })
    wrapper.setData({
      inputValue: '2333300'
    })
    expect(wrapper.vm.autocompleteData.length).toBe(1)
    expect(_.some(wrapper.vm.autocompleteData, {id: '23333000', name: '$23,333,000'})).toBe(true)
  })

  it('autocompleteData should return [] when value is "" or 0', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })
    wrapper.setProps({
      autocompleteDigits: {
        min: 6,
        max: 8
      },
      value: 0
    })
    wrapper.setData({
      inputValue: '2'
    })

    expect(wrapper.vm.autocompleteData.length).toBe(0)
    wrapper.setProps({
      autocompleteDigits: {
        min: 6,
        max: 8
      },
      value: ''
    })

    expect(wrapper.vm.autocompleteData.length).toBe(0)
  })

  it('autocompleteData should return [] in mobile view', () => {
    wrapper = generateWrapper({
      computed: {
        $screen() {
          return {
            mobile: () => true
          }
        }
      }
    })
    expect(wrapper.vm.autocompleteData).toEqual([])
  })

  it('focus: active and inputing should be true', () => {
    wrapper = mount(ComCurrencyInput, {
      attachToDocument: true
    })
    wrapper.setData({
      active: false,
      inputing: false
    })
    let mockEvent = {
      target: {
        value: 0,
        select: sanbox.stub()
      }
    }
    wrapper.vm.focus(mockEvent)
    expect(wrapper.vm.active).toBe(true)
    expect(wrapper.vm.inputing).toBe(true)
  })

  it('blur: active and inputing should be true', () => {
    wrapper = generateWrapper()
    wrapper.setData({
      inputValue: '2'
    })
    wrapper.find('.dp-field__area').trigger('blur')
    expect(wrapper.vm.isDirty).toBe(false)
    expect(wrapper.vm.active).toBe(false)
    expect(wrapper.vm.inputing).toBe(false)
    expect(wrapper.vm.inputValue).toBe('')
  })
  it('blur: changeEvent should be called', () => {
    let changeEvent = sanbox.stub()
    wrapper = generateWrapper({
      data() {
        return {
          inputValue: '2'
        }
      },
      methods: {
        changeEvent: changeEvent
      }
    })
    wrapper.find('.dp-field__area').trigger('blur')
    expect(changeEvent.called).toBeTruthy()
  })
  it('input event should be triggered if update value when has maxLength', () => {
    wrapper = mount(ComCurrencyInput, {
      localVue
    })

    wrapper.setProps({
      value: 1000,
      maxLength: 2
    })

    wrapper.vm.$on('input', (e) => {
      expect(e).toBe(20)
      // done()
    })
    wrapper.vm.updateValue(2000)
  })

  it('input event should be triggered if update value when has no maxLength', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })

    wrapper.setProps({
      value: 2000
    })

    wrapper.vm.$on('input', (e) => {
      expect(e).toBe(2000)
      // done()
    })
    wrapper.vm.updateValue(2000)
  })

  it('the selectAll should be triggered once when the invoke the focus method', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })
    let selectAllCallBack = sanbox.stub()
    wrapper.setMethods({
      selectAll: selectAllCallBack
    })

    let mockEvent = {
      target: {
        value: 0,
        select: sanbox.stub()
      }
    }
    wrapper.vm.focus(mockEvent)

    expect(selectAllCallBack.calledOnce).toBe(true)
  })

  it('keypress should be triggle when user type char', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })
    let keypressCallBack = sanbox.stub()
    wrapper.setMethods({
      keypress: keypressCallBack
    })
    wrapper.find('.dp-field__area').trigger('keypress.50')
    expect(keypressCallBack.calledOnce).toBe(true)
  })

  it('keypress should be run preventDefault event when user type unmatched char', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })
    let mockEvent = {
      charCode: 47,
      preventDefault: sanbox.stub()
    }
    wrapper.vm.keypress(mockEvent)
    expect(mockEvent.preventDefault.calledOnce).toBe(true)

    mockEvent.charCode = 58
    wrapper.vm.keypress(mockEvent)
    expect(mockEvent.preventDefault.calledTwice).toBe(true)
  })

  it('keypress should be run preventDefault event when user type matched char', () => {
    wrapper = shallowMount(ComCurrencyInput, {
      localVue
    })
    let mockEvent = {
      charCode: 50,
      preventDefault: sanbox.stub()
    }
    wrapper.vm.keypress(mockEvent)
    expect(mockEvent.preventDefault.notCalled).toBe(true)
  })

  it('touchstart should be triggle when user touch', () => {
    wrapper = mount(ComCurrencyInput, { localVue })
    let touchstartCallBack = sanbox.stub()
    wrapper.setMethods({
      showkeyboard: touchstartCallBack,
      selectAll: sanbox.stub()
    })
    wrapper.find('.dp-field__area').trigger('touchstart')
    expect(touchstartCallBack.calledOnce).toBe(true)
  })

  it('touchstart should bu correct when it triggle', () => {
    wrapper = mount(ComCurrencyInput, { localVue })
    let mockEvent = {
      target: {
        value: 10,
        type: '',
        pattern: '',
        select: sanbox.stub()
      }
    }

    wrapper.vm.$screen = {
      mobile: function() {
        return true
      }
    }
    wrapper.vm.showkeyboard(mockEvent)
    expect(mockEvent.target.type).toBe('number')
    expect(mockEvent.target.pattern).toBe('\\d*')
  })

  it('when called keypress should called preventDefault when keycode is not >=48 or <=57', () => {
    let prevenStub = sanbox.stub()
    let event = {
      charCode: 20,
      preventDefault: prevenStub
    }
    expect(prevenStub.called).toBe(false)
    wrapper.vm.keypress(event)
    expect(prevenStub.calledOnce).toBe(true)
  })

  it('call source', () => {
    let argFunc = sanbox.stub()
    wrapper = generateWrapper({
      computed: {
        autocompleteData: 'test'
      }
    })
    expect(argFunc.called).toBeFalsy()
    wrapper.vm.source('query', argFunc)
    expect(argFunc.calledOnceWith(wrapper.vm.autocompleteData)).toBeTruthy()
  })

  it('call matcher', () => {
    let item = {
      id: 'testid'
    }
    expect(wrapper.vm.matcher(item)).toBe(false)
    wrapper.vm.query = 'id'
    expect(wrapper.vm.matcher(item)).toBe(true)
  })

  it('call sorter, when item is number', () => {
    let item = [3, 4]
    expect(wrapper.vm.sorter(item)).toEqual([4, 3])
  })

  it('call sorter, when item is string', () => {
    let item = ['test', 'tests']
    expect(wrapper.vm.sorter(item)).toEqual(['tests', 'test'])
  })

  it('call updater', () => {
    let item = {
      id: '$22'
    }
    let changeEventStub = sanbox.stub()
    wrapper = generateWrapper({
      methods: {
        changeEvent: changeEventStub
      }
    })
    expect(changeEventStub.called).toBe(false)
    expect(wrapper.vm.updater(item)).toEqual(22)
    expect(wrapper.vm.inputValue).toBe(22)
    expect(wrapper.emitted('input')[0][0]).toBe(22)
    expect(changeEventStub.calledOnceWith(wrapper.vm.inputValue)).toBe(true)
  })
})
