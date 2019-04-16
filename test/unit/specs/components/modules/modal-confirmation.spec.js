import { mount } from 'dp-test'
import ModalConfirm from 'modules/modal-confirmation/modal-confirmation.vue'
import ComButton from 'elements/button/button.vue'
import DpComModal from 'elements/modal/index.js'
import sinon from 'sinon'
import _ from 'lodash'

describe('modules/modal-confirmation/modal-confirmation.vue', () => {
  let wrapper
  let sanbox

  function createWrapper(options) {
    let shallowOption = _.merge({
      propsData: {
        isOpen: false
      },
      stubs: {
        'dp-button': ComButton
      }
    }, options || {})
    return mount(ModalConfirm, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('should render props: title, content, okText, cancelText correctly', () => {
    const props = {
      icon: 'info',
      title: 'Confirmation title',
      content: 'Confirm content',
      okText: 'Yes',
      cancelText: 'No'
    }
    wrapper = createWrapper({
      propsData: {
        ...props
      }
    })
    wrapper.setProps({ isOpen: true })
    const {vm} = wrapper
    expect(wrapper.find('.dp-modal__title').text()).toBe(props.title)
    expect(wrapper.find('.dp-modal__body').text()).toBe(props.content)
    expect(wrapper.find('.dp-button:first-child').text()).toBe(props.cancelText)
    expect(wrapper.find('.dp-button:nth-child(2)').text()).toBe(props.okText)
    expect(vm.iconClass).toBe('fa fa-info-circle')
    expect(vm.showTitle).toBeTruthy()
    expect(vm.showCancelButton).toBeTruthy()
  })

  it('should hide some controls which their\'s contents are empty', async () => {
    const props = {
      title: '',
      cancelText: '',
      content: 'Confirm content',
      okText: 'Yes'
    }
    wrapper = createWrapper({
      propsData: {
        ...props
      }
    })
    wrapper.setProps({ isOpen: true })
    const {vm} = wrapper
    expect(vm.iconClass).toBe('fa fa-warning')
    expect(vm.showTitle).toBeFalsy()
    expect(vm.showCancelButton).toBeFalsy()
  })

  it('when click close button ,emmit value , and close modal-confirm', () => {
    wrapper.setProps({ isOpen: true })
    expect(wrapper.find(DpComModal).props().openPopup).toBe(true)
    wrapper.find('.dp-button--ghost-secondary').trigger('click')
    expect(wrapper.find(DpComModal).props().openPopup).toBe(false)
    expect(wrapper.emitted('modal-confirmation-close')).toBeTruthy()
  })

  it('when click confirm button ,emmit value , and close modal-confirm', () => {
    wrapper.setProps({ isOpen: true })
    wrapper.find('.dp-button--primary').trigger('click')
    expect(wrapper.find(DpComModal).props().openPopup).toBe(false)
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})

