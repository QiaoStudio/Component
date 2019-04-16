import { shallowMount } from 'dp-test'
import ComBadge from 'components/elements/badge/badge.vue'

describe('elements/Badge', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComBadge, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('should display text if value was set as text', () => {
    wrapper = createWrapper({
      propsData: {
        value: 'new'
      }
    })
    expect(wrapper.vm.content).toBe('new')
    expect(wrapper.find('.dp-badge__content').text()).toBe('new')
  })

  it('should display number if value was set as number', () => {
    wrapper = createWrapper({
      propsData: {
        value: 20
      }
    })
    expect(wrapper.vm.content).toBe(20)
    expect(wrapper.find('.dp-badge__content').text()).toBe('20')
  })

  it('should display correctly if value was set as number and max > value', () => {
    wrapper = createWrapper({
      propsData: {
        value: 10,
        max: 9
      }
    })
    expect(wrapper.vm.content).toBe('9+')
    expect(wrapper.find('.dp-badge__content').text()).toBe('9+')
  })

  it('should display correctly if value was set as number and max <= value', () => {
    wrapper = createWrapper({
      propsData: {
        value: 9,
        max: 9
      }
    })
    expect(wrapper.vm.content).toBe(9)
    expect(wrapper.find('.dp-badge__content').text()).toBe('9')
  })
})
