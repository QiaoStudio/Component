import {
  shallowMount
} from 'dp-test'
import ComTabs from 'components/elements/tabs/tabItem.vue'
import _ from 'lodash'

describe('elements/TabItem', () => {
  let wrapper
  const $parent = {
    tabItems: []
  }
  function generateWrapper(options) {
    return shallowMount(ComTabs, _.merge({
      propsData: {
        label: 'tab item name',
        disabled: false,
        visible: true
      },
      mocks: $parent
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when component created, should push item to parent', () => {
    wrapper = generateWrapper()
    expect(wrapper.vm.$parent.tabItems).toEqual([wrapper.vm])
  })

  it('when visible is setted false, component will be disvisiable', () => {
    wrapper = generateWrapper({
      propsData: {
        visible: false
      }
    })
    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('if called active(), component will be show', () => {
    wrapper = generateWrapper()
    wrapper.vm.activate()
    expect(wrapper.isVisible()).toBeTruthy()
  })

  it('if called deactivate(), component will be disvisiable', () => {
    wrapper = generateWrapper()
    wrapper.vm.deactivate()
    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('when slot exists , show the slot in div', () => {
    wrapper = generateWrapper({
      slots: {
        default: '<div class="el">test el</div>'
      }
    })
    expect(wrapper.find('.el').text()).toBe('test el')
  })
})
