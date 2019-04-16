import {
  shallowMount
} from 'dp-test'
import ComExclusive from 'components/elements/exclusive/exclusive.vue'

describe('elements/Exclusive', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComExclusive, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when exclusive text is set, exclusive text should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        messageTip: 'New exclusive!'
      }
    })
    expect(wrapper.text()).toBe('New exclusive!')
  })

  it('when exclusive text is set, exclusive icon should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        messageTip: 'Check crown'
      }
    })
    expect(wrapper.find('i').classes()).toContain('fa-crown')
  })
})
