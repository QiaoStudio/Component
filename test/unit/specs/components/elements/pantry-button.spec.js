import { mount, shallowMount } from 'dp-test'
import ComButton from 'components/elements/button/button.vue'
import sinon from 'sinon'

describe('elements/Button content and class', () => {
  let wrapper
  let sanbox

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function createButton(option) {
    return mount({
      data() {
        return {
          buttonText: 'Search',
          buttonType: '',
          buttonSize: '',
          isBlock: false,
          isDisabled: false,
          hrefValue: '',
          pill: null
        }
      },
      components: {
        ComButton
      },
      template: `<com-button :href="hrefValue"
                                :class="[buttonSize, buttonType]"
                                :isBlock="isBlock"
                                :pill="pill"
                                :isDisabled="isDisabled">
                  <span v-html="buttonText"></span>
                 </com-button>`
    })
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('button should be a Button tag as default', () => {
    wrapper = createButton()
    wrapper.setData({
      hrefValue: ''
    })
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.find('.dp-button').attributes().type).toBe('button')
  })

  it('button should be a A tag when hrefValue is a valid value', () => {
    wrapper = createButton()
    wrapper.setData({
      hrefValue: 'http://www.xxxxxx.com'
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.find('.dp-button').attributes().href).toBe('http://www.xxxxxx.com')
  })

  it('button should display correct text', () => {
    wrapper = createButton()
    wrapper.setData({
      buttonText: 'Press me!'
    })
    expect(wrapper.find('.dp-button').text()).toBe('Press me!')
  })

  it('when button is set as small button then small class should exist', () => {
    wrapper = createButton()
    wrapper.setData({
      buttonSize: 'dp-button--sm'
    })
    expect(wrapper.find('.dp-button').classes()).toContain('dp-button--sm')
  })

  it('when button is set as ghost button then ghost class should exist', () => {
    wrapper = createButton()
    wrapper.setData({
      buttonType: 'dp-button--ghost-secondary'
    })
    expect(wrapper.find('.dp-button').classes()).toContain('dp-button--ghost-secondary')
  })

  it('when button is set as home button then home class should exist', () => {
    wrapper = createButton()
    wrapper.setData({
      buttonType: 'dp-button--home-primary'
    })
    expect(wrapper.find('.dp-button').classes()).toContain('dp-button--home-primary')
  })

  it('when button is set as block button then block class should exist', () => {
    wrapper = createButton()
    wrapper.setData({
      isBlock: true
    })
    expect(wrapper.find('.dp-button').classes()).toContain('dp-button--block')
  })

  it('when A button is set disabled then button should contain disabled class,but not disabled attribute', () => {
    wrapper = createButton()
    wrapper.setData({
      isDisabled: true,
      hrefValue: 'http://'
    })
    expect(wrapper.find('.dp-button').classes()).toContain('disabled')
    expect(wrapper.find('.dp-button').attributes().disabled).toBe(undefined)
  })

  it('when button is set disabled then button should contain disabled class and disabled attribute', () => {
    wrapper = createButton()
    wrapper.setData({
      isDisabled: true
    })
    expect(wrapper.find('.dp-button').classes()).toContain('disabled')
    expect(wrapper.find('.dp-button').attributes().disabled).toBe('disabled')
  })

  it.each`
    pill     | expected
    ${null}  | ${['dp-button']}
    ${false} | ${['dp-button']}
    ${true}  | ${['dp-button', 'dp-border-pill']}`(
  'classes should be $expected when pill is $pill', ({expected, pill}) => {
    wrapper = createButton()
    wrapper.setData({
      pill
    })
    expect(wrapper.find('.dp-button').classes()).toEqual(expected)
  })
})

describe('elements/Button function', () => {
  let wrapper
  let sanbox

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  function createWrapper(option) {
    return shallowMount(ComButton, option)
  }

  it('when click button , emit a click event', () => {
    wrapper = createWrapper()
    wrapper.find('.dp-button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('when click button , and isDisabled is true, should not emit click event', () => {
    wrapper = createWrapper({
      propsData: {
        isDisabled: true
      }
    })
    wrapper.find('.dp-button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('when onClick was run ,and event is false , should not emit click event', () => {
    wrapper = createWrapper()
    wrapper.vm.onClick(false)
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('when called onclick function, and event is null, should called event.preventDefault', () => {
    let preventdefaultStub = sanbox.stub()
    wrapper = createWrapper({
      propsData: {
        isDisabled: true
      }
    })
    let event = { preventDefault: preventdefaultStub }
    expect(preventdefaultStub.called).toBe(false)
    wrapper.vm.onClick(event)
    expect(preventdefaultStub.calledOnce).toBe(true)
  })
})
