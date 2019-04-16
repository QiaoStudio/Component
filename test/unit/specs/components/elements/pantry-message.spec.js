import sinon from 'sinon'
import {
  shallowMount
} from 'dp-test'
import ComMessage from 'components/elements/message/message.vue'
import ComButton from 'elements/button/button.vue'

describe('elements/Message', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComMessage, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when footer button is set, button should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        isShowButton: true
      }
    })
    expect(wrapper.find('.dp-message__button').isVisible()).toBeTruthy()
  })

  it('when footer button is not set, button should not be shown', () => {
    wrapper = createWrapper({
      propsData: {
        isShowButton: false
      }
    })
    expect(wrapper.find('.dp-message__button')).not.toContain('dp-message__button')
  })

  it('when class is dp-message--green, the message should use right color', () => {
    wrapper = createWrapper({
      propsData: {
        class: 'dp-message--green'
      }
    })
    expect(wrapper.classes()).toContain('dp-message--green')
    expect(wrapper.classes()).not.toContain('dp-message--yellow')
  })

  it('should trigger action when click the footer button', () => {
    let sandbox = sinon.createSandbox()
    let clickStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        isShowButton: true
      },
      listeners: {
        click: clickStub
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    wrapper.find('.dp-button').trigger('click')
    expect(clickStub.called).toBe(true)
  })
})
