import {
  shallowMount
} from 'dp-test'
import ComHero from 'components/elements/hero/hero.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('elements/Hero', () => {
  let wrapper
  let sanbox
  let imgSrc = 'https://picsum.photos/768/380'

  function createWrapper(options) {
    return shallowMount(ComHero, options)
  }

  function generateWrapper(options) {
    return createWrapper(_.merge({
      propsData: {
        isCurved: true,
        curveColor: '#FFFFFF',
        size: '',
        imageUrl: 'https://picsum.photos/1440/500?random',
        imageAlt: 'My Hero Image',
        overlayOpacity: ''
      }
    }, options || {}))
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = generateWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('when hero is initialized, hero should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when hero size is set, hero background-image should be used', () => {
    wrapper.setProps({
      imageUrl: imgSrc,
      size: 'small'
    })
    expect(wrapper.find('.dp-hero').classes()).toContain('dp-hero--sm')
    wrapper.setProps({
      imageUrl: imgSrc,
      size: 'medium'
    })
    expect(wrapper.find('.dp-hero').classes()).toContain('dp-hero--md')
    wrapper.setProps({
      imageUrl: imgSrc,
      size: 'large'
    })
    expect(wrapper.find('.dp-hero').classes()).toContain('dp-hero--lg')
    expect(wrapper.find('.dp-hero__bg').exists()).toBe(true)
    expect(wrapper.find('.dp-hero__bg').attributes().style).toBe(`background-image: url(${imgSrc});`)
  })

  it('when hero curved is set, hero curve should be shown', () => {
    wrapper.setProps({
      isCurved: false,
      imageUrl: imgSrc
    })
    expect(wrapper.find('.dp-hero__curve').exists()).toBe(false)
    wrapper.setProps({
      isCurved: true,
      imageUrl: imgSrc
    })
    expect(wrapper.find('.dp-hero__curve').exists()).toBe(true)
  })

  it('when hero curved color is set, hero curve color should be correct', () => {
    let curveColor = '#000'
    wrapper.setProps({
      curveColor: curveColor,
      imageUrl: imgSrc
    })
    expect(wrapper.find('.dp-hero__curve path').attributes().fill).toBe(curveColor)
  })

  it('when hero opacity is set, hero opacity should be shown', () => {
    let opacity = '0.7'
    wrapper.setProps({
      overlayOpacity: opacity,
      imageUrl: imgSrc
    })
    expect(wrapper.find('.dp-hero__overlay').attributes().style).toBe(`opacity: ${opacity};`)
  })
})
