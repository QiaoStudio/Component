import {
  shallowMount,
  createLocalVue
} from 'dp-test'
import sinon from 'sinon'
import Screen from 'utilities/screen'
import Vue from 'vue'

Vue.use(Screen)

describe('utilities/screen/screen.js', () => {
  let sanbox
  let wrapper
  let xwindow
  const emptyComponent = {
    name: 'empty-component'
  }

  beforeEach(() => {
    xwindow = Object.assign({}, window)
    sanbox = sinon.createSandbox()
    Object.defineProperty(xwindow, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: false
        }
      }),
      configurable: true
    })
    wrapper = shallowMount(emptyComponent)
  })

  afterEach(() => {
    sanbox.restore()
  })

  it('When user use mobile devices, $screen.mobile() should return true', () => {
    sanbox.stub(xwindow, 'matchMedia').withArgs('(max-width: 767px)').returns({
      matches: true
    })
    expect(wrapper.vm.$screen.mobile()).toBe(true)
  })

  it('When user use mobile tablet, $screen.tablet() should return true', () => {
    sanbox.stub(xwindow, 'matchMedia').withArgs('(min-width: 768px) and (max-width: 992px)').returns({
      matches: true
    })
    expect(wrapper.vm.$screen.tablet()).toBe(true)
  })

  it('When user use mobile desktop, $screen.desktop() should return true', () => {
    sanbox.stub(xwindow, 'matchMedia').withArgs('(min-width: 993px)').returns({
      matches: true
    })
    expect(wrapper.vm.$screen.desktop()).toBe(true)
  })

  it('When user use mobile smallScreen, $screen.smallScreen() should return true', () => {
    sanbox.stub(xwindow, 'matchMedia').withArgs('(max-width: 1024px)').returns({
      matches: true
    })
    expect(wrapper.vm.$screen.smallScreen()).toBe(true)
  })

  it('When $screen.size() has been called, should return current device width', () => {
    expect(wrapper.vm.$screen.size()).toBe(1024)
  })

  it('When resize , add vue.prototype.screen.resize', () => {
    let localVue = createLocalVue()
    localVue.use(screen)
    expect(localVue.prototype.$screen.resize).toBe(1)
    xwindow.dispatchEvent(new Event('resize'))
    expect(localVue.prototype.$screen.resize).toBe(2)
  })
})
