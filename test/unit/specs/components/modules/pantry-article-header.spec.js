import {
  shallowMount
} from 'dp-test'
import ComArticleHeader from 'components/modules/article-header/article-header.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('/modules/Com Article Header', () => {
  let wrapper
  let sanbox
  const title = 'Test'
  const alt = 'Test Image'
  const levels = [
    {
      text: 'Blog',
      link: 'https://www.xxxxxx.com',
      isVisible: true
    },
    {
      text: 'Budgeting',
      link: 'https://www.xxxxxx.com',
      isVisible: true
    }
  ]
  const author = {
    author: 'Walter White',
    href: 'http://xxxxxx.com',
    authorAvatar: 'https://picsum.photos/62',
    alt: 'Walter White',
    time: new Date('2018-11-22').toUTCString(),
    maxW: 40,
    maxH: 40,
    isSpanWrap: false,
    formatter: 'DD MMM YYYY'
  }

  function createWrapper(options) {
    return shallowMount(ComArticleHeader, options)
  }

  function generateWrapper(options) {
    return createWrapper(_.merge({
      propsData: {
        levels: levels,
        author: author,
        title: title,
        imageAlt: alt,
        imageUrl: 'https://picsum.photos/1218/754',
        mobileImageUrl: 'https://picsum.photos/767/474'
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

  it('when article header is initialized, article header should match snapshot', () => {
    wrapper.setProps({
      title: 'Title 1',
      imageAlt: 'New Image',
      imageUrl: 'https://picsum.photos/100/100',
      mobileImageUrl: 'https://picsum.photos/50/50'
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when article header title is set, article header title should be shown', () => {
    let title = 'Hello World!'
    wrapper.setProps({
      title: title
    })
    expect(wrapper.find('.dp-article-header .dp-title').exists()).toBe(true)
    expect(wrapper.find('.dp-article-header .dp-title').text()).toBe(title)
  })

  it('when article header imageUrl is set, article header imageUrl should be correct', () => {
    let imageUrl = 'https://picsum.photos/40/40'
    wrapper.setProps({
      imageAlt: alt,
      imageUrl: imageUrl
    })
    expect(wrapper.find('.dp-article-header__image img').exists()).toBe(true)
    expect(wrapper.find('.dp-article-header__image img').attributes().src).toBe(imageUrl)
    expect(wrapper.find('.dp-article-header__image img').attributes().alt).toBe(alt)
  })

  it('when article header mobileImageUrl is set, article header mobileImageUrl should be correct', () => {
    let mobileImageUrl = 'https://picsum.photos/1/1'
    wrapper.vm.$screen.resize = () => true
    wrapper.vm.$screen.mobile = () => true
    wrapper = createWrapper({
      propsData: {
        levels: levels,
        author: author,
        title: title,
        imageAlt: alt,
        imageUrl: 'https://picsum.photos/1218/754',
        mobileImageUrl: mobileImageUrl
      },
      computed: {
        isDesktop: () => false
      }
    })
    expect(wrapper.find('.dp-article-header__image img').exists()).toBe(true)
    expect(wrapper.vm.$el.querySelector('.dp-article-header__image img').originalSrc).toBe(mobileImageUrl)
    expect(wrapper.find('.dp-article-header__image img').attributes().src).toBe('invis.png')
    expect(wrapper.find('.dp-article-header__image img').attributes().alt).toBe(alt)
    expect(wrapper.find('.dp-article-header__image img').classes()).toContain('lazy-loading')
  })
})
