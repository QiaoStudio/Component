import {
  mount
} from 'dp-test'
import ComLogo from 'components/elements/logo/logo.vue'

describe('elements/Logo', () => {
  let wrapper

  function createWrapper(options) {
    return mount(ComLogo, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when logo icon is set, logo icon should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('.dp-logo__img').isVisible()).toBeTruthy()
    expect(wrapper.find('.dp-logo__img img').attributes().src).toBe('https://picsum.photos/62')
  })

  it('when logo text is set, logo text should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        insurerName: 'FWD',
        planName: 'Premium Assurance Authorised Workshop'
      }
    })
    expect(wrapper.text()).toBe('FWD, Premium Assurance Authorised Workshop')
  })

  it('dp-logo-title should not exist, when not passing insurerName', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        planName: 'Premium Assurance Authorised Workshop'
      }
    })
    expect(wrapper.find('.dp-logo-title').exists()).toBe(false)
  })

  it('dp-logo-title should not exist, when not passing planName', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        insurerName: 'FWD'
      }
    })
    expect(wrapper.find('.dp-logo-title').exists()).toBe(false)
  })

  it('when pass href, should bind right value to a tag, which wrap img', () => {
    wrapper = createWrapper({
      propsData: {
        href: 'test',
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('.dp-logo__img>a').attributes().href).toBe('test')
  })

  it('when not pass href, should bind right value to a tag, which wrap img', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('.dp-logo__img>a').attributes().href).toBe('javascript:;')
  })

  it('when pass href, should bind right value to dp-logo-title', () => {
    wrapper = createWrapper({
      propsData: {
        href: 'test',
        src: 'https://picsum.photos/62',
        insurerName: 'FWD',
        planName: 'Premium Assurance Authorised Workshop'
      }
    })
    expect(wrapper.find('.dp-logo-title').attributes().href).toBe('test')
  })

  it('when not pass href, should bind right value to dp-logo-title', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        insurerName: 'FWD',
        planName: 'Premium Assurance Authorised Workshop'
      }
    })
    expect(wrapper.find('.dp-logo-title').attributes().href).toBe('javascript:;')
  })

  it('when not pass target, should return _self', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('.dp-logo__img>a').attributes().target).toBe('_self')
  })

  it('when pass target, should return right value', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        target: '_top'
      }
    })
    expect(wrapper.find('.dp-logo__img>a').attributes().target).toBe('_top')
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

  it('when pass maxWidth and maxHeight, imageStyle should be rendered right', () => {
    wrapper = createWrapper({
      propsData: {
        maxWidth: 50,
        maxHeight: 50
      }
    })
    expect(wrapper.vm.imageStyle).toEqual({maxWidth: '50px', maxHeight: '50px'})
  })

  it('when maxWidth or maxHeight is not pass, imageStyle should be rendered right', () => {
    wrapper = createWrapper({
      propsData: {
        maxWidth: 50
      }
    })
    expect(wrapper.vm.imageStyle).toEqual({maxWidth: '50px', maxHeight: ''})
    wrapper.setProps({
      maxWidth: '',
      maxHeight: 50
    })
    expect(wrapper.vm.imageStyle).toEqual({maxWidth: '', maxHeight: '50px'})
    wrapper.setProps({
      maxHeight: '',
      maxWidth: ''
    })
    expect(wrapper.vm.imageStyle).toEqual({maxWidth: '', maxHeight: ''})
  })

  it('default alt value of alt should be "logo"', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('img').attributes().alt).toBe('logo')
  })

  it('if alt property is passed, alt value of logo image will be changed accordingly', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        alt: 'testAlt'
      }
    })
    expect(wrapper.find('img').attributes().alt).toBe('testAlt')
  })

  it('when containerHeight and containerWidth is not set, container should have default value 62x62', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        containerHeight: '',
        containerWidth: ''
      }
    })
    expect(wrapper.find('.dp-logo__img').attributes().style).toBe('width: 62px; height: 62px;')
  })

  it('when containerHeight and containerWidth is set, container should have correct size', () => {
    wrapper = createWrapper({
      propsData: {
        containerHeight: 100,
        containerWidth: 100,
        src: 'https://picsum.photos/62'
      }
    })
    expect(wrapper.find('.dp-logo__img').attributes().style).toBe('width: 100px; height: 100px;')
  })

  it('when imgVertAlignDesktop, imgVertAlignMobile, imgHorizAlignMobile, imgHorizAlignDesktop are set to top and left, corresponding class should be added', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        imgVertAlignMobile: 'top',
        imgVertAlignDesktop: 'top',
        imgHorizAlignMobile: 'left',
        imgHorizAlignDesktop: 'left'
      }
    })
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--mobile-top')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--mobile-left')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--desktop-top')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--desktop-left')
  })

  it('when imgVertAlignDesktop, imgVertAlignMobile, imgHorizAlignMobile, imgHorizAlignDesktop are set to bottom and right, corresponding class should be added', () => {
    wrapper = createWrapper({
      propsData: {
        src: 'https://picsum.photos/62',
        imgVertAlignMobile: 'bottom',
        imgVertAlignDesktop: 'bottom',
        imgHorizAlignMobile: 'right',
        imgHorizAlignDesktop: 'right'
      }
    })
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--mobile-bottom')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--mobile-right')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--desktop-bottom')
    expect(wrapper.find('.dp-logo__img').classes()).toContain('dp-logo__img--desktop-right')
  })
})
