import { shallowMount } from 'dp-test'
import SelectMobile from 'components/elements/select/select-mobile.vue'
import sinon from 'sinon'
import _ from 'lodash'
import $ from 'jquery'

describe('elements/Select mobile', () => {
  let wrapper
  let sanbox
  global.$ = global.jQuery = $

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(SelectMobile, _.merge({
      propsData: {
        label: 'label'
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('change should emit change event', () => {
    wrapper = generateWrapper()
    let options = [
      { key: 'key0', text: 'text0' },
      { key: 'key1', text: 'text1' } ]
    wrapper.setProps({
      items: options,
      value: 'key0'
    })
    wrapper.setMethods({
      getSelectedItem: () => {
        return { key: 'key0', text: 'text0' }
      }
    })
    wrapper.vm.change()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  it('must init the dropdownlist correctly', (done) => {
    wrapper = generateWrapper()

    let options = [
      { key: 'key0', text: 'text0' },
      { key: 'key1', text: 'text1' },
      { key: 'key2', text: 'text2' },
      { key: 'key3', text: 'text3', disabled: true },
      { key: 'key4', text: 'text4' },
      { key: 'key5', text: 'text5' }
    ]
    wrapper.setProps({
      items: options,
      value: 'key2'
    })
    expect(wrapper.vm.value).toBe('key2')
    expect(wrapper.vm.text).toBe('text2')
    expect($(wrapper.vm.$el).find('.dp-field__select-holder').text().trim()).toBe('text2')
    // expect($(wrapper.vm.$el).find('select option:selected').text().trim()).toBe('text2')
    wrapper.vm.value = 'key3'
    expect(wrapper.vm.value).toBe('key3')
    wrapper.vm.$nextTick(() => {
      expect($(wrapper.vm.$el).find('select option:selected').text().trim()).toBe('text3')
      expect($(wrapper.vm.$el).find('select option:nth-child(1)').prop('disabled')).toBe(false)
      done()
    })
  })
  it('blur should emit select-mobile-blur event', () => {
    wrapper = generateWrapper()
    wrapper.vm.blur()
    expect(wrapper.emitted('select-mobile-blur')).toBeTruthy()
  })
  it('click should emit selectMobileClick event', () => {
    wrapper = generateWrapper()
    wrapper.vm.click()
    expect(wrapper.emitted('select-mobile-click')).toBeTruthy()
  })

  it('should render slot "prepend" correctly', () => {
    wrapper = generateWrapper({
      slots: {
        prepend: '<b class="inner_label">SORT BY</b>'
      },
      propsData: {
        items: [
          {key: 1, text: '1'}
        ]
      }
    })
    expect(wrapper.find('.dp-field__select-holder').text()).toBe('SORT BY 1')
  })
})
