import Directive, {
  utils
} from 'src/directives/lazy-load-image'
import {
  shallowMount,
  createLocalVue
} from 'dp-test'
import sinon from 'sinon'
import 'intersection-observer'
import blankImage from 'src/assets/images/invis.png'

describe('directives/lazy-load-image', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('lazyHandler should NO be called when v-lazy-image="false"', () => {
    const mockHandler = sandbox.stub(utils, 'lazyHandler')
    const localVue = createLocalVue()
    localVue.directive('lazy-image', Directive)
    const mockComponent = {
      name: 'mock-component',
      template: '<img v-lazy-image="false" src="img1.png"/>'
    }
    shallowMount(mockComponent, {
      localVue
    })
    expect(mockHandler.called).toBe(false)
  })

  it('resetOriginalSrc should be called when image update', () => {
    const mockHandler = sandbox.stub(utils, 'lazyHandler')
    const mockReset = sandbox.stub(utils, 'resetOriginalSrc')
    const localVue = createLocalVue()
    localVue.directive('lazy-image', Directive)
    const mockComponent = {
      name: 'mock-component',
      template: '<img v-lazy-image="true" :src="src"/>',
      data() {
        return {
          src: 'img1.png'
        }
      }
    }
    let wrapper = shallowMount(mockComponent, {
      localVue
    })
    wrapper.setData({
      src: 'img2.png'
    })
    expect(mockHandler.calledOnce).toBe(true)
    expect(mockReset.calledOnce).toBe(true)
  })

  it('lazyHandler should be called once when element is image', () => {
    const mockHandler = sandbox.stub(utils, 'lazyHandler')
    const localVue = createLocalVue()
    localVue.directive('lazy-image', Directive)
    const mockComponent = {
      name: 'mock-component',
      template: '<img v-lazy-image src="img1.png"/>'
    }
    shallowMount(mockComponent, {
      localVue
    })
    expect(mockHandler.calledOnce).toBe(true)
  })

  it('lazyHandler should be called when element contains images', () => {
    const mockHandler = sandbox.stub(utils, 'lazyHandler')
    const localVue = createLocalVue()
    localVue.directive('lazy-image', Directive)
    const mockComponent = {
      name: 'mock-component',
      template: '<div v-lazy-image><img src="img1.png"/><img src="img2.png"/></div>'
    }
    shallowMount(mockComponent, {
      localVue
    })
    expect(mockHandler.calledTwice).toBe(true)
  })

  it('lazyHandler should NOT add "lazy-loading" class when element is not image', () => {
    const add = sandbox.stub()
    utils.lazyHandler({
      tagName: 'DIV',
      classList: {
        add
      }
    })
    expect(add.called).toBe(false)
  })

  it('lazyHandler should work correctly when not indicate width & height', () => {
    const el = document.createElement('img')
    el.src = 'mock-image.png'
    utils.lazyHandler(el)
    expect(el.classList.contains('lazy-loading')).toBe(true)
    expect(el.getAttribute('src')).toBe(blankImage)
    expect(el.getAttribute('width')).toBe('60')
    expect(el.getAttribute('height')).toBe('60')
    expect(el.tempWidth).toBe(60)
    expect(el.tempHeight).toBe(60)
  })

  it('lazyHandler should set height equals width correctly when only indicate width', () => {
    const el = document.createElement('img')
    el.src = 'mock-image.png'
    utils.lazyHandler(el, {
      width: 80
    })
    expect(el.getAttribute('src')).toBe(blankImage)
    expect(el.getAttribute('width')).toBe('80')
    expect(el.getAttribute('height')).toBe('80')
    expect(el.tempWidth).toBe(80)
    expect(el.tempHeight).toBe(80)
  })

  it('lazyHandler should set height equals width correctly when both indicate width & height', () => {
    const el = document.createElement('img')
    el.src = 'mock-image.png'
    utils.lazyHandler(el, {
      width: 80,
      height: 100
    })
    expect(el.getAttribute('src')).toBe(blankImage)
    expect(el.getAttribute('width')).toBe('80')
    expect(el.getAttribute('height')).toBe('100')
    expect(el.tempWidth).toBe(80)
    expect(el.tempHeight).toBe(100)
  })

  it('lazyHandler should NOT set height when target image exists height attribute already', () => {
    const el = document.createElement('img')
    el.src = 'mock-image.png'
    el.height = 90
    el.width = 70
    utils.lazyHandler(el, {
      width: 80,
      height: 100
    })
    expect(el.getAttribute('src')).toBe(blankImage)
    expect(el.getAttribute('width')).toBe('70')
    expect(el.tempWidth).toBe(undefined)

    expect(el.getAttribute('height')).toBe('90')
    expect(el.tempHeight).toBe(undefined)
  })

  it('restoreImage should change src when element is image', () => {
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: blankImage
    }
    utils.restoreImage(mockImg)
    expect(mockImg.src).toBe('img1.png')
  })

  it('restoreImage should remove "lazy-loading" class and when image loaded', () => {
    const remove = sandbox.stub()
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: blankImage,
      classList: {
        remove
      }
    }
    utils.restoreImage(mockImg)
    expect(mockImg.src).toBe('img1.png')
    expect(remove.called).toBe(false)
    expect(typeof mockImg.onload).toBe('function')
    mockImg.onload()
    expect(remove.calledOnceWith('lazy-loading')).toBe(true)
  })

  it('restoreImage should remove height when element has tempHeight', () => {
    const removeAttribute = sandbox.stub()
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: blankImage,
      tempHeight: 50,
      classList: {
        remove: sandbox.stub()
      },
      removeAttribute
    }
    utils.restoreImage(mockImg)
    mockImg.onload()
    expect(removeAttribute.calledOnceWith('height')).toBe(true)
  })

  it('restoreImage should remove width when element has tempWidth', () => {
    const removeAttribute = sandbox.stub()
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: blankImage,
      tempWidth: 50,
      classList: {
        remove: sandbox.stub()
      },
      removeAttribute
    }
    utils.restoreImage(mockImg)
    mockImg.onload()
    expect(removeAttribute.calledOnceWith('width')).toBe(true)
  })

  it('resetOriginalSrc should change originalSrc to new src when image src is not blank', () => {
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: 'img2.png'
    }
    utils.resetOriginalSrc(mockImg)
    expect(mockImg.originalSrc).toBe('img2.png')
    utils.restoreImage(mockImg)
    expect(mockImg.src).toBe('img2.png')
  })

  it('resetOriginalSrc should not change originalSrc to new src when image src is blank', () => {
    const mockImg = {
      tagName: 'IMG',
      originalSrc: 'img1.png',
      src: blankImage
    }
    utils.resetOriginalSrc(mockImg)
    expect(mockImg.originalSrc).toBe('img1.png')
    expect(mockImg.src).toBe(blankImage)
    utils.restoreImage(mockImg)
    expect(mockImg.src).toBe('img1.png')
  })
})
