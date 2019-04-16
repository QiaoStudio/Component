import {
  shallowMount
} from 'dp-test'
import ComBrand from 'components/elements/brand/brand.vue'

describe('elements/Brand', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComBrand, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when brand country is set, brand country anchor should be correct', () => {
    wrapper = createWrapper({
      propsData: {
        country: 'th'
      }
    })
    expect(wrapper.find('.dp-brand__logo > a').attributes().href).toBe('/th')
  })

  it('when brand type is blog, brand should use correct logo', () => {
    wrapper = createWrapper({
      propsData: {
        type: 'blog'
      }
    })
    expect(wrapper.find('.dp-brand').classes()).toContain('dp-brand--blog')
  })

  it('when brand fallbacks are set, brand fallbacks should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        country: 'hk',
        fallbackLogo: 'https://picsum.photos/121/36',
        fallbackTagline: 'https://picsum.photos/121/11'
      }
    })
    expect(wrapper.find('.dp-brand__logo image').attributes().src).toBe('https://picsum.photos/121/36')
    expect(wrapper.find('.dp-brand__tagline image').attributes().src).toBe('https://picsum.photos/121/11')
  })
})
