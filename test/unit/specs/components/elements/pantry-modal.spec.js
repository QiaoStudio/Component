import { shallowMount } from 'dp-test'
import sinon from 'sinon'
import ComModal from 'components/elements/modal/modal.vue'

describe('components/elements/modal/modal.vue', () => {
  let wrapper
  let sanbox
  function createWrapper(options) {
    return shallowMount(ComModal, options)
  }
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = shallowMount(ComModal, {
      propsData: {
        enableClose: true
      },
      slots: {
        'footer': '<div class="modal-footer">test modal-footer</div>'
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
    location.hash = ''
  })
  it('when enableClose is false, and openPopup is true, close modal through openPopup prop', () => {
    wrapper = createWrapper({
      propsData: {
        'enableClose': false,
        'openPopup': true
      }
    })
    wrapper.vm.$nextTick(() => {
      wrapper.vm.innerClose()
      expect(document.querySelector('body>.dp-modal')).toBeFalsy()
    })
  })
  it('when slot title exists, show the title content', () => {
    wrapper = createWrapper({
      slots: {
        'title': '<div class="modal-title">test title</div>'
      }
    })
    expect(wrapper.find('.modal-title').text()).toBe('test title')
  })
  it('when slot in .modal-body exists , show the slot in modal-body', () => {
    wrapper = createWrapper({
      slots: {
        default: '<div class="modal-body">test modal-body</div>'
      }
    })
    expect(wrapper.find('.modal-body').text()).toBe('test modal-body')
  })
  it('when slot footer exists , show the footer slot', () => {
    wrapper = createWrapper({
      slots: {
        'footer': '<div class="modal-footer">test modal-footer</div>'
      }
    })
    expect(wrapper.find('.modal-footer').text()).toBe('test modal-footer')
  })
  it('when slot footer not exists , show the footer slot', () => {
    wrapper = shallowMount(ComModal)
    expect(wrapper.find('.dp-modal__footer').isVisible()).toBeFalsy()
  })
  it('when slot modal-close-bottom exists, show the slot modal-close-bottom', () => {
    wrapper = createWrapper({
      slots: {
        'modal-close-bottom': '<div class="modal-close-bottom">test modal-close-bottom</div>'
      }
    })
    expect(wrapper.find('.modal-close-bottom').text()).toBe('test modal-close-bottom')
  })
  it('when click the modal , emit a update:openPopup event', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp-modal__wrap').trigger('click')
      expect(wrapper.emitted()['update:openPopup'][1][0]).toBe(false)
    })
  })
  it('when press esc hide popup, emit a update:openPopup event', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp-modal__wrap').trigger('keyup.esc')
      expect(wrapper.emitted()['update:openPopup'][1][0]).toBeFalsy()
    })
  })
  it('when close the modal , emit a before-close event', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp-modal__wrap').trigger('keyup.esc')
      expect(wrapper.emitted('before-close')).toBeTruthy()
    })
  })
  it('when close the modal , emit a after-close event', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp-modal__wrap').trigger('keyup.esc')
      expect(wrapper.emitted('after-close')).toBeTruthy()
    })
  })
  it('after close the modal , isVisible should be false', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.find('.dp-modal__wrap').trigger('keyup.esc')
    expect(wrapper.vm.isVisible).toBe(false)
  })
  it('when call close , emit events by order', () => {
    wrapper.vm.isVisible = true
    wrapper.vm.close()
    expect(wrapper.emittedByOrder().map(e => e.name)).toEqual(['before-close', 'update:openPopup', 'after-close'])
  })
  it('when open the modal , emit events by order', () => {
    wrapper.setProps({ 'openPopup': true })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emittedByOrder().map(e => e.name)).toEqual(['before-open', 'update:openPopup', 'after-shown'])
    })
  })
  it('after open the modal , isVisible should be true', () => {
    wrapper.setProps({
      openPopup: true
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isVisible).toBe(true)
    })
  })
  it('when open modal ,it should be appended DOM to body', () => {
    wrapper.setProps({ 'openPopup': true })
    expect(document.querySelector('body>.dp-modal')).toBeTruthy()
  })
  it('when click close, remove the DOM from body', () => {
    wrapper.setProps({ 'openPopup': true })
    wrapper.vm.$nextTick(() => {
      wrapper.find('.dp-modal__close').trigger('click')
      expect(document.querySelector('body>.dp-modal')).toBeFalsy()
    })
  })
  it('modal should contain dp-modal--vertical-align-helper and dp-modal--vertical-align-center when isVertically true', () => {
    wrapper = createWrapper({
      propsData: {
        isVetically: true,
        openPopup: true
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal--vertical-align-helper').exists()).toBeTruthy()
      expect(wrapper.find('.dp-modal--vertical-align-center').exists()).toBeTruthy()
    })
  })
  it('modal should contain dp-modal--vertical-align-helper and dp-modal--vertical-align-center when windowedModal true', () => {
    wrapper = createWrapper({
      computed: {
        isUseWindowedModal: () => true
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal--vertical-align-helper').exists()).toBeTruthy()
      expect(wrapper.find('.dp-modal--vertical-align-center').exists()).toBeTruthy()
    })
  })
  it('modal should not contain dp__vertical-align-center when isVertically false', () => {
    wrapper = createWrapper({
      propsData: {
        isVetically: false
      }
    })
    expect(wrapper.find('.dp__vertical-align-center').exists()).not.toBeTruthy()
  })
  it('when modal open , location.hash should contain modal-uid', () => {
    wrapper = createWrapper({
      created() {
        this.modalUid = '123'
      }
    })
    wrapper.setProps({ 'openPopup': true })
    expect(location.hash).toContain('&modal-uid=123')
  })
  it('when modal close , location.hash should not contain dp-modal-open and reset contentHeight and contentPadding', () => {
    wrapper.setProps({ 'openPopup': true })
    wrapper.setData({
      contentMaxHeight: '22px',
      wrapPadding: '22px',
      contentBodyMaxHeight: '22px',
      dialogHeight: 'auto'
    })
    wrapper.vm.$nextTick(() => {
      wrapper.setProps({ 'openPopup': false })
      expect(location.hash).not.toContain('dp-modal-open')
      expect(wrapper.vm.contentMaxHeight).toBe('')
      expect(wrapper.vm.wrapPadding).toBe('')
      expect(wrapper.vm.contentBodyStyle).toEqual({})
      expect(wrapper.vm.dialogHeight).toBe('auto')
    })
  })
  it('when location.hash not contain modal id, modal should be closed', () => {
    location.hash = '&modal-uid=123'
    wrapper = createWrapper({
      propsData: {
        enableClose: true
      },
      created() {
        this.modalUid = '123'
      }
    })
    expect(document.querySelector('body>.dp-modal')).toBeTruthy()
    location.hash = ''
    wrapper.vm.$nextTick(() => {
      wrapper.vm.hashChangeHandler()
      expect(document.querySelector('body>.dp-modal')).toBeFalsy()
    })
  })
  it('when location.hash contain modal id, modal should not be closed', () => {
    location.hash = ''
    wrapper = createWrapper({
      propsData: {
        enableClose: true
      }
    })
    expect(document.querySelector('body>.dp-modal')).toBeFalsy()
    wrapper.vm.$nextTick(() => {
      location.hash = '&modal-uid=123'
      wrapper.vm.modalUid = '123'
      wrapper.vm.hashChangeHandler()
      expect(document.querySelector('body>.dp-modal')).toBeTruthy()
    })
  })
  it('when useHash is false , modal should not be closed by hashChangeHandler', () => {
    location.hash = '&modal-uid=123'
    wrapper = createWrapper({
      useHash: false,
      enableClose: true,
      created() {
        this.modalUid = '123'
      }
    })
    wrapper.vm.hashChangeHandler()
    expect(wrapper.isVisible()).toBe(false)
  })
  it('after component was mounted and useHash is true, bindHashChange should be called', () => {
    let bindHashChange = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        bindHashChange: bindHashChange
      }
    })
    expect(bindHashChange.called).toBe(true)
  })
  it('before component was destroy , removeBinding should be called', () => {
    let removeBinding = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        removeBinding: removeBinding
      }
    })
    wrapper.destroy()
    expect(removeBinding.called).toBe(true)
  })
  it('when isUseWindowedModal is true, footer should not contail class dp-modal__footer-sticky', () => {
    wrapper = createWrapper({
      computed: {
        isUseWindowedModal: () => true
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__footer-sticky').exists()).toBe(false)
    })
  })
  it('when windowedModal is true, and in mobile expect modal to contain dp-modal--windowed', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: true
      },
      computed: {
        isMobile: () => true
      }
    })
    expect(wrapper.find('.dp-modal.dp-modal--windowed').exists()).toBe(true)
  })

  it('when windowedModal is true, and not in mobile expect modal not to contain dp-modal--limit-max-size', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: true
      },
      computed: {
        isMobile: () => false
      }
    })
    expect(wrapper.find('.dp-modal.dp-modal--limit-max-size').exists()).toBe(false)
  })

  it('when windowedModal is false, and isVertically is false, and in mobile expect modal not to contain dp__vertical-align-center', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: false,
        isVertically: false
      },
      computed: {
        isMobile: () => true
      }
    })
    expect(wrapper.find('.dp__vertical-align-center').exists()).toBe(false)
  })

  it('when open, expect setContentMaxHeight and setContentSize should be called', () => {
    let setContentSizeStub = sanbox.stub()
    let setDialogSizeStub = sanbox.stub()
    wrapper = createWrapper({
      methods: {
        setContentSize: setContentSizeStub,
        setDialogSize: setDialogSizeStub
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(setContentSizeStub.called).toBeTruthy()
      expect(setDialogSizeStub.called).toBeTruthy()
    })
  })

  it('setContentSize method should update contentBodyStyle for full screen mode', () => {
    const wrapper = createWrapper({ propsData: { isFullScreen: true } })
    const windowHeight = 200
    const headerHeight = 50
    const footerHeight = 30
    const bodyHeight = windowHeight - headerHeight - footerHeight
    const expectedStyle = { minHeight: `${bodyHeight}px` }

    Reflect.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => windowHeight
    })
    const {vm} = wrapper
    vm.$refs = {
      modalHeader: { clientHeight: headerHeight },
      modalFooter: { clientHeight: footerHeight }
    }
    vm.setContentSize()

    expect(vm.contentBodyStyle).toEqual(expectedStyle)
    Reflect.deleteProperty(document.documentElement, 'clientHeight')
  })
  it('when documentElement.clientHeight is not undefined and isUseFlexMobile is true, setContentMaxHeight should return right value ', () => {
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => 500
    })
    wrapper = createWrapper({
      propsData: {
        windowedModal: true,
        isContentScroll: true,
        openPopup: true
      },
      computed: {
        isMobile: () => true
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.contentMaxHeight).toBe(416)
      expect(wrapper.vm.clientHeight).toBe(500)
    })
  })
  it('when isUseWindowedModal is true, , and isLarger is false, should set right value after setDialog size is called', () => {
    wrapper = createWrapper({
      propsData: {
        isContentScroll: true
      },
      computed: {
        isUseWindowedModal: () => true
      }
    })
    wrapper.vm.open()
    Object.defineProperty(document.querySelector('.dp-modal__content'), 'clientHeight', {
      configurable: true,
      get: () => 500
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => 500
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.wrapPadding).toEqual({'padding-top': '64px', 'padding-bottom': '20px'})
      expect(wrapper.vm.dialogHeight).toBe('100%')
      wrapper.setProps({
        isContentScroll: false
      })
      wrapper.vm.setDialogSize()
      expect(wrapper.vm.wrapPadding).toEqual({'padding-top': '64px', 'padding-bottom': '20px'})
      expect(wrapper.vm.dialogHeight).toBe('auto')
    })
  })
  it('when isUseWindowedModal is true, and isLarger is true, should set right value after setDialog size is called', () => {
    wrapper = createWrapper({
      propsData: {
        isContentScroll: true
      },
      computed: {
        isUseWindowedModal: () => true
      }
    })
    wrapper.vm.open()
    Object.defineProperty(document.querySelector('.dp-modal__content'), 'clientHeight', {
      configurable: true,
      get: () => 200
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => 500
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.wrapPadding).toEqual({})
      expect(wrapper.vm.dialogHeight).toBe('auto')
      wrapper.setProps({
        isContentScroll: false
      })
      wrapper.vm.setDialogSize()
      expect(wrapper.vm.wrapPadding).toEqual({})
      expect(wrapper.vm.dialogHeight).toBe('auto')
    })
  })
  it('when isUseWindowedModal is false , setContentSize and setDialogSize should not change some value', () => {
    wrapper = createWrapper({
      data() {
        return {
          contentMaxHeight: '',
          contentBodyMaxHeight: '',
          wrapPadding: '',
          dialogHeight: ''
        }
      },
      computed: {
        isUseWindowedModal: () => false
      }
    })
    wrapper.vm.setContentSize()
    expect(wrapper.vm.contentMaxHeight).toBe('')
    expect(wrapper.vm.contentBodyMaxHeight).toBe('')
    expect(wrapper.vm.wrapPadding).toBe('')
    expect(wrapper.vm.dialogHeight).toBe('')
    wrapper.vm.setDialogSize()
    expect(wrapper.vm.contentMaxHeight).toBe('')
    expect(wrapper.vm.contentBodyMaxHeight).toBe('')
    expect(wrapper.vm.wrapPadding).toBe('')
    expect(wrapper.vm.dialogHeight).toBe('')
  })
  it(' when openDirection is bottom, modal should slide-up from bottom', () => {
    wrapper.setProps({ 'openPopup': true, 'openDirection': 'bottom' })
    expect(wrapper.find('.dp-modal--bottom').isVisible()).toBe(true)
  })
  it(' when openDirection is right, modal should slide-in from right', () => {
    wrapper.setProps({ 'openPopup': true, 'openDirection': 'right' })
    expect(wrapper.find('.dp-modal--right').isVisible()).toBe(true)
  })
  it(' when openDirection is left, modal should slide-in from left', () => {
    wrapper.setProps({ 'openPopup': true, 'openDirection': 'left' })
    expect(wrapper.find('.dp-modal--left').isVisible()).toBe(true)
  })
  it('when windowedModal is true and on mobile,use the outer close', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: true,
        enableClose: true
      },
      computed: {
        isMobile: () => true
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__close--outer').exists()).toBe(true)
      expect(wrapper.find('.dp-modal__close--inward').exists()).toBe(false)
    })
  })
  it('when windowedModal is true and not on mobile,use the outer close', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: true,
        enableClose: true
      },
      computed: {
        isMobile: () => false
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__close--outer').exists()).toBe(true)
      expect(wrapper.find('.dp-modal__close--inward').exists()).toBe(false)
    })
  })
  it('when windowedModal is false and not on mobile,use the inward close', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: false,
        enableClose: true
      },
      computed: {
        isMobile: () => true
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__close--outer').exists()).toBe(false)
      expect(wrapper.find('.dp-modal__close--inward').exists()).toBe(true)
    })
  })
  it('when windowedModal is false and not on mobile,use the outer close', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: false,
        enableClose: true
      },
      computed: {
        isMobile: () => false
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__close--outer').exists()).toBe(true)
      expect(wrapper.find('.dp-modal__close--inward').exists()).toBe(false)
    })
  })
  it('when enableClose is false,close button is not existed', () => {
    wrapper = createWrapper({
      propsData: {
        windowedModal: false,
        enableClose: false
      },
      computed: {
        isMobile: () => false
      }
    })
    wrapper.vm.open()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.dp-modal__close').exists()).toBe(false)
    })
  })
})
describe('components/elements/modal/modal.vue use uid', () => {
  let wrapper
  let sanbox
  function createWrapper(options) {
    return shallowMount(ComModal, options)
  }
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = shallowMount(ComModal, {
      propsData: {
        enableClose: true
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
    location.hash = ''
  })
  it('The window has the unique uid', () => {
    wrapper = createWrapper({
      data() {
        return {
          modalUid: ''
        }
      }
    })
    wrapper.setProps({ 'openPopup': true })
    expect(wrapper.find('.dp-modal').isVisible()).toBe(true)
    expect(wrapper.vm.modalUid).not.toBe('')
  })
  it('when open the popup,the location.hash should be added the corresponding card ID', () => {
    wrapper = createWrapper({
      created() {
        this.modalUid = '123'
      }
    })
    wrapper.setProps({ 'openPopup': true })
    expect(location.hash).toContain('modal-uid=123')
  })
  it('when close the popup,the location.hash should be removed the corresponding card ID', () => {
    wrapper = createWrapper({
      created() {
        this.modalUid = '123'
      }
    })
    wrapper.setProps({ 'openPopup': true })
    expect(location.hash).toContain('modal-uid=123')
    wrapper.vm.close('123')
    expect(location.hash).toContain('')
  })
  it('remove modal id from location.hash', () => {
    location.hash = '&modal-uid=123'
    wrapper.vm.removeIdFromHash('123')
    expect(location.hash).toBe('')
  })
  it('remove modal id from location.hash,when there are the same id', () => {
    location.hash = '&modal-uid=123&modal-uid=123'
    wrapper.vm.removeIdFromHash('123')
    expect(location.hash).toBe('')
  })
  it('remove modal id from location.hash,when there are the same id', () => {
    location.hash = ''
    wrapper.vm.removeIdFromHash('123')
    expect(location.hash).toBe('')
  })
  it('add modal id on location.hash', () => {
    location.hash = ''
    wrapper.vm.addIdFromHash('123')
    expect(location.hash).toBe('#&modal-uid=123')
  })
  it('add modal id on location.hash,when the id is exist', () => {
    location.hash = '&modal-uid=123'
    wrapper.vm.addIdFromHash('123')
    expect(location.hash).toBe('#&modal-uid=123')
  })
  it('get id form location.hash', () => {
    location.hash = ''
    expect(wrapper.vm.getIdsFromHash()).toEqual([])
    location.hash = '&modal-uid=123'
    expect(wrapper.vm.getIdsFromHash()).toEqual(['123'])
    location.hash = '&modal-uid=122'
    expect(wrapper.vm.getIdsFromHash()).not.toEqual(['123'])
    location.hash = '&modal-uid=123&modal-uid=123'
    expect(wrapper.vm.getIdsFromHash()).toEqual(['123', '123'])
    location.hash = '&modal-uid=123&modal-uid=122'
    expect(wrapper.vm.getIdsFromHash()).toEqual(['123', '122'])
  })
  it('does the id is exist?', () => {
    location.hash = '&modal-uid=123'
    expect(wrapper.vm.uidExistInHash('123')).toBe(true)
    expect(wrapper.vm.uidExistInHash('12')).toBe(false)
    location.hash = ''
    expect(wrapper.vm.uidExistInHash('123')).toBe(false)
  })
  it('when modal prop isFullScreen is true, it should contains class dp-modal--full-screen', () => {
    const wrapper = createWrapper({ propsData: { isFullScreen: true } })

    expect(wrapper.contains('.dp-modal--full-screen')).toBeTruthy()
  })
})
