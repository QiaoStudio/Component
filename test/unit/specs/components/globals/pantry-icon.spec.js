import { shallowMount } from 'dp-test'
import ComIcon from 'components/globals/icons/icon.vue'

describe('elements/Button content and class', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComIcon, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('button should display correct text', () => {
    wrapper = createWrapper({
      propsData: {
        type: 'brand',
        category: 'compare',
        display: 'dp-icon--sm-only'
      }
    })
    expect(wrapper.find('.dp-icon--sm-only').exists()).toBeTruthy()
    expect(wrapper.find('.dp-icon__brand--compare').exists()).toBeTruthy()
    expect(wrapper.find('.dp-icon').exists()).toBeTruthy()
  })
})
