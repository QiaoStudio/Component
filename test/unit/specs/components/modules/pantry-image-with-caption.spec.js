import { mount } from 'dp-test'
import sinon from 'sinon'
import ComImageWithCaption from 'modules/image-with-caption'
describe('modules/image-with-caption', () => {
  let wrapper, sanbox, listeners, find, img, imgContainer
  let orgWidth, orgHeight

  function generateWrapper(options) {
    return mount(ComImageWithCaption, {
      methods: {
        find
      },
      ...options
    })
  }

  function addEventListener(name, func) {
    listeners[name] = func
  }

  function given(object, prop) {
    for (let key in prop) {
      if (!object[key] || typeof prop[key] !== 'function') {
        object[key] = prop[key]
      } else {
        sanbox.stub(object, key).callsFake(prop[key])
      }
    }
  }

  function and(object, prop) {
    given(object, prop)
  }

  beforeEach(() => {
    listeners = {}
    img = {}
    imgContainer = {}
    sanbox = sinon.createSandbox()
    find = sanbox.stub()
    given(img, { addEventListener })
    and(imgContainer)
    and(window, { addEventListener })
    and(document, { addEventListener })
    find.withArgs('.dp-image-with-caption__image_holder__image img').returns(img)
    find.withArgs('.dp-image-with-caption__image_holder__image').returns(imgContainer)
    orgWidth = window.innerWidth
    orgHeight = window.innerHeight
    wrapper = generateWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
    window.innerWidth = orgWidth
    window.innerHeight = orgHeight
  })

  it('should display full width image when set width property is empty', () => {
    expect(wrapper.find('.dp-image-with-caption__image_holder').attributes().style).toBe('width: 100%;')
  })

  it('should render image size exactly as prop sizeImage', () => {
    let propsData = {
      sizeImage: '40'
    }
    wrapper = generateWrapper({
      propsData
    })
    expect(wrapper.find('.dp-image-with-caption__image_holder').attributes().style).toBe('width: 40%;')
  })

  it('should call zoom when clicking on collapsed image', () => {
    let zoom = sanbox.stub()
    given(wrapper.vm, { zoom, expanded: false })

    wrapper.find('.dp-image-with-caption__image_holder__image').trigger('click')
    expect(zoom.called).toBeTruthy()
  })

  it('should call unzoom when clicking on expanded image', () => {
    let unzoom = sanbox.stub()
    given(wrapper.vm, { unzoom, expanded: true })

    wrapper.find('.dp-image-with-caption__image_holder__image').trigger('click')
    expect(unzoom.called).toBeTruthy()
  })

  it('should scale by natural width when the image is smaller than the window in both dimenson', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(img, { naturalWidth: 1000, width: 800, height: 300 })
    expect(wrapper.vm.scale).toBe(1.25)
  })

  it('should scale by window width when the natural width is bigger than the window width', () => {
    given(window, { innerWidth: 1200, innerHeight: 700 })
    and(img, { naturalWidth: 1400, width: 800, height: 300 })
    expect(wrapper.vm.scale).toBe(1.5)
  })

  it('should scale by window height when the natural height is bigger than the window height', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(img, { naturalWidth: 1000, width: 700, height: 500 })
    expect(wrapper.vm.scale).toBe(1.4)
  })

  it('should not zoom when scale is 1', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(img, { naturalWidth: 700, width: 700, height: 500 })
    wrapper.vm.zoom()
    expect(imgContainer.attributes).toBeUndefined()
    expect(wrapper.vm.expanded).toBeFalsy()
    expect(document.body.classList).not.toContain('zooming')
  })

  it('should zoom when scale is larger than 1', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(imgContainer, {
      getBoundingClientRect: () => ({ height: 300, width: 700, y: 200, x: 300 })
    })
    and(img, { naturalWidth: 1000, width: 700, height: 500 })
    wrapper.vm.zoom()
    expect(wrapper.vm.imageContainerStyle).toEqual({ 'transform': `scale(1.4) translateY(0px) translateX(0px)` })
    expect(wrapper.vm.expanded).toBeTruthy()
    expect(document.body.classList).toContain('zooming')
  })

  it('should clear the scale when unzoom the image', () => {
    given(imgContainer, { style: { transform: 'scale(1.4) translateY(0px)' } })
    wrapper.vm.unzoom()
    expect(wrapper.vm.imageContainerStyle).toEqual({})
    expect(wrapper.vm.expanded).toBeFalsy()
    expect(document.body.classList).not.toContain('zooming')
  })

  it('should not show the expand icon when scale is 1', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(img, { naturalWidth: 700, width: 700, height: 500 })
    expect(wrapper.vm.loaded).toBeFalsy()
    expect(wrapper.find('.dp-image-with-caption__image_holder__image__icon').exists()).toBeFalsy()
    listeners.load()
    expect(wrapper.vm.loaded).toBeTruthy()
    expect(wrapper.find('.dp-image-with-caption__image_holder__image__icon').exists()).toBeFalsy()
  })

  it('should show the expand icon when image is loaded and scale is greater than 1', () => {
    given(window, { innerWidth: 1300, innerHeight: 700 })
    and(img, { naturalWidth: 1000, width: 700, height: 500 })
    listeners.load()
    expect(wrapper.vm.loaded).toBeTruthy()
    expect(wrapper.find('.dp-image-with-caption__image_holder__image__icon').exists()).toBeTruthy()
  })

  it('should unzoom when document is scrolling', () => {
    given(imgContainer, { style: { transform: 'scale(1.4) translateY(0px) translateX(0px)' } })
    and(wrapper.vm, { expanded: true })
    listeners.scroll()
    expect(wrapper.vm.imageContainerStyle).toEqual({})
    expect(wrapper.vm.expanded).toBeFalsy()
  })
})
