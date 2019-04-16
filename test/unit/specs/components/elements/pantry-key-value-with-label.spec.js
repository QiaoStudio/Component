import {
  shallowMount
} from 'dp-test'
import _ from 'lodash'
import ComKeyValueWithLabel from 'components/elements/key-value-with-label/src/key-value-with-label.vue'

describe('elements/Key Value with Label', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComKeyValueWithLabel, _.merge({
      propsData: {
        valueFrom: '200',
        valueTo: '300',
        asteriskVisible: true
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when top label is set then top label should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        topLabel: {
          visible: true,
          content: 'You might get up to'
        }
      }
    })
    expect(wrapper.find('.dp-key-value-with-label__text-top').text()).toBe('You might get up to')
  })

  it('when top label is not set then top label should show as default', () => {
    wrapper.setProps({
      topLabel: {}
    })
    expect(wrapper.find('.dp-key-value-with-label__text-top').isVisible()).toBeTruthy()
  })

  it('when bottom label is not set then bottom label should show as default', () => {
    wrapper.setProps({
      bottomLabel: {}
    })
    expect(wrapper.find('.dp-key-value-with-label__text-bottom').isVisible()).toBeTruthy()
  })

  it('when bottom label is set then bottom label should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        bottomLabel: {
          visible: true,
          content: 'million dong at year 15 when the plan is mature'
        }
      }
    })
    expect(wrapper.find('.dp-key-value-with-label__text-bottom').text()).toBe('million dong at year 15 when the plan is mature')
  })

  it('when top label visibility is set to false then top label should not show', () => {
    wrapper = createWrapper({
      propsData: {
        topLabel: {
          visible: false,
          content: 'You might get up to'
        }
      }
    })
    expect(wrapper.find('.dp-key-value-with-label__text-top').isVisible()).toBeFalsy()
  })

  it('when bottom label visibility is set to false then bottom label should not show', () => {
    wrapper = createWrapper({
      propsData: {
        bottomLabel: {
          visible: false,
          content: 'million dong at year 15 when the plan is mature'
        }
      }
    })
    expect(wrapper.find('.dp-key-value-with-label__text-bottom').isVisible()).toBeFalsy()
  })

  it('when text alignment on mobile is set to left then left class should be added', () => {
    let originalMobile = wrapper.vm.$screen.mobile
    wrapper.vm.$screen.mobile = function () {
      return true
    }
    wrapper = createWrapper({
      propsData: {
        alignMobile: 'left'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--left-alignment').exists()).toBeTruthy()
    wrapper.vm.$screen.mobile = originalMobile
  })

  it('when text alignment on mobile is set to right then right class should be added', () => {
    let originalMobile = wrapper.vm.$screen.mobile
    wrapper.vm.$screen.mobile = function () {
      return true
    }
    wrapper = createWrapper({
      propsData: {
        alignMobile: 'right',
        alignDesktop: 'right'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--right-alignment').exists()).toBeTruthy()
    wrapper.vm.$screen.mobile = originalMobile
  })

  it('when text alignment on mobile is set to wrong value then no class should be added', () => {
    let originalMobile = wrapper.vm.$screen.mobile
    wrapper.vm.$screen.mobile = function () {
      return true
    }
    wrapper = createWrapper({
      propsData: {
        alignMobile: 'rightleft'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--left-alignment').exists()).toBeFalsy()
    expect(wrapper.find('.dp-key-value-with-label--right-alignment').exists()).toBeFalsy()
    expect(wrapper.find('.dp-key-value-with-label--center-alignment').exists()).toBeFalsy()
    wrapper.vm.$screen.mobile = originalMobile
  })

  it('when text alignment on desktop is set to center then center class should be added', () => {
    wrapper = createWrapper({
      propsData: {
        alignDesktop: 'center'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--center-alignment').exists()).toBeTruthy()
  })

  it('when text alignment on desktop is set to right then right class should be added', () => {
    wrapper = createWrapper({
      propsData: {
        alignDesktop: 'right'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--right-alignment').exists()).toBeTruthy()
  })

  it('when text alignment on desktop is set to wrong value then no class should be added', () => {
    wrapper = createWrapper({
      propsData: {
        alignDesktop: 'centerleft'
      }
    })
    expect(wrapper.find('.dp-key-value-with-label--center-alignment').exists()).toBeFalsy()
    expect(wrapper.find('.dp-key-value-with-label--right-alignment').exists()).toBeFalsy()
    expect(wrapper.find('.dp-key-value-with-label--left-alignment').exists()).toBeFalsy()
  })

  it('when all props are set then tag should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        topLabel: {
          visible: true,
          content: 'You might get up to'
        },
        valueFrom: '200',
        valueTo: '300',
        asteriskVisible: true,
        bottomLabel: {
          visible: true,
          content: 'You might get up to'
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
