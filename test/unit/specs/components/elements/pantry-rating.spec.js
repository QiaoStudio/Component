import {
  shallowMount
} from 'dp-test'
import ComRating from 'components/elements/rating/rating.vue'
import sinon from 'sinon'

describe('elements/Rating', () => {
  let wrapper
  let sanbox

  function createWrapper(options) {
    return shallowMount(ComRating, options)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('When props rating is 4, should return right stars array', () => {
    wrapper = createWrapper({
      propsData: {
        rating: 4
      }
    })
    expect(wrapper.vm.stars).toEqual([1, 1, 1, 1, 0])
  })

  it('When props rating is 0, should return right stars array', () => {
    wrapper = createWrapper({
      propsData: {
        rating: 0
      }
    })
    expect(wrapper.vm.stars).toEqual([0, 0, 0, 0, 0])
  })

  it('When props rating is default, should return right stars array', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.stars).toEqual([0, 0, 0, 0, 0])
  })

  it('When props reviews is default, should NOT show right reviews', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-rating__label').exists()).toBeFalsy()
  })

  it('When and only when reviews-text is set, show right reviews', () => {
    wrapper = createWrapper({
      propsData: {
        reviews: 10
      }
    })
    expect(wrapper.find('.dp-rating__label').exists()).toBeFalsy()
    wrapper.setProps({
      reviewsText: 'Reviews'
    })
    expect(wrapper.find('.dp-rating__label').text()).toBe('10 Reviews')
  })

  it('When props reviews is 100, should show right reviews', () => {
    wrapper = createWrapper({
      propsData: {
        reviews: 100,
        reviewsText: 'Reviews'
      }
    })
    expect(wrapper.find('.dp-rating__label').text()).toBe('100 Reviews')
  })

  it('When user click component, should emit reviewPopup event', () => {
    wrapper = createWrapper()
    wrapper.trigger('click')
    expect(wrapper.emitted('review-popup')).toBeTruthy()
  })

  it('When href is set, root tag should be "a"', () => {
    wrapper = createWrapper({
      propsData: {
        href: 'http://www.google.com'
      }
    })
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.attributes().type).toBeUndefined()
  })

  it('When href is not set and review-popup is set, root tag and type should be "button"', () => {
    wrapper = createWrapper({
      listeners: {
        'review-popup': () => {}
      }
    })
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attributes().type).toBe('button')
  })

  it('When none of href or review-popup is set, root tag should be "span"', () => {
    wrapper = createWrapper()
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.attributes().type).toBeUndefined()
  })
})
