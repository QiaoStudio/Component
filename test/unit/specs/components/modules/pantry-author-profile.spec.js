import { shallowMount } from 'dp-test'
import ComAuthorProfile from 'components/modules/author-profile/author-profile.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('/modules/author-profile', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComAuthorProfile, _.merge({
      propsData: {
        author: 'Andre',
        description: 'test',
        authorAvatar: 'test',
        linkButtonText: 'test'
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

  it('when pass author prop , should render right author', () => {
    expect(wrapper.find('.dp-author-profile__author').text()).toBe('Andre')
  })

  it('when pass description prop , should render right description', () => {
    expect(wrapper.find('.dp-author-profile__description').text()).toBe('test')
  })

  it('when not pass authorAvatar prop , it should not exist', () => {
    wrapper.setProps({
      authorAvatar: '  '
    })
    expect(wrapper.find('.dp-author-profile__avatar').exists()).toBe(false)
    wrapper.setProps({
      authorAvatar: null
    })
    expect(wrapper.find('.dp-author-profile__avatar').exists()).toBe(false)
  })

  it('when pass valid authorAvatar, should render right authorAvatar', () => {
    wrapper.setProps({
      authorAvatar: 'test'
    })
    expect(wrapper.find('.dp-author-profile__avatar').exists()).toBe(true)
    expect(wrapper.find('.dp-author-profile__avatar img').attributes().src).toBe('test')
  })

  it('when pass valid alt, should render right authorAvatar', () => {
    wrapper.setProps({
      alt: 'test',
      authorAvatar: 'test'
    })
    expect(wrapper.find('.dp-author-profile__avatar').exists()).toBe(true)
    expect(wrapper.find('.dp-author-profile__avatar img').attributes().alt).toBe('test')
  })

  it('when not pass linkButtonText prop , it should not exist', () => {
    wrapper.setProps({
      linkButtonText: '  '
    })
    expect(wrapper.find('.dp-author-profile__link-button').exists()).toBe(false)
    wrapper.setProps({
      linkButtonText: null
    })
    expect(wrapper.find('.dp-author-profile__link-button').exists()).toBe(false)
  })

  it('when pass valid linkButtonText, should render right linkButtonText', () => {
    wrapper.setProps({
      linkButtonText: 'test'
    })
    expect(wrapper.find('.dp-author-profile__link-button').text()).toBe('test')
  })

  it('link button should has href case linkUrl has a value', () => {
    wrapper.setProps({
      linkUrl: 'test'
    })
    expect(wrapper.find('.dp-author-profile__link-button').attributes().href).toBe('test')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('link button should not has href case linkUrl value is null', () => {
    wrapper.setProps({
      linkUrl: ' '
    })
    expect(wrapper.find('.dp-author-profile__link-button').attributes().href).toBe(undefined)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
