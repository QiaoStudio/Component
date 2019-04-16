import {
  shallowMount
} from 'dp-test'
import ComArticleTileWithSnippet from 'components/modules/article-tile-with-snippet/article-tile-with-snippet.vue'
import sinon from 'sinon'
import _ from 'lodash'
import thumbnailImg from 'stories/modules/article-tile-with-snippet/images/article-thumbnail@250.jpeg'

describe('/modules/article-tile', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComArticleTileWithSnippet, _.merge({
      propsData: {
      },
      slots: {
        img: `<img src="${thumbnailImg}"/>`,
        label: '<span class="dp-label dp-label--white-bg dp-label--blue"><small>TRAVEL</small></span>',
        title: '<span class="dp-tile__title">Best car rental comparison sites for your next road trip (2018)</span>',
        snippet: '<span class="dp-tile__snippet">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, dui eu euismod tempor, nisi eros pellentesque leo, vita</span>',
        author: '<span class="dp-tile__author">By Author</span>',
        date: '<span class="dp-tile__date">Nov 20, 2017</span>'
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
    expect(wrapper.find('.dp-tile__title').text()).toBe('Best car rental comparison sites for your next road trip (2018)')
    expect(wrapper.find('.dp-label').text()).toBe('TRAVEL')
    expect(wrapper.find('.dp-tile__snippet').text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, dui eu euismod tempor, nisi eros pellentesque leo, vita')
    expect(wrapper.find('.dp-tile__author').text()).toBe('By Author')
    expect(wrapper.find('.dp-tile__date').text()).toBe('Nov 20, 2017')
  })

  it('should render root tag of component is <div> when link prop empty', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  it('should render root tag of component is <a> when link prop has value', () => {
    wrapper.setProps({
      link: 'https://google.com',
      target: '_self'
    })
    expect(wrapper.is('a')).toBe(true)
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

  it('should contain only <span> tag when link property is existed', () => {
    wrapper.setProps({
      link: '/blog/category/name-category',
      target: '_blank'
    })
    expect(wrapper.contains('p')).toBeFalsy()
    expect(wrapper.contains('div')).toBeFalsy()
    expect(wrapper.contains('span')).toBeTruthy()
  })

  it('should add class dp-tile--stacked when snippetPosition set to bottom and isStacked set to true', () => {
    wrapper.setProps({
      snippetPosition: 'bottom',
      isStacked: true
    })
    expect(wrapper.find('.dp-tile--snippet-stacked').exists()).toBe(true)
  })

  it.each`
    position | stacked | expected
    ${'right'} | ${false} | ${false}
    ${'bottom'} | ${false} | ${false}
    ${'right'} | ${true} | ${false}
  `('should not add class dp-tile--stacked when snippetPosition set to $position, isStacked set to $stacked', ({position, stacked, expected}) => {
  wrapper.setProps({
    snippetPosition: position,
    isStacked: stacked
  })
  expect(wrapper.find('.dp-tile--snippet-stacked').exists()).toBe(expected)
})
})
