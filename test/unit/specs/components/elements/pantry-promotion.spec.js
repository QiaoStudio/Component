import {
  shallowMount, mount
} from 'dp-test'
import sinon from 'sinon'
import ComPromotion from 'components/elements/promotion/promotion.vue'
import Popover from 'elements/popover/index.js'

describe('elements/Promotion', () => {
  let wrapper
  let sandbox

  function createWrapper(options) {
    return shallowMount(ComPromotion, options)
  }

  function createMountWrapper(options) {
    return mount(ComPromotion, options)
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    wrapper.destroy()
    sandbox.restore()
  })

  it('when promotionSummary text is set, promotion text should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        promotionSummary: 'New promotion!'
      }
    })
    expect(wrapper.find('span:nth-child(2)').text()).toBe('New promotion!')
  })
  it('when not pass right value of actionLabel,should validate it right', () => {
    const actionLabel = wrapper.vm.$options.props.actionLabel
    expect(actionLabel.type).toBe(String)
    expect(typeof actionLabel.validator).toBe('function')
    expect(actionLabel.validator('div')).toBeTruthy()
    expect(actionLabel.validator('<div class="div">hello</div>')).toBeFalsy()
    expect(actionLabel.validator('hello,<p id="ip" class="what">how are you</p>')).toBeFalsy()
    expect(actionLabel.validator('<a name="a" href="#">text link</a> lalal')).toBeFalsy()
    expect(actionLabel.validator('test<ul class="test"><li>test</li></ul>test')).toBeFalsy()
    expect(actionLabel.validator('test<ol><li>test</li></ol>')).toBeFalsy()
    expect(actionLabel.validator('test<hr>test')).toBeFalsy()
    expect(actionLabel.validator('test<h1 title="gobear">test</h1>test')).toBeFalsy()
    expect(actionLabel.validator('test<h2>test</h2>test')).toBeFalsy()
    expect(actionLabel.validator('test<h3 title="gobear" class="title>test</h3>test')).toBeFalsy()
    expect(actionLabel.validator('test<h4 title="gobear">test</h4>test')).toBeFalsy()
    expect(actionLabel.validator('test<h5 title="gobear">test</h5>test')).toBeFalsy()
    expect(actionLabel.validator('test<h6 title="gobear">test</h6>test')).toBeFalsy()
  })

  it('When actionLabel is empty string, button should be hidden', () => {
    wrapper = createWrapper({
      propsData: {
        actionLabel: ''
      }
    })
    expect(wrapper.find('.dp-promotion__button').exists()).toBe(false)
  })

  it('promotion popover should not show case isShowPromotionPopover is true but not exist popoverTitle and promotionContents', () => {
    wrapper = createWrapper({
      data() {
        return {
          isShowPromotionPopover: true
        }
      },
      propsData: {
        popoverTitle: ''
      },
      computed: {
        promotionContents() { return '' }
      }
    })
    expect(wrapper.find('.dp-Com-promotion-popup').exists()).toBe(false)
  })

  it('promotion popover should not show case isShowPromotionPopover is false', () => {
    wrapper = createWrapper({
      data() {
        return {
          isShowPromotionPopover: false
        }
      }
    })
    expect(wrapper.find('.dp-Com-promotion-popup').exists()).toBe(false)
  })

  it('when mounted, proloadImage should be called', () => {
    let preloadImageStub = sandbox.stub()
    wrapper = createWrapper({
      methods: {
        preloadImage: preloadImageStub
      }
    })
    expect(preloadImageStub.called).toBe(true)
  })


  it('promotionContents should return correct case content change ', () => {
    wrapper = createWrapper({
      data() {
        return {
          isShowPromotionPopover: true
        }
      }
    })

    wrapper.setProps({
      popoverContent: [{
        'title': '',
        'content': '',
        'image': '',
        'time': ''
      }]
    })
    expect(wrapper.vm.promotionContents).toBe('')

    wrapper.setProps({
      popoverContent: Object.create([{}, {}])
    })
    expect(wrapper.vm.promotionContents).toBe('')
  })

  it('promotionContents should return correct case content change ', () => {
    wrapper = createWrapper({
      data() {
        return {
          isShowPromotionPopover: true
        }
      },
      propsData: {
        popoverContent: Object.create([{}, {}])
      }
    })
    expect(wrapper.vm.promotionContents).toBe('')
  })

  it('validate flipPosition validator', () => {
    const flipPosition = wrapper.vm.$options.props.flipPosition
    expect(flipPosition.type).toEqual([Array, String])
    expect(flipPosition.required).toBeFalsy()
    expect(flipPosition.default).toBe('flip')
    expect(typeof flipPosition.validator).toBe('function')
    expect(flipPosition.validator('testtest')).toBeFalsy()
    expect(flipPosition.validator('clockwise')).toBeTruthy()
    expect(flipPosition.validator('counterclockwise')).toBeTruthy()
    expect(flipPosition.validator(['top', 'right', 'bottom'])).toBeTruthy()
    expect(flipPosition.validator(['top', 'tests', 'bottom'])).toBeFalsy()
  })

  it('promotion popover should cantain correct class when popoverClass is seted', () => {
    wrapper = createMountWrapper({
      data() {
        return {
          isShowPromotionPopover: true
        }
      },
      propsData: {
        popoverTitle: 'title',
        popoverClass: 'testClass'
      },
      stubs: {
        'dp-popover': Popover
      }
    })
    expect(wrapper.find(Popover).props().popoverClass).toBe('dp-popover__promotion testClass')
  })

  it('computeIconPosition should return right value', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.computeIconPosition).toBe(22)
    wrapper.setData({
      iconPosition: 20
    })
    expect(wrapper.vm.computeIconPosition).toBe(42)
  })

  it('computePreventOverflowOption should return right value ,when pass props, and isUseCustomValue is true', () => {
    wrapper = createWrapper({
      propsData: {
        isUseCustomOption: true,
        preventOverflowOption: 'test'
      }
    })
    expect(wrapper.vm.computePreventOverflowOption).toEqual('test')
  })

  it('computePreventOverflowOption should return right value ,when pass props, and isUseCustomValue is true', () => {
    wrapper = createWrapper({
      propsData: {
        isUseCustomOption: true
      }
    })
    expect(wrapper.vm.computePreventOverflowOption).toEqual({})
  })

  it('computePreventOverflowOption should return right value ,when pass props, and not pass isUseCustomValue', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.computePreventOverflowOption).toEqual({})
  })

  it('computeOffsetOption should return right value, when isUseCustomValue is true', () => {
    wrapper = createWrapper({
      propsData: {
        isUseCustomOption: true
      }
    })
    expect(wrapper.vm.computeOffsetOption.fn).toBe(wrapper.vm.computeOffsetFunction)
  })

  it('computeOffsetOption should return right value, when pass props, and isUseCustomValue is true', () => {
    const offsetOption = {
      fn: () => {}
    }
    wrapper = createWrapper({
      propsData: {
        isUseCustomOption: true,
        offsetOption
      }
    })
    expect(wrapper.vm.computeOffsetOption).toBe(offsetOption)
  })

  it('computeOffsetOption should return right value, when pass props,and isUseCustomValue is true', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.computeOffsetOption).toEqual({})
  })

  it('when promotionType is list-view isUseCustomValue is true, and pass offsetOption should return right offsetOption', () => {
    let option = {test: 'test'}
    wrapper = createWrapper({
      propsData: {
        promotionType: 'list-view',
        offsetOption: option,
        isUseCustomOption: true
      }
    })
    expect(wrapper.vm.computeOffsetOption).toBe(option)
  })

  it('when promotionType is grid-view and isUseCustomValue is true, and pass offsetOption should return right offsetOption', () => {
    let option = {test: 'test'}
    wrapper = createWrapper({
      propsData: {
        promotionType: 'grid-view',
        offsetOption: option,
        isUseCustomOption: true
      }
    })
    expect(wrapper.vm.computeOffsetOption).toBe(option)
  })

  it('when promotionType is grid-view and isUseCustomValue is true, and not pass offsetOption should return empty object', () => {
    wrapper = createWrapper({
      propsData: {
        promotionType: 'grid-view',
        isUseCustomOption: true
      }
    })
    expect(wrapper.vm.computeOffsetOption).toEqual({})
  })
})
