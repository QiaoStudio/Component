import { shallowMount } from 'dp-test'
import ComSlider from 'elements/slider/src/slider.vue'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import sinon from 'sinon'
import _ from 'lodash'

describe('one slider(isRange is false)', () => {
  let wrapper
  let sandbox
  function createWrapper(params) {
    return shallowMount(ComSlider, _.merge({
      propsData: {
        value: 0,
        min: 0,
        max: 200
      },
      attachToDocument: true
    }, params || {}))
  }
  beforeEach(() => {
    sandbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    sandbox.restore()
    wrapper.destroy()
  })

  it('given disabled is true, disabledClass should be dp-slider--disabled', () => {
    expect(wrapper.vm.disabledClass).toBe('')
    wrapper.setProps({
      disabled: true
    })
    expect(wrapper.vm.disabledClass).toBe('dp-slider--disabled')
  })

  it('given value is Array, slider refer to Array, given value is Number, slider refer to One element', () => {
    wrapper.setProps({
      value: [0, 50]
    })
    expect(wrapper.vm.slider).toEqual([wrapper.vm.$refs.dot0, wrapper.vm.$refs.dot1])
    wrapper.setProps({
      value: 20
    })
    expect(wrapper.vm.slider).toEqual(wrapper.vm.$refs.dot)
  })

  it('props min is given, minimum should be calculated from min', () => {
    wrapper = createWrapper({
      propsData: {
        min: 20,
        value: 25
      }
    })
    expect(wrapper.vm.minimum).toBe(20)
  })

  it('given interval is integer, multiple should be 1', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4
      }
    })
    expect(wrapper.vm.multiple).toBe(1)
  })

  it('given interval is decimal, multiple should be numbers of decimals', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 1.25
      }
    })
    expect(wrapper.vm.multiple).toBe(100)
  })

  it('given interval, min and max, total number of intervals', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4
      }
    })
    expect(wrapper.vm.total).toBe(50)
  })

  it('given interval, min and max, total , multiple number of intervals', () => {
    let printErrorStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        interval: 4
      },
      data() {
        return {
          maximum: 50,
          minimum: 21,
          multiple: 2
        }
      },
      methods: {
        printError: printErrorStub
      }
    })
    expect(printErrorStub.called).toBe(false)
    expect(wrapper.vm.total).toBe(7.25)
    expect(printErrorStub.calledOnceWith('Prop[interval] is illegal, Please make sure that the interval can be divisible')).toBe(true)
  })

  it('gap refer to px per interval', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4
      },
      data() {
        return {
          size: 400
        }
      }
    })
    expect(wrapper.vm.gap).toBe(8)
  })

  it('position refers to px of current value', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: 100
      },
      data() {
        return {
          size: 400,
          currentValue: 100
        }
      }
    })
    expect(wrapper.vm.position).toBe(200)
  })

  it('position refers to px of current value', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: [50, 100]
      },
      data() {
        return {
          size: 400,
          currentValue: [50, 100]
        }
      }
    })
    expect(wrapper.vm.position).toEqual([100, 200])
  })

  it('given isRange, limit is array of slider limit range', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: [50, 100]
      },
      data() {
        return {
          size: 400,
          currentValue: [50, 100]
        }
      }
    })
    expect(wrapper.vm.limit).toEqual([[0, 200], [100, 400]])
  })

  it('limit is whole size when isRange is false', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: 50
      },
      data() {
        return {
          size: 400,
          currentValue: 50
        }
      }
    })
    expect(wrapper.vm.limit).toEqual([0, 400])
  })

  it('given isRange is true, valueLimit calculated from min and max', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: [50, 100]
      },
      data() {
        return {
          size: 400,
          currentValue: [50, 100]
        }
      }
    })
    expect(wrapper.vm.valueLimit).toEqual([[0, 100], [50, 200]])
  })

  it('given isRange is false, valueLimit calculated from min and max', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4,
        value: 50
      },
      data() {
        return {
          size: 400,
          currentValue: 50
        }
      }
    })
    expect(wrapper.vm.valueLimit).toEqual([0, 200])
  })

  it('when currentSlider is 0 this.idleSlider is 1, when currentSlider is 1 this.idleSlider is 0', () => {
    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 1
        }
      }
    })
    expect(wrapper.vm.idleSlider).toEqual(0)
    wrapper.setData({
      currentSlider: 0
    })
    expect(wrapper.vm.idleSlider).toEqual(1)
  })

  it('piecewiseDotWrap calculated from min and max', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 100,
        value: 0,
        min: 0,
        max: 200,
        piecewise: true
      },
      data() {
        return {
          size: 400
        }
      }
    })
    expect(wrapper.vm.piecewiseDotWrap).toEqual([{
      style: {
        left: '-1px',
        top: 0
      }
    }, {
      style: {
        left: '199px',
        top: 0
      }
    }, {
      style: {
        left: '399px',
        top: 0
      }
    }])
  })

  it('piecewiseDotWrap should be false when piecewise: false', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 100,
        value: 0,
        min: 0,
        max: 200,
        piecewise: false
      },
      data() {
        return {
          size: 400
        }
      }
    })
    expect(wrapper.vm.piecewiseDotWrap).toEqual(false)
  })

  it('watch max, show error when max smaller than min', () => {
    let printErrorStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        min: 100,
        max: 200
      },
      methods: {
        printError: printErrorStub
      }
    })
    wrapper.setProps({
      max: 50
    })
    expect(printErrorStub.called).toBe(true)
  })

  it('watch max,not show error when max bigger than min', () => {
    let printErrorStub = sandbox.stub()
    let setValueStub = sandbox.stub()
    let refreshStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        min: 0,
        max: 200
      },
      data() {
        return {
          val: 20
        }
      },
      methods: {
        printError: printErrorStub,
        setValue: setValueStub,
        refresh: refreshStub
      }
    })
    expect(printErrorStub.called).toBe(false)
    expect(setValueStub.called).toBe(false)
    expect(refreshStub.called).toBe(false)
    wrapper.setProps({
      max: 201
    })
    expect(printErrorStub.called).toBe(false)
    expect(setValueStub.calledOnceWith(20)).toBe(true)
    expect(refreshStub.calledOnce).toBe(true)
  })

  it('watch min,not show error when max bigger than min', () => {
    let printErrorStub = sandbox.stub()
    let setValueStub = sandbox.stub()
    let refreshStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        min: 0,
        max: 200
      },
      data() {
        return {
          val: 20
        }
      },
      methods: {
        printError: printErrorStub,
        setValue: setValueStub,
        refresh: refreshStub
      }
    })
    expect(printErrorStub.called).toBe(false)
    expect(setValueStub.called).toBe(false)
    expect(refreshStub.called).toBe(false)
    wrapper.setProps({
      min: 11
    })
    expect(printErrorStub.called).toBe(false)
    expect(setValueStub.calledOnceWith(20)).toBe(true)
    expect(refreshStub.calledOnce).toBe(true)
  })

  it('watch min, show error when min bigger than max', () => {
    let printErrorStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        min: 100,
        max: 200
      },
      methods: {
        printError: printErrorStub
      }
    })
    wrapper.setProps({
      min: 201
    })
    expect(printErrorStub.called).toBe(true)
  })

  // mothods
  it('formatting string', () => {
    wrapper.setProps({
      formatter: '¥{value}'
    })
    expect(wrapper.vm.formatting('23')).toBe('¥23')
  })

  it('formatting function', () => {
    wrapper.setProps({
      formatter(value) {
        return `it is ${value}`
      }
    })
    expect(wrapper.vm.formatting('23')).toBe('it is 23')
  })

  it('getPos should be px from mouse position to start of slider', () => {
    let event = {
      clientX: 1000
    }
    wrapper.vm.offset = 700
    expect(wrapper.vm.getPos(event)).toBe(300)
  })

  it('setValueOnPos and getPos should be called when wrapClick', () => {
    let setValueOnPosStub = sandbox.stub()
    let getPosStub = sandbox.stub()

    let event = {
      clientX: 1000
    }
    wrapper = createWrapper({
      methods: {
        setValueOnPos: setValueOnPosStub,
        getPos: getPosStub
      }
    })
    wrapper.vm.wrapClick(event)

    expect(setValueOnPosStub.called).toBeTruthy()
    expect(getPosStub.called).toBeTruthy()
  })

  it('event drag-start should be emitted when moveStart, flag becomes true', () => {
    let event = {}
    wrapper.setData({
      flag: false
    })
    wrapper.vm.moveStart(event)
    expect(wrapper.vm.flag).toBeTruthy()
    expect(wrapper.emitted('drag-start')).toBeTruthy()
    expect(wrapper.emitted('drag-start')[0][0]).toEqual(wrapper.vm)
  })

  it('when moveStart and isPocess is true, should not change focusSlider', () => {
    let event = {}
    wrapper.setData({
      flag: false,
      focusSlider: 1
    })
    expect(wrapper.vm.focusSlider).toBe(1)
    wrapper.vm.moveStart(event, 0, true)
    expect(wrapper.vm.focusSlider).toBe(1)
  })

  it('given disabled, flag and drag-start should not be emitted', () => {
    let event = {}
    wrapper = createWrapper({
      data() {
        return {
          flag: false
        }
      },
      propsData: {
        disabled: true
      }
    })
    wrapper.vm.moveStart(event, 0)
    expect(wrapper.vm.flag).toBeFalsy()
    expect(wrapper.emitted('drag-start')).toBeFalsy()
  })

  it('preventDefault and setValueOnPos should be called when moving emitted', () => {
    let preventDefaultStub = sandbox.stub()
    let setValueOnPosStub = sandbox.stub()

    let event = {
      preventDefault: preventDefaultStub
    }
    wrapper.setMethods({
      setValueOnPos: setValueOnPosStub
    })
    wrapper.setData({
      flag: true
    })
    wrapper.vm.moving(event)
    expect(preventDefaultStub.called).toBeTruthy()
    expect(setValueOnPosStub.called).toBeTruthy()
  })

  it('given flag false, setValueOnPos should not be called when moving', () => {
    let setValueOnPosStub = sandbox.stub()
    let event = {
    }
    wrapper = createWrapper({
      data() {
        return {
          flag: false
        }
      }
    })
    wrapper.setMethods({
      setValueOnPos: setValueOnPosStub
    })
    wrapper.vm.moving(event)
    expect(setValueOnPosStub.called).toBeFalsy()
  })

  // it('given processFlag true, setValueOnPos should be called twice when moving', () => {
  //   let setValueOnPosStub = sandbox.stub()
  //   let preventDefaultStub = sandbox.stub()

  //   let event = {
  //     preventDefault: preventDefaultStub
  //   }
  //   wrapper = createWrapper({
  //     data() {
  //       return {
  //         processFlag: true,
  //         flag: true,
  //         processSign: {
  //           pos: 10,
  //           start: 10
  //         }
  //       }
  //     },
  //     methods: {
  //       setValueOnPos: setValueOnPosStub
  //     }
  //   })
  //   wrapper.vm.moving(event)
  //   expect(setValueOnPosStub.calledTwice).toBeTruthy()
  // })

  it('drag-end should be emitted when moveEnd', () => {
    let event = {}
    wrapper.setData({
      flag: true
    })
    wrapper.vm.moveEnd(event)
    expect(wrapper.emitted('drag-end')).toBeTruthy()
  })

  it('flag, lazy, isDiff are true, should call syncValue when call moveEnd', () => {
    let event = {}
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          flag: true
        }
      },
      propsData: {
        lazy: true
      },
      methods: {
        syncValue: syncValueStub,
        isDiff: () => true
      }
    })
    expect(syncValueStub.called).toBe(false)
    wrapper.vm.moveEnd(event)
    expect(syncValueStub.calledOnce).toBe(true)
  })

  it('flag is false, should return false when call moveEnd', () => {
    let event = {}
    wrapper = createWrapper({
      data() {
        return {
          flag: false
        }
      }
    })
    let res = wrapper.vm.moveEnd(event)
    expect(res).toBe(false)
  })

  it('setTransform should be called when setValueOnPos', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      computed: {
        limit() {
          return [0, 400]
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    wrapper.vm.setValueOnPos(100)
    expect(setTransformStub.called).toBeTruthy()
  })

  it('call setValueOnPos with min limit when pos < range[0]', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 1,
          focusSlider: 1
        }
      },
      computed: {
        limit() {
          return [100, 400]
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    expect(setTransformStub.called).toBeFalsy()
    expect(wrapper.vm.focusSlider).toBe(1)
    expect(wrapper.vm.currentSlider).toBe(1)
    wrapper.vm.setValueOnPos(90)
    expect(setTransformStub.calledWith(100)).toBeTruthy()
    expect(wrapper.vm.focusSlider).toBe(0)
    expect(wrapper.vm.currentSlider).toBe(0)
  })

  it('call setValueOnPos with min limit when pos < range[0] and currentSlider is 0', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 0,
          focusSlider: 1
        }
      },
      computed: {
        limit() {
          return [100, 400]
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    expect(setTransformStub.called).toBeFalsy()
    expect(wrapper.vm.focusSlider).toBe(1)
    expect(wrapper.vm.currentSlider).toBe(0)
    wrapper.vm.setValueOnPos(90)
    expect(setTransformStub.calledWith(100)).toBeTruthy()
    expect(wrapper.vm.focusSlider).toBe(1)
    expect(wrapper.vm.currentSlider).toBe(0)
  })

  it('call setValueOnPos with max limit when pos > range[0]', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 0,
          focusSlider: 0
        }
      },
      computed: {
        limit() {
          return [100, 400]
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    expect(setTransformStub.called).toBeFalsy()
    expect(wrapper.vm.focusSlider).toBe(0)
    expect(wrapper.vm.currentSlider).toBe(0)
    wrapper.vm.setValueOnPos(410)
    expect(setTransformStub.calledWith(400)).toBeTruthy()
    expect(wrapper.vm.focusSlider).toBe(1)
    expect(wrapper.vm.currentSlider).toBe(1)
  })

  it('call setValueOnPos with max limit when pos > range[0] and currentSlider is 1', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 1,
          focusSlider: 0
        }
      },
      computed: {
        limit() {
          return [100, 400]
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    expect(setTransformStub.called).toBeFalsy()
    expect(wrapper.vm.focusSlider).toBe(0)
    expect(wrapper.vm.currentSlider).toBe(1)
    wrapper.vm.setValueOnPos(410)
    expect(setTransformStub.calledWith(400)).toBeTruthy()
    expect(wrapper.vm.focusSlider).toBe(0)
    expect(wrapper.vm.currentSlider).toBe(1)
  })

  it('isDiff returns false when same array', () => {
    let obj1 = [0, 50]
    let obj2 = [0, 50]
    expect(wrapper.vm.isDiff(obj1, obj2)).toBe(false)
  })

  it('isDiff returns true when different array', () => {
    let obj1 = [0, 50]
    let obj2 = [0, 60]
    expect(wrapper.vm.isDiff(obj1, obj2)).toBe(true)
  })

  it('isDiff returns true when different number', () => {
    let obj1 = 1
    let obj2 = 2
    expect(wrapper.vm.isDiff(obj1, obj2)).toBe(true)
  })

  it('currentValue should be set when setCurrentValue calls', () => {
    wrapper.vm.currentValue = 1
    wrapper.vm.setCurrentValue(2, undefined, undefined)
    expect(wrapper.vm.currentValue).toBe(2)
  })

  it('getValueByIndex returns value based on index number', () => {
    wrapper = createWrapper({
      propsData: {
        interval: 4
      }
    })
    expect(wrapper.vm.getValueByIndex(14)).toBe(56)
  })

  it('syncValue should be called when setValue called', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        value: 50
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    wrapper.vm.setValue(54)
    expect(syncValueStub.called).toBe(true)
  })

  // it('computedFixedValue fixed: false', () => {
  //   wrapper = createWrapper({
  //     propsData: {
  //       fixed: false
  //     }
  //   })
  //   wrapper.vm.computedFixedValue()
  //   expect(wrapper.vm.fixedValue).toBe(0)
  // })

  // it('computedFixedValue', () => {
  //   wrapper = createWrapper({
  //     propsData: {
  //       interval: 4,
  //       value: [0, 100],
  //       fixed: true
  //     },
  //     data() {
  //       return {
  //         // size: 400,
  //         currentValue: [0, 100]
  //       }
  //     }
  //   })
  //   wrapper.vm.computedFixedValue()
  //   expect(wrapper.vm.fixedValue).toBe(25)
  // })

  it('setTransitionTime and setTransform should be called when setPosition', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      methods: {
        setTransform: setTransformStub
      },
      propsData: {
        interval: 4,
        value: 100
      },
      data() {
        return {
          size: 400,
          currentValue: 100
        }
      }
    })
    wrapper.vm.setPosition()
    expect(setTransformStub.calledWith(200)).toBeTruthy()
  })

  it('getValue returns this.val', () => {
    wrapper.vm.val = 'test'
    expect(wrapper.vm.getValue()).toBe('test')
  })

  it('getStaticData and setPosition call when refresh', () => {
    let getStaticDataStub = sandbox.stub()
    let setPositionStub = sandbox.stub()
    wrapper.setMethods({
      getStaticData: getStaticDataStub,
      setPosition: setPositionStub
    })
    expect(getStaticDataStub.called).toBeFalsy()
    expect(setPositionStub.called).toBeFalsy()
    wrapper.vm.refresh()
    expect(getStaticDataStub.calledOnce).toBeTruthy()
    expect(setPositionStub.calledOnce).toBeTruthy()
  })

  it('when $refs.elem is null, should not call getStaticData and setPosition', () => {
    let getStaticDataStub = sandbox.stub()
    let setPositionStub = sandbox.stub()
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          size: 0,
          offset: 0
        }
      },
      methods: {
        setTransform: setTransformStub,
        getStaticData: getStaticDataStub,
        setPosition: setPositionStub
      }
    })
    wrapper.vm.$refs = sandbox.stub().returns({})
    wrapper.vm.refresh()
    expect(setPositionStub.called).toBe(false)
    expect(getStaticDataStub.called).toBe(false)
  })

  it('call getStaticData should not change size and offset when $refs.elem is null', () => {
    let setTransformStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          size: 0,
          offset: 0
        }
      },
      methods: {
        setTransform: setTransformStub
      }
    })
    wrapper.vm.$refs = sandbox.stub().returns({})
    wrapper.vm.getStaticData()
    expect(wrapper.vm.size).toBe(0)
    expect(wrapper.vm.offset).toBe(0)
  })

  it('call console.log when printError', () => {
    let errorStub = sandbox.stub(console, 'error')
    wrapper.vm.printError('message')
    expect(errorStub.called).toBeTruthy()
    expect(errorStub.calledWith('[VueSlider error]: message')).toBeTruthy()
  })

  it('called blurSlider, should return false when dot is e.target', () => {
    let event = {target: wrapper.vm.$refs.dot}
    let res = wrapper.vm.blurSlider(event)
    expect(res).toBe(false)
  })

  it('setCurrentValue should call syncValue when lazy and flag is false and value in right range', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        lazy: false
      },
      data() {
        return {
          currentValue: 23,
          currentSlider: 1,
          flag: false
        }
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    expect(syncValueStub.called).toBe(false)
    wrapper.vm.setCurrentValue(20, true)
    expect(syncValueStub.calledOnce).toBe(true)
  })

  it('setCurrentValue should not call syncValue when lazy and flag is true and value in right range', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        lazy: true
      },
      data() {
        return {
          currentValue: 23,
          currentSlider: 1,
          flag: true
        }
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    wrapper.vm.setCurrentValue(20, true)
    expect(syncValueStub.called).toBe(false)
  })
})

describe('two sliders(isRange is true)', () => {
  let wrapper
  let sandbox
  function createWrapper(params) {
    return shallowMount(ComSlider, _.merge({
      propsData: {
        value: [10, 200],
        max: 1000
      },
      computed: {
        position() {
          return [10, 400]
        }
      },
      attachToDocument: true
    }, params || {}))
  }
  beforeEach(() => {
    sandbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    sandbox.restore()
    wrapper.destroy()
  })

  it('wrapClick: currentSlider is 1 when mouse click on the right area', () => {
    let setValueOnPosStub = sandbox.stub()
    let getPosStub = sandbox.stub().returns(300)
    let event = {}

    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 0
        }
      },
      methods: {
        setValueOnPos: setValueOnPosStub,
        getPos: getPosStub
      }
    })
    expect(wrapper.vm.currentSlider).toBe(0)
    wrapper.vm.wrapClick(event)
    expect(wrapper.vm.currentSlider).toBe(1)
  })

  it('wrapClick: currentSlider is 0 when mouse click on the left area', () => {
    let setValueOnPosStub = sandbox.stub()
    let getPosStub = sandbox.stub().returns(100)
    let event = {}

    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 1
        }
      },
      methods: {
        setValueOnPos: setValueOnPosStub,
        getPos: getPosStub
      }
    })

    wrapper.vm.wrapClick(event)
    expect(wrapper.vm.currentSlider).toBe(0)
  })

  it('wrapClick: setValueOnPos not called when mouse click on wrap when disabled', () => {
    let setValueOnPosStub = sandbox.stub()
    let getPosStub = sandbox.stub().returns(9)
    let event = {}

    wrapper = createWrapper({
      data() {
        return {
          currentSlider: 0
        }
      },
      propsData: {
        disabled: true
      },
      methods: {
        setValueOnPos: setValueOnPosStub,
        getPos: getPosStub
      }
    })

    wrapper.vm.wrapClick(event)
    expect(setValueOnPosStub.called).toBeFalsy()
  })

  it('wrapClick: setValueOnPos not called when mouse click on wrap when disabled', () => {
    let getPosStub = sandbox.stub()
    let event = {}

    wrapper = createWrapper({
      propsData: {
        disabled: true
      },
      methods: {
        getPos: getPosStub
      }
    })

    wrapper.vm.wrapClick(event)
    expect(getPosStub.called).toBeFalsy()
  })

  it('moveStart: given isProcess is true, currentSlider should be 1 when second argument to movestart is 1', () => {
    let event = {}
    wrapper.vm.moveStart(event, 1, true)
    expect(wrapper.vm.currentSlider).toBe(1)
  })

  it('called blurSlider, should return false when dot is e.target', () => {
    let event = {target: wrapper.vm.$refs.dot0}
    let res = wrapper.vm.blurSlider(event)
    expect(res).toBe(false)
  })

  it('setCurrentValue should call syncValue when not lazy and flag is true and value in right range', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        lazy: false
      },
      data() {
        return {
          currentValue: [12, 59],
          currentSlider: 1,
          flag: false
        }
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    expect(syncValueStub.called).toBe(false)
    wrapper.vm.setCurrentValue(20, true)
    expect(syncValueStub.calledOnce).toBe(true)
  })

  it('setCurrentValue should not call syncValue when lazy and flag is false and value in right range', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      propsData: {
        lazy: true
      },
      data() {
        return {
          currentValue: [12, 59],
          currentSlider: 1,
          flag: true
        }
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    wrapper.vm.setCurrentValue(20, true)
    expect(syncValueStub.called).toBe(false)
  })

  it('setCurrentValue should not call syncValue when currentValue is same as argument val', () => {
    let syncValueStub = sandbox.stub()
    wrapper = createWrapper({
      data() {
        return {
          currentValue: [12, 59],
          currentSlider: 1
        }
      },
      methods: {
        syncValue: syncValueStub
      }
    })
    wrapper.vm.setCurrentValue(59, true)
    expect(syncValueStub.called).toBe(false)
  })

  it('bindKeyShortcuts() should bind some key shortcuts', () => {
    const dotElement = {
      addEventListener: jest.fn((eventName, action) => (action()))
    }
    const {vm} = wrapper
    vm.$el.querySelectorAll = () => ([dotElement])
    vm.$el.addEventListener = jest.fn()
    vm.onSliderDotFocus = jest.fn()

    vm.bindKeyShortcuts()

    expect(dotElement.tabIndex).toBe(0)
    expect(dotElement.addEventListener).toHaveBeenCalled()
    expect(vm.onSliderDotFocus).toHaveBeenCalled()
    expect(vm.$el.addEventListener.mock.calls.length).toBe(2)
  })
  it('onSliderDotFocus() should call method moveStart', () => {
    const {vm} = wrapper
    vm.moveStart = jest.fn()
    vm.flag = true
    vm.onSliderDotFocus('test', 1)

    expect(vm.moveStart).toHaveBeenCalledWith('test', 1)
    expect(vm.flag).toBeFalsy()
  })
  describe('preventKeys()', () => {
    it('should prevent key arrow up', () => {
      const event = { key: KEY_VALUES.ARROW_UP, preventDefault: jest.fn() }
      wrapper.vm.preventKeys(event)

      expect(event.preventDefault).toHaveBeenCalled()
    })
    it('should prevent key arrow down', () => {
      const event = { key: KEY_VALUES.ARROW_DOWN, preventDefault: jest.fn() }
      wrapper.vm.preventKeys(event)

      expect(event.preventDefault).toHaveBeenCalled()
    })
  })
  describe('onKeyUp()', () => {
    let event, updateSliderValueSpy
    const focusingValue = 1
    beforeEach(() => {
      event = {
        target: {
          classList: { contains() { return {} } }
        }
      }
      updateSliderValueSpy = jest.fn()
      wrapper.vm.getFocusingValue = () => focusingValue
      wrapper.vm.updateSliderValue = updateSliderValueSpy
    })
    it('should increase value when press arrow up', () => {
      const {vm} = wrapper
      event.key = KEY_VALUES.ARROW_UP
      vm.onKeyUp(event)

      expect(updateSliderValueSpy).toHaveBeenCalledWith(focusingValue, 1)
    })
    it('should increase value when press arrow right', () => {
      const {vm} = wrapper
      event.key = KEY_VALUES.ARROW_RIGHT
      vm.onKeyUp(event)

      expect(updateSliderValueSpy).toHaveBeenCalledWith(focusingValue, 1)
    })
    it('should increase value when press arrow left', () => {
      const {vm} = wrapper
      event.key = KEY_VALUES.ARROW_LEFT
      vm.onKeyUp(event)

      expect(updateSliderValueSpy).toHaveBeenCalledWith(focusingValue, -1)
    })
    it('should increase value when press arrow down', () => {
      const {vm} = wrapper
      event.key = KEY_VALUES.ARROW_DOWN
      vm.onKeyUp(event)

      expect(updateSliderValueSpy).toHaveBeenCalledWith(focusingValue, -1)
    })
    it('should do nothing when target element not slider dot', () => {
      event.target.classList.contains = () => null
      event.key = KEY_VALUES.ARROW_DOWN
      const {vm} = wrapper
      vm.getFocusingValue = jest.fn()
      vm.onKeyUp(event)

      expect(updateSliderValueSpy).not.toHaveBeenCalled()
      expect(vm.getFocusingValue).not.toHaveBeenCalled()
    })
  })
  describe('getFocusingValue()', () => {
    it('should return input value for single slider', () => {
      wrapper = createWrapper({
        propsData: {
          value: 0
        }
      })
      const {vm} = wrapper
      vm.isRange = false
      const result = vm.getFocusingValue({}, 3)
      expect(result).toBe(3)
    })
    it('should focus next slider dot when start value greater than end value', () => {
      wrapper = createWrapper({
        propsData: {
          value: [0, 10],
          interval: 10
        }
      })
      const focusSpy = jest.fn()
      const event = { target: { nextElementSibling: { focus: focusSpy } } }
      const value = [5, 10]
      const {vm} = wrapper
      vm.currentSlider = 0
      const result = vm.getFocusingValue(event, value)

      expect(result).toBe(10)
      expect(focusSpy).toHaveBeenCalled()
    })
    it('should focus previous slider dot when end value less than start value', () => {
      wrapper = createWrapper({
        propsData: {
          value: [0, 10],
          interval: 10
        }
      })
      const focusSpy = jest.fn()
      const event = { target: { previousElementSibling: { focus: focusSpy } } }
      const value = [5, 10]
      const {vm} = wrapper
      vm.currentSlider = 1
      const result = vm.getFocusingValue(event, value)

      expect(result).toBe(5)
      expect(focusSpy).toHaveBeenCalled()
    })
  })
})
