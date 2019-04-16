import { mount } from 'dp-test'
import FilterHeader from 'modules/filter-header/filter-header.vue'
import sinon from 'sinon'

describe('modules/filter-header/filter-header.vue', () => {
  let wrapper
  let sanbox

  function createWrapper(options) {
    return mount(FilterHeader, options)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('should render props: status', () => {
    const props = {
      status: '23 travel plans'
    }
    wrapper = createWrapper({
      propsData: {
        ...props
      }
    })
    expect(wrapper.find('.dp-filter-header__status').text()).toBe(props.status)
  })

  it('should render props: sticky', () => {
    const props = {
      sticky: true
    }
    wrapper = createWrapper({
      propsData: {
        ...props
      }
    })
    expect(wrapper.find('.dp-filter-header--sticky').exists()).toBe(true)
  })

  it('should render button edit with "Edit Search" when "editLabel" is "Edit Search"', () => {
    expect(wrapper.find('.dp-filter-header__button__edit').text()).toBe('')
    wrapper.setProps({
      editLabel: 'Edit Search'
    })
    expect(wrapper.find('.dp-filter-header__button__edit').text()).toBe('Edit Search')
  })

  it('should render button filter with "Filter 0" when "filterLabel" is "Filter"', () => {
    expect(wrapper.find('.dp-filter-header__button__filter').text()).toBe('0')
    wrapper.setProps({
      filterLabel: 'Filter'
    })
    expect(wrapper.find('.dp-filter-header__button__filter').text()).toMatch(/^Filter( |\n)*0$/)
  })

  it.each`
    searchDetail   | sticky
    ${null}        | ${false}
    ${''}          | ${false}
    ${'  '}        | ${false}
    ${'Any thing'} | ${true} `(
  'should NOT render "dp-filter-header__label" when "sticky" is $sticky and "searchDetail" is $searchDetail', ({sticky, searchDetail}) => {
    wrapper.setProps({
      sticky,
      searchDetail
    })
    expect(wrapper.find('.dp-filter-header__label').exists()).toBeFalsy()
  })

  it.each`
    searchDetail                 | expected
    ${'<b>HTML Text</b>'}        | ${'<b>HTML Text</b>'}
    ${'Single trip | 4 persons'} | ${'Single trip | 4 persons'} `(
  'should render "dp-filter-header__label" with $expected when "searchDetail" is $searchDetail and "sticky" is false', ({ searchDetail, expected }) => {
    wrapper.setProps({
      searchDetail,
      sticky: false
    })
    expect(wrapper.find('.dp-filter-header__label').text()).toBe(expected)
  })

  it('should emit event open-search when click EDIT button', () => {
    wrapper.find('.dp-filter-header__button__edit').trigger('click')
    expect(wrapper.emitted('open-search')).toBeTruthy()
  })

  it('should emit event open-filter when click FILTER button', () => {
    wrapper.find('.dp-filter-header__button__filter').trigger('click')
    expect(wrapper.emitted('open-filter')).toBeTruthy()
  })
})
