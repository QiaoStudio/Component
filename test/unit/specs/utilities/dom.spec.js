import DOM from 'utilities/dom/index.js'
import {stub} from 'sinon'

describe('utilities/dom/index.js', () => {
  it('when parameter is a real Element isElement should return true', () => {
    expect(DOM.isElement(document.createElement('div'))).toBe(true)
  })
  it('when parameter is not a real Element isElement should return false', () => {
    expect(DOM.isElement('div')).toBe(false)
  })
  it('when parameter is a real element with height reflow should return 300', () => {
    let Element = document.createElement('div')
    Object.defineProperty(Element, 'offsetHeight', {
      get() {
        return 300
      }
    })
    expect(DOM.reflow(Element)).toBe(300)
  })
  it('when parameter is a fake element with height reflow should return false', () => {
    expect(DOM.reflow('div')).toBe(false)
  })
  describe('onWindowLoad()', () => {
    let onLoadSpy
    let addEventStub
    afterEach(() => {
      addEventStub.restore()
    })
    beforeEach(() => {
      onLoadSpy = jest.fn()
      addEventStub = stub(window, 'addEventListener')
    })

    function mockReadyState(state, action) {
      const oldReadyState = document.readyState
      Object.defineProperty(document, 'readyState', {value: state, writable: true})

      action()

      document.readyState = oldReadyState
    }

    it('addEventListener should be called', () => {
      mockReadyState('loading', () => {
        DOM.onWindowLoad(onLoadSpy)
        expect(addEventStub.args).toEqual([['load', onLoadSpy]])
      })
    })

    it.each(['complete', 'interactive'])(
      'onloadFn() should be call when readyState = %s', (state) => {
        mockReadyState(state, () => {
          DOM.onWindowLoad(onLoadSpy)

          // assert
          expect(addEventStub.called).toBeFalsy()
          expect(onLoadSpy).toHaveBeenCalled()
        })
      })
  })
})
