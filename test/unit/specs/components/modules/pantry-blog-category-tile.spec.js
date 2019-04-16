import {
  shallowMount
} from 'dp-test'
import ComBlogCategoryTile from 'components/modules/blog-category-tile/blog-category-tile.vue'
import sinon from 'sinon'
import _ from 'lodash'
import thumbnailImg from 'stories/modules/blog-category-tile/62.jpeg'

describe('/modules/blog-category-tile', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComBlogCategoryTile, _.merge({
      propsData: {
      },
      slots: {
        img: `<img class="dp-blog-category-tile__img-wrap__img" src="${thumbnailImg}" alt="Personal Finance"/>`,
        title: '<h2 class="dp-blog-category-tile__content-title">Personal Finance</h2>',
        description: '<p>Stay up to date with the latest regulations and car insurance deals!</p>'
      }
    }, {} || options))
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = generateWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('should render slots correctly when tile slots are set', () => {
    expect(wrapper.find('.dp-blog-category-tile__content-title').text()).toBe('Personal Finance')
    expect(wrapper.find('.dp-blog-category-tile__content-desc').text()).toBe('Stay up to date with the latest regulations and car insurance deals!')
    expect(wrapper.find('.dp-blog-category-tile__img-wrap__img').exists()).toBeTruthy()
  })

  it('should render root tag of component is <div> when link prop empty', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  it('should render link correctly when pass link and target', () => {
    wrapper.setProps({
      link: 'https://google.com',
      target: '_blank'
    })
    expect(wrapper.element.getAttribute('href')).toBe('https://google.com')
    expect(wrapper.element.getAttribute('target')).toBe('_blank')
    wrapper.setProps({
      target: '_self'
    })
    expect(wrapper.element.getAttribute('target')).toBe('_self')
  })
})
