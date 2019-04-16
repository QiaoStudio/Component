import { shallowMount, config, TransitionStub } from 'dp-test'
import AutocompleteComponent from 'elements/autocomplete/autocomplete.vue'
import Multiselect from 'vue-multiselect'
import sinon from 'sinon'
import _ from 'lodash'
import { KEY_VALUES } from 'utilities/event-helper/key-event'

config.stubs.transition = TransitionStub

describe('elements/autocomplete/multiple.vue - common', () => {
  let wrapper
  let sanbox
  let changeDomStructureStub
  let listenTouchmoveStub

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        options: [{ text: 'Blgeria' }, { text: 'Albania' }, { text: 'afghalnistan' }],
        multiple: true
      },
      stubs: {
        'multiselect': Multiselect
      }
    }, options || {})
    return shallowMount(AutocompleteComponent, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('When focus, dropdown shown and contain class focus', () => {
    wrapper.find('input.multiselect__input').trigger('focus')
    expect(wrapper.find('.multiselect__content-wrapper').isVisible()).toBe(true)
    expect(wrapper.find('.focus').exists()).toBe(true)
    wrapper.find('input.multiselect__input').trigger('blur')
    expect(wrapper.find('.multiselect__content-wrapper').isVisible()).toBe(false)
  })

  it('when trigger close , components should set right data and emit close', () => {
    wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.vm.isOpened).toBe(false)
  })

  it('Given empty value , error should be true', () => {
    wrapper = createWrapper({
      propsData: {
        required: true
      }
    })
    expect(wrapper.vm.isError).toBe(false)
    wrapper.vm.open()
    wrapper.vm.close()
    expect(wrapper.vm.isError).toBe(true)
  })

  it('Given value , autocompleteValue will be set', () => {
    wrapper = createWrapper({
      propsData: {
        value: [{
          value: 'test'
        }]
      }
    })
    expect(wrapper.vm.autocompleteValue).toEqual([{
      value: 'test'
    }])
  })

  it('Given valid value , isValidValue should be true', () => {
    wrapper.setData({
      autocompleteValue: {
        value: 'test'
      }
    })
    expect(wrapper.vm.isValidValue).toBe(true)
    wrapper.setData({
      autocompleteValue: [{
        value: 'test'
      }]
    })
    expect(wrapper.vm.isValidValue).toBe(true)
    wrapper.setData({
      autocompleteValue: 'test'
    })
    expect(wrapper.vm.isValidValue).toBe(true)
  })

  it('Given no props value, isValidValue should be false', () => {
    wrapper.setData({
      autocompleteValue: {}
    })
    expect(wrapper.vm.isValidValue).toBe(false)
    wrapper.setData({
      autocompleteValue: []
    })
    expect(wrapper.vm.isValidValue).toBe(false)
    wrapper.setData({
      autocompleteValue: ''
    })
    expect(wrapper.vm.isValidValue).toBe(false)
  })

  it('method highlight', () => {
    wrapper.setData({
      searchQuery: 'bl'
    })
    expect(wrapper.vm.highlight('block')).toContain('<strong class="highlight">bl</strong>o')
  })

  it('when searchChanged, should emit right value and set right value', () => {
    wrapper.vm.searchChange('al', 1)
    expect(wrapper.emitted('search-change')[0][0]).toBe('al')
    expect(wrapper.emitted('search-change')[0][1]).toBe(1)
  })

  it('given customSearch is false, options will be sort by alphabet after created', () => {
    expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'afghalnistan' }, { text: 'Albania' }, { text: 'Blgeria' }])
  })

  it('given customSearch is false, options will be defined by outside of component', () => {
    wrapper = createWrapper({
      propsData: {
        customSearch: true
      }
    })
    expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'Blgeria' }, { text: 'Albania' }, { text: 'afghalnistan' }])
  })

  it('if sort function has been executed, filterOptions should be sorted by searchQuery', () => {
    expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'afghalnistan' }, { text: 'Albania' }, { text: 'Blgeria' }])
    wrapper.vm.searchChange('al')
    expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'Albania' }, { text: 'afghalnistan' }])
  })

  it('given customSearch is true, options will be defined by outside of component after searchquery is changed', () => {
    expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'afghalnistan' }, { text: 'Albania' }, { text: 'Blgeria' }])
    wrapper = createWrapper({
      propsData: {
        customSearch: true
      }
    })
    wrapper.vm.searchChange('al')
    wrapper.setProps({
      options: [{ text: 'afghalnistan' }, { text: 'Albania' }]
    })
    setTimeout(() => {
      expect(wrapper.find(Multiselect).props().options).toEqual([{ text: 'afghalnistan' }, { text: 'Albania' }])
    })
  })

  it('createCustomValue should return right value', () => {
    expect(wrapper.vm.createCustomValue('hello')).toEqual({text: 'hello'})
  })

  it('changeDomStructure after open, and emit open', () => {
    changeDomStructureStub = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        changeDomStructure: changeDomStructureStub
      }
    })
    wrapper.vm.open()
    expect(changeDomStructureStub.called).toBe(true)
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('listen and bind events after mounted', () => {
    listenTouchmoveStub = sanbox.stub()
    const listenFocusStub = sanbox.stub()
    const bindKeyEventsStub = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        listenTouchmove: listenTouchmoveStub,
        listenFocus: listenFocusStub,
        bindKeyEvents: bindKeyEventsStub
      }
    })
    expect(listenTouchmoveStub.called).toBe(true)
    expect(listenFocusStub.called).toBe(true)
    expect(bindKeyEventsStub.called).toBe(true)
  })

  it('Given customAvaliable is false, and multiple , and autoCompleteValue does not match options , there should be a error after autocompleteValue was change', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: false,
        multiple: true
      }
    })
    wrapper.setData({
      autocompleteValue: [{text: 'afghalnistan'}, {text: 'testtest'}, {text: 'af'}]
    })
    expect(wrapper.vm.customError).toBe(true)
  })

  it('Given customAvaliable is false, and multiple, and autoCompleteValue does match options , there should be not a error after autocompleteValue was change', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: false,
        multiple: true
      }
    })
    wrapper.setData({
      autocompleteValue: [{text: 'afghalnistan'}]
    })
    expect(wrapper.vm.customError).toBe(false)
  })

  it('Given customAvaliable is false, and single , and searchQuery does not match filterOptions ,there should be a error after close', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: false,
        multiple: false
      }
    })
    wrapper.vm.open()
    wrapper.vm.searchChange('al', '')
    wrapper.vm.close()
    expect(wrapper.vm.customError).toBe(true)
  })

  it('Given customAvaliable is false, and multiple , autocompleteValue is reseted,there should be a error after close', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: false,
        multiple: true
      }
    })
    wrapper.setData({
      autocompleteValue: [{text: 'test'}]
    })
    wrapper.setData({
      autocompleteValue: []
    })
    wrapper.vm.close()
    expect(wrapper.vm.customError).toBe(false)
  })

  it('Given customAvaliable is false, and single , autocompleteValue is reseted,there should be a error after close', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: false,
        multiple: false
      }
    })
    wrapper.vm.close()
    expect(wrapper.vm.customError).toBe(false)
  })

  it('When called searchChange, searchQueryChange should be true', () => {
    expect(wrapper.vm.searchQueryChange).toBe(false)
    wrapper.vm.searchChange('hh', '')
    expect(wrapper.vm.searchQueryChange).toBe(true)
  })

  it('When open was run, searchQueryChange should be false', () => {
    wrapper = createWrapper({
      data() {
        return {
          searchQueryChange: true
        }
      }
    })
    wrapper.vm.open()
    expect(wrapper.vm.searchQueryChange).toBe(false)
  })

  it('When close was run, searchQueryChange should be false and setCustomValue should be called', () => {
    let setCustomValueStub = sanbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          searchQueryChange: true
        }
      },
      methods: {
        setCustomValue: setCustomValueStub
      }
    })
    wrapper.vm.close()
    expect(wrapper.vm.searchQueryChange).toBe(false)
    expect(setCustomValueStub.called).toBe(true)
  })

  it(' When single ,not change searchQueryValue,and close , autocompleteValue should not be change by setCustomValue', () => {
    wrapper = createWrapper({
      data() {
        return {
          searchQueryChange: false
        }
      }
    })
    expect(wrapper.vm.autocompleteValue).toEqual([])
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual([])
  })

  it('When single ,not change searchQueryValue,and select a option, searchQueryChange should not be change by setCustomValue', () => {
    wrapper = createWrapper({
      propsData: {
        multiple: false
      },
      data() {
        return {
          searchQueryChange: false
        }
      }
    })
    expect(wrapper.vm.autocompleteValue).toEqual({})
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual({})
  })

  it('When single,delete your input ,and close , autocompleteValue should be reset', () => {
    wrapper = createWrapper({
      propsData: {
        multiple: false
      },
      data() {
        return {
          searchQueryChange: true,
          selectFlag: false,
          searchQuery: ''
        }
      }
    })
    wrapper.setData({
      autocompleteValue: 'test'
    })
    expect(wrapper.vm.autocompleteValue).toEqual('test')
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual({})
  })

  it('When multiple, and not input anything , and close ,autocompleteValue should not be changed by setCustomValue', () => {
    wrapper = createWrapper({
      data() {
        return {
          searchQueryChange: true,
          selectFlag: false,
          searchQuery: ''
        }
      }
    })
    expect(wrapper.vm.autocompleteValue).toEqual([])
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual([])
  })

  it('When multiple and user input value , and close , should set right value', () => {
    wrapper = createWrapper({
      data() {
        return {
          searchQueryChange: true,
          selectFlag: false,
          searchQuery: 'test1',
          displayBy: 'text'
        }
      }
    })
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual([{text: 'test1'}])
  })

  it('When single and user input value , and close , should set right value', () => {
    wrapper = createWrapper({
      propsData: {
        multiple: false
      },
      data() {
        return {
          searchQueryChange: true,
          selectFlag: false,
          searchQuery: 'test1',
          displayBy: 'text'
        }
      }
    })
    wrapper.vm.setCustomValue()
    expect(wrapper.vm.autocompleteValue).toEqual({text: 'test1'})
  })

  it('when select, should emit select event and reset selectFlag', () => {
    wrapper = createWrapper()
    wrapper.vm.select('test', 'test1')
    expect(wrapper.vm.selectFlag).toBe(true)
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0][0]).toBe('test')
    expect(wrapper.emitted('select')[0][1]).toBe('test1')
  })

  it('when remove, should emit remove', () => {
    wrapper = createWrapper()
    wrapper.vm.removeHandler('test', 'test1')
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')[0][0]).toBe('test')
    expect(wrapper.emitted('remove')[0][1]).toBe('test1')
  })

  it('when input, should emit input', () => {
    wrapper = createWrapper()
    wrapper.vm.input('test', 'test1')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toBe('test')
    expect(wrapper.emitted('input')[0][1]).toBe('test1')
  })
})

describe('elements/autocomplete/multiple.vue - single and desktop', () => {
  let wrapper
  let sanbox
  let filterOptions = [{ 'text': 'Blgeria' }, { 'text': 'Albania' }, { 'text': 'afghalnistan' }]
  let sortOptionsStub

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        multiple: false
      },
      data() {
        return {
          filterOptions: filterOptions
        }
      },
      computed: {
        isMobile: false
      },
      stubs: {
        'multiselect': Multiselect
      },
      methods: {
        sortByAllOptions: sortOptionsStub,
        renderOptions: sortOptionsStub
      }
    }, options || {})
    return shallowMount(AutocompleteComponent, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    sortOptionsStub = sanbox.stub().returns(filterOptions)
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('Given no props value, autocompleteValue should be initialize', () => {
    expect(wrapper.vm.value).toBeFalsy()
    expect(wrapper.vm.autocompleteValue).toEqual({})
  })

  it('Given autocomplete is single, when click option , value should be set properly, and selectFlag should be set right', () => {
    wrapper.find('input.multiselect__input').trigger('focus')
    wrapper.findAll('.dp-field__autocomplete-single-item').at(0).trigger('click')
    expect(wrapper.vm.autocompleteValue).toEqual({'text': 'Blgeria'})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.selectFlag).toBe(true)
    })
  })

  it('when internalClose was run , select should be closed', () => {
    wrapper.vm.open()
    wrapper.vm.internalClose()
    expect(wrapper.vm.isOpened).toBe(false)
    expect(wrapper.vm.showError).toBe(true)
  })

  it('given customAvailable is true, autocompleteValue should be set after user change search query and close dropdown', () => {
    wrapper.setProps({
      customAvailable: true
    })
    wrapper.vm.searchChange('customValue')
    wrapper.vm.close()
    expect(wrapper.vm.autocompleteValue).toEqual({
      'text': 'customValue'
    })
  })

  it('Given autocomplete is single, and remove was run , should reset searchQuery and $refs.autocomplete.search and selectFlag', () => {
    wrapper = createWrapper({
      data() {
        return {
          selectFlag: false,
          searchQuery: 'test1'
        }
      }
    })
    wrapper.vm.$refs.autocomplete.search = 'test'
    wrapper.vm.removeHandler()
    expect(wrapper.vm.searchQuery).toBe('')
    expect(wrapper.vm.$refs.autocomplete.search).toBe('')
    expect(wrapper.vm.selectFlag).toBe(true)
  })

  it('Given autocomplete is single,and isMobile is false and remove was run , should reset searchQuery and $refs.autocomplete.search and should not reset selectFlag', () => {
    wrapper = createWrapper({
      data() {
        return {
          selectFlag: false,
          searchQuery: 'test1'
        }
      },
      computed: {
        isMobile: () => true
      }
    })
    wrapper.vm.$refs.autocomplete.search = 'test'
    wrapper.vm.removeHandler()
    expect(wrapper.vm.searchQuery).toBe('')
    expect(wrapper.vm.$refs.autocomplete.search).toBe('')
    expect(wrapper.vm.selectFlag).toBe(false)
  })
})

describe('elements/autocomplete/multiple.vue - multiple and desktop', () => {
  let wrapper
  let sanbox
  let filterOptions = [{ 'text': 'Blgeria' }, { 'text': 'Albania' }, { 'text': 'afghalnistan' }]
  let sortOptionsStub

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        multiple: true
      },
      data() {
        return {
          filterOptions: filterOptions
        }
      },
      computed: {
        isMobile: false
      },
      stubs: {
        'multiselect': Multiselect
      },
      methods: {
        sortByAllOptions: sortOptionsStub,
        renderOptions: sortOptionsStub
      }
    }, options || {})
    return shallowMount(AutocompleteComponent, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    sortOptionsStub = sanbox.stub().returns(filterOptions)
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('Given autocomplete is multiple, When select, dropdown not disappear', () => {
    expect(wrapper.find(Multiselect).props().closeOnSelect).toBe(false)
  })

  it('Given autocomplete is multiple, after select, dropdown still show', () => {
    wrapper.find('input.multiselect__input').trigger('focus')
    wrapper.findAll('.dp-button--checkbox').at(0).trigger('click')
    expect(wrapper.find('.multiselect__content-wrapper').isVisible()).toBe(true)
  })

  it('Given autocomplete is multiple and value set, method isChecked', () => {
    wrapper = createWrapper({
      propsData: {
        value: [{'text': 'afghalnistan'}, {'text': 'Albania'}]
      }
    })
    expect(wrapper.vm.isChecked({'text': 'afghalnistan'})).toBe('afghalnistan')
    expect(wrapper.vm.isChecked({'text': 'asdf'})).toBe('')
  })

  it('Given autocomplete is multiple, When select, checkbox is checked', () => {
    wrapper = createWrapper({
      propsData: {
        value: [{ text: 'Albania' }]
      }
    })
    // expect(wrapper.findAll('ComCheckbox').at(1).props().value).toBe('Albania')
    expect(wrapper.findAll('.dp-button--checkbox').at(1).classes()).toContain('checked')
  })

  it('Given autocomplete is multiple, when select, value should be set properly', () => {
    wrapper.find('input.multiselect__input').trigger('focus')
    wrapper.findAll('.dp-button--checkbox').at(0).trigger('click')
    expect(wrapper.vm.autocompleteValue).toEqual([{ text: 'Blgeria' }])
    wrapper.findAll('.dp-button--checkbox').at(2).trigger('click')
    expect(wrapper.vm.autocompleteValue).toEqual([{ text: 'Blgeria' }, { text: 'afghalnistan' }])
  })

  it('given customAvailable is true, autocompleteValue should be set after user change search query and close dropdown', () => {
    wrapper = createWrapper({
      propsData: {
        customAvailable: true,
        value: [{
          'text': 'firstText'
        }]
      }
    })
    wrapper.vm.searchChange('customValue')
    wrapper.vm.close()
    expect(wrapper.vm.autocompleteValue).toEqual([{
      'text': 'firstText'
    }, {
      'text': 'customValue'
    }])
  })

  it('Given autocomplete is multiple, When set multipleAlt is true, append , in front of the selection', () => {
    wrapper = createWrapper({
      propsData: {
        multipleAlt: true,
        value: [{'text': 'afghalnistan'}, {'text': 'Albania'}]
      }
    })
    wrapper.vm.multipleAltDom()
    expect(wrapper.findAll('.multiselect__tag-symbol').length).toBe(1)
    expect(wrapper.findAll('.multiselect__tag-symbol').at(0).html()).toBe('<span class="multiselect__tag-symbol">,</span>')
  })

  it('Given autocomplete is  multiple, and remove was run , should not reset searchQuery and $refs.autocomplete.search and selectFlag', () => {
    wrapper = createWrapper({
      data() {
        return {
          selectFlag: false,
          searchQuery: 'test1'
        }
      }
    })
    wrapper.vm.$refs.autocomplete.search = 'test1'
    wrapper.vm.removeHandler()
    expect(wrapper.vm.searchQuery).toBe('test1')
    expect(wrapper.vm.$refs.autocomplete.search).toBe('test1')
    expect(wrapper.vm.selectFlag).toBe(false)
  })
})

describe('elements/autocomplete/multiple.vue - single and mobile', () => {
  let wrapper
  let sanbox
  let closeStub

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        options: [{ text: 'Blgeria' }, { text: 'Albania' }, { text: 'afghalnistan' }],
        multiple: false
      },
      computed: {
        isMobile() {
          return true
        }
      },
      stubs: {
        'multiselect': Multiselect
      }
    }, options || {})
    return shallowMount(AutocompleteComponent, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('given in mobile, internalClose called, close should not be called', () => {
    closeStub = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        close: closeStub
      }
    })
    wrapper.vm.internalClose()
    expect(closeStub.called).toBe(false)
  })

  // it('given in mobile, when option select, dropdown should hiden', () => {
  //   wrapper.find('input.multiselect__input').trigger('focus')
  //   expect(wrapper.find('.multiselect__content-wrapper').isVisible()).toBe(true)
  //   wrapper.findAll('.dp-field__autocomplete-single-item').at(0).trigger('click')
  //   expect(wrapper.find('.multiselect__content-wrapper').isVisible()).toBe(false)
  // })

  it('Given autocomplete is single, isValidValue is true , isMobile is true , trigger close ,confirmOpen should be false', () => {
    wrapper = createWrapper({
      computed: {
        isValidValue: () => true
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp__close').trigger('click')
      expect(wrapper.vm.confirmOpen).toBe(false)
    })
  })

  it('Given confirmOpen is true, autocompleteVlue was not null , When confirm was run ,confirmOpen should be false, autoCompleteVlue should be null', () => {
    wrapper = createWrapper({
      data() {
        return {
          autocompleteValue: {text: 'testtest'},
          confirmOpen: true
        }
      }
    })
    wrapper.vm.confirm()
    expect(wrapper.vm.confirmOpen).toBe(false)
    expect(wrapper.vm.autocompleteValue).toEqual({})
  })

  it('Given single , isMobile true, when clickCloseButton was run, select should be closed', () => {
    wrapper.vm.open()
    wrapper.vm.clickCloseButton()
    expect(wrapper.vm.isOpened).toBe(false)
    expect(wrapper.vm.showError).toBe(true)
  })
})

describe('elements/autocomplete/multiple.vue - multiple and mobile', () => {
  let wrapper
  let sanbox
  let setDropdownPositionStub

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        options: [{ text: 'Blgeria' }, { text: 'Albania' }, { text: 'afghalnistan' }],
        multiple: true
      },
      computed: {
        isMobile() {
          return true
        }
      },
      stubs: {
        'multiselect': Multiselect
      }
    }, options || {})
    return shallowMount(AutocompleteComponent, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('Given autocomplete is multiple, isValidValue is true , isMobile is true , call clickCloseButton ,confirmOpen should be true', () => {
    wrapper = createWrapper({
      computed: {
        isValidValue: () => true
      }
    })
    wrapper.vm.open()
    expect(wrapper.vm.confirmOpen).toBe(false)
    wrapper.vm.clickCloseButton()
    expect(wrapper.vm.confirmOpen).toBe(true)
  })

  it('Given confirmOpen is true, autocompleteVlue was not null , When confirm was run ,confirmOpen should be false, autoCompleteVlue should be null', () => {
    wrapper = createWrapper({
      data() {
        return {
          autocompleteValue: [{test: 'testtest'}],
          confirmOpen: true
        }
      }
    })
    wrapper.vm.confirm()
    expect(wrapper.vm.confirmOpen).toBe(false)
    expect(wrapper.vm.autocompleteValue).toEqual([])
  })

  it('given mobile, setDropdownPositionStub called after input change', () => {
    setDropdownPositionStub = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        setDropdownPosition: setDropdownPositionStub
      }
    })
    wrapper.vm.input()
    wrapper.vm.$nextTick(() => {
      expect(setDropdownPositionStub.called).toBe(true)
    })
  })

  it('bindKeyEvents() should update all tags tabindex and bind input key event', () => {
    const updateAllTagsTabIndexSpy = jest.fn()
    const {vm} = wrapper
    vm.updateAllTagsTabIndex = updateAllTagsTabIndexSpy

    vm.bindKeyEvents()

    expect(updateAllTagsTabIndexSpy).toHaveBeenCalled()
    expect(vm.inputElement).not.toBeNull()
  })
  it('onInputKeyUp() should focus last tag when press left arrow key', () => {
    const event = {
      stopPropagation: jest.fn(),
      key: KEY_VALUES.ARROW_LEFT,
      target: { selectionStart: 0 }
    }
    const focusSpy = jest.fn()
    const querySelectorSpy = jest.fn(() => ({
      focus: focusSpy
    }))
    const {vm} = wrapper
    vm.$el.querySelector = querySelectorSpy

    vm.onInputKeyUp(event)

    // expect
    expect(event.stopPropagation).toHaveBeenCalled()
    expect(focusSpy).toHaveBeenCalled()
    expect(querySelectorSpy.mock.calls[0][0]).toBe('.multiselect__tag:last-child')
  })
  it('updateAllTagsTabIndex() should set all tags tabindex to -1', () => {
    const {vm} = wrapper
    const tags = [{}]
    vm.$el.querySelectorAll = () => tags

    vm.updateAllTagsTabIndex()

    expect(tags[0].tabIndex).toBe(-1)
  })
  describe('onTagKeyUp()', () => {
    let deleteTagSpy
    let focusPreviousTag
    let focusNextTag
    let selectedTag
    beforeEach(() => {
      deleteTagSpy = jest.fn()
      focusPreviousTag = jest.fn()
      focusNextTag = jest.fn()
      selectedTag = {}
      const {vm} = wrapper
      vm.$el.querySelector = () => selectedTag
      vm.deleteTag = deleteTagSpy
      vm.focusNextTag = focusNextTag
      vm.focusPreviousTag = focusPreviousTag
    })

    it.each([KEY_VALUES.DELETE, KEY_VALUES.BACKSPACE])(
      'should call deleteTag() when user press %s key',
      (key) => {
        const event = { key }
        wrapper.vm.onTagKeyUp(event)
        expect(deleteTagSpy).toHaveBeenCalled()
        expect(focusNextTag).not.toHaveBeenCalled()
        expect(focusPreviousTag).not.toHaveBeenCalled()
      })
    it('should call focusPreviousTag() when user press left arrow key', () => {
      const event = { key: KEY_VALUES.ARROW_LEFT }
      wrapper.vm.onTagKeyUp(event)
      expect(focusPreviousTag).toHaveBeenCalled()
      expect(focusNextTag).not.toHaveBeenCalled()
      expect(deleteTagSpy).not.toHaveBeenCalled()
    })
    it('should call focusNextTag() when user press right arrow key', () => {
      const event = { key: KEY_VALUES.ARROW_RIGHT }
      wrapper.vm.onTagKeyUp(event)
      expect(focusNextTag).toHaveBeenCalled()
      expect(deleteTagSpy).not.toHaveBeenCalled()
      expect(focusPreviousTag).not.toHaveBeenCalled()
    })
    it('should not call any methods when user press other key', () => {
      const event = { key: KEY_VALUES.A }
      wrapper.vm.onTagKeyUp(event)
      expect(focusNextTag).not.toHaveBeenCalled()
      expect(deleteTagSpy).not.toHaveBeenCalled()
      expect(focusPreviousTag).not.toHaveBeenCalled()
    })
    it('should not call any methods when there is no selected tag', () => {
      selectedTag = null
      const event = { key: KEY_VALUES.DELETE }
      wrapper.vm.onTagKeyUp(event)
      expect(focusNextTag).not.toHaveBeenCalled()
      expect(deleteTagSpy).not.toHaveBeenCalled()
      expect(focusPreviousTag).not.toHaveBeenCalled()
    })
  })

  describe('deleteTag()', () => {
    let event, tag, iconDispatchSpy
    beforeEach(() => {
      iconDispatchSpy = jest.fn()
      event = {
        stopPropagation: jest.fn()
      }
      tag = {
        querySelector: () => ({
          nextSibling: {},
          dispatchEvent: iconDispatchSpy
        })
      }
    })
    it('should trigger click on icon delete', () => {
      wrapper.vm.deleteTag(event, tag)

      expect(event.stopPropagation).toHaveBeenCalled()
      expect(iconDispatchSpy).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
    })
    it('should focus input element after delete tag', () => {
      tag.nextSibling = null
      const focusSpy = jest.fn()
      wrapper.vm.inputElement.focus = focusSpy
      wrapper.vm.deleteTag(event, tag)

      expect(focusSpy).toHaveBeenCalled()
    })
  })
  it('focusPreviousTag() should focus previous tag', () => {
    const focusSpy = jest.fn()
    const tag = {
      previousSibling: {
        focus: focusSpy
      }
    }
    wrapper.vm.focusPreviousTag(tag)
    expect(focusSpy).toHaveBeenCalled()
  })
  describe('focusNextTag()', () => {
    let focusSpy, tag
    beforeEach(() => {
      focusSpy = jest.fn()
      tag = {
        nextSibling: {
          focus: focusSpy
        }
      }
    })
    it('should focus next tag and return it', () => {
      const nextTag = wrapper.vm.focusNextTag(tag)

      expect(focusSpy).toHaveBeenCalled()
      expect(nextTag).toBe(tag.nextSibling)
    })
    it('should focus input when there is no next tag and return the input element', () => {
      tag.nextSibling = null
      const inputFocusSpy = jest.fn()
      const {vm} = wrapper
      vm.inputElement.focus = inputFocusSpy
      const input = vm.focusNextTag(tag)

      expect(focusSpy).not.toHaveBeenCalled()
      expect(inputFocusSpy).toHaveBeenCalled()
      expect(input).toBe(vm.inputElement)
    })
  })
})
