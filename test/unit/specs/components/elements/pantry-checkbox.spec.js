import { shallowMount, mount } from 'dp-test'
import ComCheckbox from 'elements/checkbox/src/checkbox.vue'
import ComCheckboxGroup from 'elements/checkbox/src/checkbox-group.vue'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import sinon from 'sinon'
import _ from 'lodash'
describe('elements/Checkbox', () => {
  let wrapper
  let sanbox
  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(ComCheckbox, _.merge({
      propsData: {
        label: 'Checkbox A',
        value: 'Checkbox A'
      }
    }, options || {}))
  }

  function createGroupButton(option) {
    const CheckboxGroup = _.merge({
      data() {
        return {
          currentValue: [],
          options: [
            { key: 1, text: 'Checkbox A', isChecked: false },
            { key: 2, text: 'Checkbox B', isChecked: true },
            { key: 3, text: 'Checkbox C', isChecked: false }
          ],
          isValid: false,
          errorMessage: 'Please select one option above',
          errorStyle: ''
        }
      },
      methods: {
        changeSelected(value) {
          this.currentValue = value
        }
      },
      components: {
        ComCheckboxGroup,
        ComCheckbox
      },
      template: `<com-checkbox-group :value="currentValue" @input="changeSelected" :errorStatus="isValid" :message="errorMessage" :errorStyle="errorStyle"><div :key="option.key" v-for="(option, index) in options"><com-checkbox :label="option.key">{{ option.text }}</com-checkbox></div></com-checkbox-group>`
    }, option || {})
    return mount(CheckboxGroup, {
      attachToDocument: true
    })
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('checkbox value should correct', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.$el.querySelector('.dp-field__checkbox .dp-checkbox__area').value).toBe('Checkbox A')
    expect(wrapper.find('.dp-field__checkbox .dp-field__label').text()).toBe('Checkbox A')
  })

  it('checkbox value should correct', () => {
    wrapper = generateWrapper()
    wrapper.find('.dp-field__checkbox .dp-checkbox__area').trigger('change')
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('CheckboxGroup value should correct', () => {
    wrapper = createGroupButton()
    expect(wrapper.find('.dp-field__checkbox-group')).not.toBe(null)
    expect(wrapper.findAll('.dp-checkbox__area').at(0).attributes().value).toBe('1')
    expect(wrapper.findAll('.dp-checkbox__area').at(1).attributes().value).toBe('2')
    expect(wrapper.findAll('.dp-checkbox__area').at(2).attributes().value).toBe('3')
  })

  it('currentValue should be correct in CheckboxGroup', () => {
    wrapper = createGroupButton()
    wrapper.findAll('.dp-field__label').at(1).trigger('click')
    expect(wrapper.vm.currentValue).toEqual([2])
  })

  it('errorMessage should be underline when errorStyle is "" in checkbox', () => {
    wrapper = generateWrapper()
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })

  it('errorMessage should be popover when errorStyle is popover in checkbox', () => {
    wrapper = generateWrapper({
      propsData: {
        errorStyle: 'popover'
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-checkbox__error-popup').exists()).toBe(true)
  })

  it('errorMessage should be underline when errorStyle is "" in checkboxGroup', () => {
    wrapper = createGroupButton()
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(true)
  })

  it('errorMessage should be popover when errorStyle is popover in checkboxGroup', () => {
    wrapper = createGroupButton({
      data() {
        return {
          errorStyle: 'popover'
        }
      }
    })
    expect(wrapper.find('.dp-field__invalid').exists()).toBe(false)
    expect(wrapper.find('.dp-com-checkbox__error-popup').exists()).toBe(true)
  })

  describe('Keyboard Support', () => {
    function tabindexes(arraywrapper) {
      return arraywrapper.wrappers.map(aWrapper => aWrapper.attributes().tabindex)
    }
    it('should set tabindex to 0 on first focusable checkbox when mounted', () => {
      wrapper = createGroupButton()
      let checkboxes = wrapper.findAll('input[type="checkbox"]')
      expect(tabindexes(checkboxes)).toEqual(['0', '-1', '-1'])
    })
    it('should move forward when user press key DOWN or RIGHT', () => {
      wrapper = createGroupButton()
      wrapper.findAll('input[type="checkbox"]').at(0).element.focus()
      let group = wrapper.find('.dp-field__checkbox-group')
      group.trigger('keydown', {
        key: KEY_VALUES.ARROW_RIGHT
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['-1', '0', '-1'])
      group.trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['-1', '-1', '0'])
      group.trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['0', '-1', '-1'])
    })
    it('should backward when user press key UP or LEFT', () => {
      wrapper = createGroupButton()
      wrapper.findAll('input[type="checkbox"]').at(0).element.focus()
      let group = wrapper.find('.dp-field__checkbox-group')
      group.trigger('keydown', {
        key: KEY_VALUES.ARROW_LEFT
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['-1', '-1', '0'])
      group.trigger('keydown', {
        key: KEY_VALUES.ARROW_UP
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['-1', '0', '-1'])
    })
    it('should NOT change focus when user press TAB', () => {
      wrapper = createGroupButton()
      let group = wrapper.find('.dp-field__checkbox-group')
      group.trigger('keydown', {
        key: KEY_VALUES.TAB
      })
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['0', '-1', '-1'])
    })
    it('should set tabindex to 0 on first focusable checkbox when options list was changed ', () => {
      let error = sanbox.stub(console, 'error')
      wrapper = createGroupButton({
        data() {
          return {
            currentValue: [],
            options: [
              { key: 1, text: 'Checkbox A', isChecked: false }
            ]
          }
        }
      })
      wrapper.find('.dp-field__checkbox-group').trigger('keydown', {
        key: KEY_VALUES.ARROW_DOWN
      })
      expect(error.called).toBeFalsy()
      wrapper.vm.options = [
        { key: 4, text: 'Checkbox D' },
        { key: 5, text: 'Checkbox E' },
        { key: 6, text: 'Checkbox F' }
      ]
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['0', '-1', '-1'])
    })
    it('should set tabindex to 0 on first focusable checkbox when focusout of the group ', () => {
      wrapper = createGroupButton()
      wrapper.trigger('keydown', {
        key: KEY_VALUES.ARROW_LEFT
      })
      wrapper.trigger('focusout')
      expect(tabindexes(wrapper.findAll('input[type="checkbox"]'))).toEqual(['0', '-1', '-1'])
    })
    // it('should toggle checkbox\'s state when press ENTER', () => {
    //   wrapper = createGroupButton()
    //   wrapper.findAll('input[type="checkbox"]').at(0).trigger('keypress', {
    //     key: KEY_VALUES.ENTER
    //   })
    //   expect(wrapper.vm.currentValue).toEqual([1])
    // })
  })
})
