import {
  shallowMount
} from 'dp-test'
import ComArticleTile from 'components/modules/article-tile/article-tile.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('/modules/article-tile', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComArticleTile, _.merge({
      propsData: {
        type: 'default',
        isStacked: 'false'
      },
      slots: {
        img: '<div class="dp-tile__img" role="img" aria-label="article image" style="background-image: url(https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/322fb61b32f50a13b88acced96470b6ec60960be51b88f1b9245961aa493108619b7d0afbe55963c26aae99a6769c112?pictype=scale&from=30113&version=3.3.3.3&uin=3281858405&fname=articale-tile-img.jpg&size=750);"></div>'
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

  it('when set the type to large,dp-tile__article--large should be added', () => {
    wrapper.setProps({
      'type': 'large'
    })
    expect(wrapper.find('.dp-tile__article').classes()).toContain('dp-tile__article--large')
  })
  it('when set the type to small,dp-tile__article--small should be added', () => {
    wrapper.setProps({
      'type': 'small'
    })
    expect(wrapper.find('.dp-tile__article').classes()).toContain('dp-tile__article--small')
  })
  it('when set the type to x-small,dp-tile__article--x-small should be added', () => {
    wrapper.setProps({
      'type': 'x-small'
    })
    expect(wrapper.find('.dp-tile__article').classes()).toContain('dp-tile__article--x-small')
  })
  it('when set the type to x-small, no tile style', () => {
    wrapper.setProps({
      'type': 'x-small'
    })
    expect(wrapper.find('.dp-tile__article').classes()).not.toContain('dp-tile')
  })
  it('when set the type to full,dp-tile__article--full should be added', () => {
    wrapper.setProps({
      'type': 'full'
    })
    expect(wrapper.find('.dp-tile__article').classes()).toContain('dp-tile__article--full')
  })
  it('when set the type to a null value,should return correct html', () => {
    wrapper.setProps({
      'type': ''
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when set the isStacked to true,dp-tile__article--stacked should be added', () => {
    wrapper.setProps({
      'isStacked': true
    })
    expect(wrapper.find('.dp-tile__article').classes()).toContain('dp-tile__article--stacked')
  })
  it('when tile slot is set, tile should be shown correct', () => {
    wrapper = generateWrapper({
      slots: {
        title: '<div class="dp-tile__title">Ask any local about the origins of all this cultivation</div>',
        author: '<span class="dp-tile__author">By Jeremy</span>',
        date: '<span class="dp-tile__date">Feb 16, 2018</span>'
      }
    })
    expect(wrapper.find('.dp-tile__title').text()).toBe('Ask any local about the origins of all this cultivation')
    expect(wrapper.find('.dp-tile__author').text()).toBe('By Jeremy')
    expect(wrapper.find('.dp-tile__date').text()).toBe('Feb 16, 2018')
  })
  it('when tile url is set, tile should be rendered as a link', () => {
    wrapper.setProps({
      url: '/blog/category/a-article-content-page',
      target: '_blank'
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should update tile link and target accordingly', () => {
    wrapper.setProps({
      url: '/blog/category/a-article-content-page',
      target: '_blank'
    })
    expect(wrapper.find('a').attributes().href).toBe('/blog/category/a-article-content-page')
    expect(wrapper.find('a').attributes().target).toBe('_blank')
    wrapper.setProps({
      url: '/other-link',
      target: '_self'
    })
    expect(wrapper.find('a').attributes().href).toBe('/other-link')
    expect(wrapper.find('a').attributes().target).toBe('_self')
  })
})
