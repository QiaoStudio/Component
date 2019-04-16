import {
  mount
} from 'dp-test'
import SearchBar from 'components/elements/search-bar/search-bar.vue'
import Autocomplete from 'components/elements/autocomplete/autocomplete.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('elements/Select', () => {
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

  function createWrapper(options) {
    return mount(SearchBar, _.merge({
      propsData: {
        label: 'test',
        options: [{ text: 'ba al', url: 'baal' }, { text: 'Blgeria', url: 'apple' }]
      },
      componments: {Autocomplete}
    }, options || {}))
  }

  it('componment should contain autocomplete', () => {
    expect(wrapper.find(Autocomplete).exists()).toBe(true)
  })

  it('when not pass options, option should be an empty array', () => {
    wrapper = mount(SearchBar)
    expect(wrapper.vm.options).toEqual([])
  })

  it('when errorStatus is true, should show errorPopover', () => {
    wrapper = createWrapper({
      propsData: {
        errorStatus: true
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-popover__popup-error').exists()).toBe(true)
    })
  })

  it('when search-change emit search-change', () => {
    wrapper.vm.$refs.autocomplete.searchChange('test', 2)
    expect(wrapper.emitted('search-change')).toBeTruthy()
    expect(wrapper.emitted('search-change')[0][0]).toBe('test')
    expect(wrapper.emitted('search-change')[0][1]).toBe(2)
  })

  it('when input emit input', () => {
    wrapper.vm.$refs.autocomplete.input('test')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toBe('test')
  })

  it('when value change, and selectFlag is true, should emit select-option', () => {
    wrapper = createWrapper({
      data() {
        return {
          value: 'test'
        }
      }
    })
    wrapper.vm.selectFlag = true
    wrapper.setData({value: 'te'})
    expect(wrapper.emitted('select-option')).toBeTruthy()
    expect(wrapper.emitted('select-option')[0][0]).toBe('te')
    expect(wrapper.vm.selectFlag).toBe(false)
  })

  it('when value change, and selectFlag is false, should not emit select-option', () => {
    wrapper = createWrapper({
      data() {
        return {
          value: 'test'
        }
      }
    })
    wrapper.vm.selectFlag = false
    wrapper.setData({value: 'te'})
    expect(wrapper.emitted('select-option')).toBeFalsy()
  })

  it('when select was called, selectFlag should be true', () => {
    wrapper.vm.selectFlag = false
    wrapper.vm.select()
    expect(wrapper.vm.selectFlag).toBe(true)
  })

  it('when click searchIcon should emit select-option', () => {
    wrapper = createWrapper({
      data() {
        return {
          value: 'test'
        }
      }
    })
    wrapper.find('.dp-field__search-icon').trigger('click')
    expect(wrapper.emitted('select-option')).toBeTruthy()
    expect(wrapper.emitted('select-option')[0][0]).toBe('test')
  })
  it('when called open ,set isOpened to true', () => {
    wrapper.vm.open()
    expect(wrapper.vm.isOpened).toBe(true)
  })
  it('when called close ,set isOpened to false', () => {
    wrapper.vm.close()
    expect(wrapper.vm.isOpened).toBe(false)
  })
  it.each`
    pill  | expected
    ${null}  | ${['dp-field__search-bar']}
    ${false} | ${['dp-field__search-bar']}
    ${true}  | ${['dp-field__search-bar', 'dp-border-pill']}`(
  'style classes should be $expected when "pill" is $pill', ({ pill, expected }) => {
    wrapper.setProps({ pill })
    expect(wrapper.classes()).toEqual(expected)
  })
})
