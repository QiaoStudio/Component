import {shallowMount} from 'dp-test'
import ComAuthorByline from 'components/modules/author-byline/author-byline.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('/modules/author-byline', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComAuthorByline, _.merge({
      propsData: {
        author: 'Walter White'
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

  it('dp-author should return a correct value case author is setted', () => {
    wrapper.setProps({
      author: 'Da Vinci'
    })
    expect(wrapper.find('.dp-author-wrap a').text()).toBe('Da Vinci')
  })

  it('dp-author href should return a correct value case href is setted', () => {
    wrapper.setProps({
      author: 'Da Vinci',
      href: 'http://xxxxxx.com'
    })
    expect(wrapper.find('.dp-author-wrap a').attributes().href).toBe('http://xxxxxx.com')
    wrapper.setProps({
      author: 'Da Vinci',
      href: ''
    })
    expect(wrapper.find('.dp-author-wrap a').attributes().href).toBe(undefined)
  })

  it('Author Avatar should not show case authorAvatar is invalid', () => {
    wrapper.setProps({
      authorAvatar: ''
    })
    expect(wrapper.find('.dp-author__img-wrap').exists()).toBe(false)
    expect(wrapper.find('.dp-author-name').exists()).toBe(true)
  })

  it('Author Avatar should not show case authorAvatar is null', () => {
    wrapper.setProps({
      authorAvatar: null
    })
    expect(wrapper.find('.dp-author__img-wrap').exists()).toBe(false)
    expect(wrapper.find('.dp-author-name').exists()).toBe(true)
  })

  it('Author Avatar should show case authorAvatar is exist', () => {
    wrapper.setProps({
      authorAvatar: 'image.png',
      alt: 'Walter White'
    })
    expect(wrapper.find('.dp-author__img-wrap').exists()).toBe(true)
    expect(wrapper.find('.dp-author__img-wrap img').attributes().src).toBe('image.png')
    expect(wrapper.find('.dp-author__img-wrap img').attributes().alt).toBe('Walter White')
    expect(wrapper.find('.dp-author-name').exists()).toBe(false)
  })

  it('Author Avatar should show but do not have alt attribute case alt is null', () => {
    wrapper.setProps({
      authorAvatar: 'image.png',
      alt: ''
    })
    expect(wrapper.find('.dp-author__img-wrap').exists()).toBe(true)
    expect(wrapper.find('.dp-author__img-wrap img').attributes().src).toBe('image.png')
    expect(wrapper.find('.dp-author__img-wrap img').attributes().alt).toBe('')
  })

  it('updateTime should be defualt format case time is setted', () => {
    wrapper.setProps({
      time: 1542931200000
    })
    expect(wrapper.find('.dp-date-wrap').text()).toContain('23 Nov 2018')
  })

  it('updateTime should formatter correct case formatter is setted', () => {
    wrapper.setProps({
      formatter: 'YYYY MMM DD',
      time: 1542931200000
    })
    expect(wrapper.find('.dp-date-wrap').text()).toContain('2018 Nov 23')
  })

  it('author image wrap should contain correct maxHeight and maxWidth case maxHeight,maxWidth has a value', () => {
    wrapper.setProps({
      authorAvatar: 'image.png',
      maxHeight: 50,
      maxWidth: 50
    })
    expect(wrapper.find('.dp-author__img-wrap').attributes().style).toBe('max-height: 50px; max-width: 50px;')
  })

  it('dp-span-wrap should be contained case isSpanWrap is true', () => {
    wrapper.setProps({
      isSpanWrap: true
    })
    expect(wrapper.find('.dp-span--sm').classes()).toContain('dp-span-wrap')
  })

  it('dp-span-wrap should be contained case in mobile', () => {
    wrapper = generateWrapper({
      propsData: {
        isSpanWrap: false
      },
      computed: {
        isMobile() {
          return true
        }
      }
    })
    expect(wrapper.find('.dp-span--sm').classes()).toContain('dp-span-wrap')
  })
})
