import {
  shallowMount
} from 'dp-test'
import ComLabel from 'components/elements/label/label.vue'

describe('elements/Label', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComLabel, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when label text is set, label text should be shown', () => {
    wrapper = createWrapper({
      slots: {
        default: 'New Label'
      }
    })
    expect(wrapper.find('.dp-label small').text()).toBe('New Label')
  })

  it('when red label is set, red class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-label--red'
      }
    })
    expect(wrapper.classes()).toContain('dp-label--red')
  })

  it('when orange label is set, orange class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-label--orange'
      }
    })
    expect(wrapper.classes()).toContain('dp-label--orange')
  })

  it('when gray label is set, gray class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-label--gray'
      }
    })
    expect(wrapper.classes()).toContain('dp-label--gray')
  })

  it('when medium label is set, medium class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-label--md'
      }
    })
    expect(wrapper.classes()).toContain('dp-label--md')
  })

  it('when large label is set, large class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-label--lg'
      }
    })
    expect(wrapper.classes()).toContain('dp-label--lg')
  })

  it('when discount label is set, discount class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        discountText: '20% OFF!'
      }
    })
    expect(wrapper.find('.dp-label').classes()).toContain('dp-label--discount')
    expect(wrapper.find('.dp-label strong').text()).toBe('20% OFF!')
  })
})
