import {
  shallowMount
} from 'dp-test'
import ComLogoTitle from 'components/elements/logo-title/logo-title.vue'

describe('elements/com-logo-title', () => {
  let wrapper
  function createWrapper(option) {
    return shallowMount(ComLogoTitle, option)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when pass insureName should render right insureName', () => {
    wrapper = createWrapper({
      propsData: {
        insurerName: 'test insure name'
      }
    })
    expect(wrapper.find('.dp-logo-title__insure').text()).toBe('test insure name,')
  })

  it('when not pass insureName should render right insureName', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-logo-title__insure').text()).toBe('')
  })

  it('when pass planName should render right planName', () => {
    wrapper = createWrapper({
      propsData: {
        planName: 'test plan name'
      }
    })
    expect(wrapper.find('.dp-logo-title__plan').text()).toBe('test plan name')
  })

  it('when pass planName should render right planName', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-logo-title__plan').text()).toBe('')
  })

  it('when pass src, should render right element', () => {
    wrapper = createWrapper({
      propsData: {
        href: 'test'
      }
    })
    expect(wrapper.find('a.dp-logo-title').attributes().href).toBe('test')
  })

  it('when not pass src, should render right element', () => {
    wrapper = createWrapper()
    expect(wrapper.find('a.dp-logo-title').attributes().href).toBe('javascript:;')
  })

  it('when not pass target, should return _self', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-logo-title').attributes().target).toBe('_self')
  })

  it('when pass target, should return right value', () => {
    wrapper = createWrapper({
      propsData: {
        target: '_top'
      }
    })
    expect(wrapper.find('.dp-logo-title').attributes().target).toBe('_top')
  })

  it('when not pass right value of target,should validate it right', () => {
    const target = wrapper.vm.$options.props.target
    expect(target.type).toBe(String)
    expect(target.required).toBeFalsy()
    expect(typeof target.validator).toBe('function')
    expect(target.validator('bl')).toBeFalsy()
    expect(target.validator('_blank')).toBeTruthy()
    expect(target.validator('_self')).toBeTruthy()
    expect(target.validator('_parent')).toBeTruthy()
    expect(target.validator('_top')).toBeTruthy()
  })
})
