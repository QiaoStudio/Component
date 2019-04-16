import { mount } from 'dp-test'
import FilterDrawer from 'modules/filter-drawer/filter-drawer.vue'
import sinon from 'sinon'

describe('modules/filter-drawer/filter-drawer.vue', () => {
  let wrapper
  let sanbox

  function createWrapper(options) {
    return mount(FilterDrawer, options)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('should render props: title', () => {
    const props = {
      title: '100 Plans'
    }
    wrapper = createWrapper({
      propsData: {
        ...props
      }
    })
    expect(wrapper.find('.dp-filter-drawer__header__title').text()).toBe(props.title)
  })

  it('should emit event apply-filters when click DONE button', () => {
    wrapper.find('.dp-filter-drawer__header__btn-done').trigger('click')
    expect(wrapper.emitted('apply-filters')).toBeTruthy()
  })

  it('should emit event reset-filters when click RESET button', () => {
    wrapper.find('.dp-filter-drawer__header__btn-reset').trigger('click')
    expect(wrapper.emitted('reset-filters')).toBeTruthy()
  })
})

