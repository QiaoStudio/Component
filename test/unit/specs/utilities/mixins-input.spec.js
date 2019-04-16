import {
  shallowMount
} from 'dp-test'
import InputBase from 'src/utilities/mixins/input'
import sinon from 'sinon'
import _ from 'lodash'

describe('src/utilities/mixins/input.js', () => {
  const emptyComponent = {
    name: 'empty-component'
  }
  let wrapper
  let sanbox
  function createWrapper(options) {
    return shallowMount(emptyComponent, _.merge({
      mixins: [InputBase]
    }, options || {}))
  }
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('Given empty value , isValidValue should be false', () => {
    expect(wrapper.vm.isValidValue).toBe(false)
    wrapper.setProps({
      value: ''
    })
    expect(wrapper.vm.isValidValue).toBe(false)
  })

  it('Given value , isValidValue should be true', () => {
    wrapper.setProps({
      value: 'test'
    })
    expect(wrapper.vm.isValidValue).toBe(true)
  })

  it('when focus, isActive is true, when blur, isActive is false', () => {
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    expect(wrapper.vm.isActive).toBe(true)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('given value is valid, when blur, isActive is true', () => {
    wrapper = createWrapper({
      computed: {
        isValidValue() {
          return true
        }
      }
    })
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    expect(wrapper.vm.isActive).toBe(true)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('given value is valid, isShowCharacterCounter is true', () => {
    wrapper = createWrapper({
      propsData: {
        maxLength: 3
      }
    })
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    expect(wrapper.vm.isShowCharacterCounter).toBe(true)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isShowCharacterCounter).toBe(false)
  })

  it('value length', () => {
    wrapper = createWrapper({
      propsData: {
        value: '123'
      }
    })
    expect(wrapper.vm.valueLength).toBe(3)
  })

  it('Given errorStatus , isError should be true', () => {
    wrapper = createWrapper({
      propsData: {
        errorStatus: true
      }
    })
    expect(wrapper.vm.isError).toBe(true)
  })

  it('Given required, when empty value , isError should be true', () => {
    wrapper = createWrapper({
      propsData: {
        required: true
      }
    })
    expect(wrapper.vm.isError).toBe(false)
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isError).toBe(true)
    expect(wrapper.emitted('update:errorMessage')[0][0]).toBe('This field is required.')
  })

  it('Given max length, when value length larger than max length , isError should be true', () => {
    wrapper = createWrapper({
      propsData: {
        maxLength: 3,
        value: '1234'
      }
    })
    expect(wrapper.vm.isError).toBe(false)
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isError).toBe(true)
    expect(wrapper.emitted('update:errorMessage')[0][0]).toBe('The text length is more then 3')
  })

  it('Given min length, when value length smaller than min length, isError should be true', () => {
    wrapper = createWrapper({
      propsData: {
        minLength: 3,
        value: '12'
      }
    })
    expect(wrapper.vm.isError).toBe(false)
    let mockEvent = {}
    wrapper.vm.focus(mockEvent)
    wrapper.vm.blur(mockEvent)
    expect(wrapper.vm.isError).toBe(true)
    expect(wrapper.emitted('update:errorMessage')[0][0]).toBe('The text length is less then 3')
  })

  it('input is called, emit input and update:errorMessage', () => {
    let mockEvent = {
      target: {
        value: ''
      }
    }
    wrapper.vm.input(mockEvent)
    expect(wrapper.emitted('update:errorMessage')[0][0]).toBe('')
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('target is select when focused', () => {
    let selectStub = sanbox.stub()
    let mockEvent = {
      target: {
        select: selectStub
      }
    }
    wrapper.vm.focus(mockEvent)
    setTimeout(() => {
      expect(selectStub.called).toBe(true)
    })
  })

  it('call selectAll should call event.target.select', () => {
    let selectStub = sanbox.stub()
    let clock = sanbox.useFakeTimers()
    let event = {
      target: {
        select: selectStub
      }
    }
    expect(selectStub.called).toBe(false)
    wrapper.vm.selectAll(event)
    clock.tick(100)
    expect(selectStub.calledOnce).toBe(true)
  })
})
