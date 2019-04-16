import {
  shallowMount
} from 'dp-test'
import ComCoverageDetail from 'components/elements/coverage-detail/coverage-detail.vue'

describe('elements/Coverage Detail', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComCoverageDetail, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when pass coverage, should render right element', () => {
    wrapper = createWrapper({
      propsData: {
        coverage: [{
          'content': 'test',
          'title': 'test'
        }, {
          'content': 'test',
          'title': 'test'
        }]
      }
    })
    expect(wrapper.findAll('.dp-coverage-detail__cell-title')).toHaveLength(2)
  })

  it('when pass coverage, should render response html', () => {
    wrapper = createWrapper({
      propsData: {
        coverage: [{
          'content': 'test',
          'title': 'test'
        }]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when not pass coverage, should render right default value', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.coverage).toEqual([])
  })

  it('When props view type is list, should use list view type clss', () => {
    wrapper = createWrapper({
      propsData: {
        viewType: 'list'
      }
    })
    expect(wrapper.find('.dp-coverage-detail').exists()).toBeFalsy()
    expect(wrapper.find('.dp-coverage-detail--list').exists()).toBeTruthy()
  })

  it('Prop viewType is not required, is a String and validates correctly', () => {
    const viewType = wrapper.vm.$options.props.viewType
    expect(viewType.type).toBe(String)
    expect(viewType.required).toBeFalsy()
    expect(typeof viewType.validator).toBe('function')
    expect(viewType.validator('bl')).toBeFalsy()
    expect(viewType.validator('grid')).toBeTruthy()
    expect(viewType.validator('list')).toBeTruthy()
  })
})
