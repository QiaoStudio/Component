import { attachEvent } from 'utilities/event-helper'
import sinon from 'sinon'

describe('utilities/event-helper/index.js', () => {
  let sanbox
  let removeEventListenerStub
  let addEventListenerStub
  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  afterEach(() => {
    sanbox.restore()
  })

  it('removeEventListener shold be called', () => {
    removeEventListenerStub = sanbox.stub(EventTarget.prototype, 'removeEventListener')
    let ele = document.createElement('div')
    let testHandler = () => {}
    attachEvent(ele, 'click', testHandler)
    expect(removeEventListenerStub.called).toBeTruthy()
  })

  it('detachEvent shold be called', () => {
    let _removeEventListener = EventTarget.prototype.removeEventListener
    let _detachEvent = EventTarget.prototype.detachEvent

    EventTarget.prototype.removeEventListener = null
    EventTarget.prototype.detachEvent = () => {}
    let detachEventStub = sanbox.stub(EventTarget.prototype, 'detachEvent')
    let ele = document.createElement('div')
    let testHandler = () => {}
    attachEvent(ele, 'click', testHandler)
    expect(detachEventStub.called).toBeTruthy()

    EventTarget.prototype.removeEventListener = _removeEventListener
    EventTarget.prototype.detachEvent = _detachEvent
  })

  it('addEventListener shold be called', () => {
    addEventListenerStub = sanbox.stub(EventTarget.prototype, 'addEventListener')
    let ele = document.createElement('div')
    let testHandler = () => {}
    attachEvent(ele, 'click', testHandler)
    expect(addEventListenerStub.called).toBeTruthy()
  })

  it('attachEvent shold be called', () => {
    let _addEventListener = EventTarget.prototype.addEventListener
    let _attachEvent = EventTarget.prototype.attachEvent

    EventTarget.prototype.addEventListener = null
    EventTarget.prototype.attachEvent = () => {}
    let attachEventStub = sanbox.stub(EventTarget.prototype, 'attachEvent')
    let ele = document.createElement('div')
    let testHandler = () => {}
    attachEvent(ele, 'click', testHandler)
    expect(attachEventStub.called).toBeTruthy()

    EventTarget.prototype.addEventListener = _addEventListener
    EventTarget.prototype.attachEvent = _attachEvent
  })

  it('attachEvent should return false', () => {
    let _addEventListener = EventTarget.prototype.addEventListener
    let _attachEvent = EventTarget.prototype.attachEvent

    EventTarget.prototype.addEventListener = null
    EventTarget.prototype.attachEvent = null

    let ele = document.createElement('div')
    let testHandler = () => {}

    expect(attachEvent(ele, 'click', testHandler)).toBeFalsy()

    EventTarget.prototype.addEventListener = _addEventListener
    EventTarget.prototype.attachEvent = _attachEvent
  })
})
