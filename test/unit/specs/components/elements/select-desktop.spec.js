import {
  shallowMount,
  mount
} from 'dp-test'
import SelectDesktop from 'components/elements/select/select-desktop.vue'
import sinon from 'sinon'
import _ from 'lodash'
import $ from 'jQuery'

describe('elements/Select desktop', () => {
  let wrapper
  let sanbox
  global.$ = global.jQuery = $

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(SelectDesktop, _.merge({
      propsData: {
        label: 'label'
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('item should return empty when value no inculded items', () => {
    wrapper = generateWrapper()
    let options = [{
      key: 0,
      text: 'a11'
    }, {
      key: 1,
      text: 'a22'
    }, {
      key: 2,
      text: 'a33'
    }, {
      key: 3,
      text: 'b11'
    }]
    wrapper.setProps({
      items: options,
      value: 4
    })

    expect(wrapper.vm.item).toBe('')
  })

  it('item should return correct when value included items', () => {
    wrapper = generateWrapper()
    let options = [{
      key: 0,
      text: 'a11'
    }, {
      key: 1,
      text: 'a22'
    }, {
      key: 2,
      text: 'a33'
    }, {
      key: 3,
      text: 'b11'
    }]
    wrapper.setProps({
      items: options,
      value: 2
    })

    expect(wrapper.vm.item).toBe(2)
  })

  it('list should return correctly', () => {
    wrapper = generateWrapper()
    let options = [{
      key: null,
      text: '---------------------------------'
    }, {
      key: 1,
      text: 'a22'
    }]
    wrapper.setProps({
      items: options,
      value: 2
    })

    expect(wrapper.vm.list[0].disabled).toBe(true)
    expect(wrapper.vm.list[0].class).toContain('dp-field__select-option-line')

    expect(wrapper.vm.list[1].key).toBe(1)
    expect(wrapper.vm.list[1].text).toBe('a22')
  })

  it('displayItem should return defaultText when returnObject is true and item is exist', () => {
    wrapper = generateWrapper()
    let options = [{
      key: 1,
      text: '22'
    }]
    wrapper.setProps({
      items: options,
      value: 1,
      returnObject: true
    })

    expect(wrapper.vm.displayItem).toBe(wrapper.vm.defaultText)
  })

  it('displayItem should return displayText when returnObject is true and item is exist displayText', () => {
    wrapper = generateWrapper()
    let options = [{
      key: 1,
      displayText: 'displayText'
    }]
    wrapper.setProps({
      items: options,
      value: 1,
      returnObject: true
    })

    expect(wrapper.vm.displayItem).toBe(wrapper.vm.defaultText)
  })

  it('displayItem should be shown displayText when returnObject is false and value include select options', () => {
    wrapper = generateWrapper()
    let options = [{
      key: 1,
      displayText: 'displayText'
    }]
    wrapper.setProps({
      items: options,
      value: 1,
      returnObject: false
    })

    expect(wrapper.vm.displayItem).toBe(options[0].displayText)
  })

  it('toggle should be triggle when user click', () => {
    wrapper = mount(SelectDesktop)
    let toggleCallBack = sanbox.stub()
    wrapper.setMethods({
      toggle: toggleCallBack
    })
    wrapper.find('.dp-field__select-holder').trigger('click')
    expect(toggleCallBack.calledOnce).toBe(true)
  })

  it('toggle should execute correctly when dropupAuto field is true and show field is false', () => {
    wrapper = mount(SelectDesktop, {
      attachToDocument: true
    })
    let options = [{
      key: 0,
      text: 'a11'
    }, {
      key: 1,
      text: 'a22'
    }, {
      key: 2,
      text: 'a33'
    }, {
      key: 3,
      text: 'b11'
    }]
    wrapper.setProps({
      items: options,
      value: 1,
      dropupAuto: true
    })
    wrapper.setData({
      show: false
    })
    wrapper.vm.toggle()
    let menu = wrapper.find('.dp-field__dropdown-menu')
    expect(menu.element.style.marginTop).toBe('')
    expect(wrapper.vm.dropup).toBe(false)
  })

  it('toggle should execute correctly when dropupAuto field is true and show field is true and focusItem object exist', () => {
    wrapper = mount(SelectDesktop, {
      attachToDocument: true,
      data: function () {
        return {
          focusItem: {
            disabled: true
          },
          show: true
        }
      }
    })

    let options = [{
      key: 0,
      text: 'a11'
    }, {
      key: 1,
      text: 'a22'
    }, {
      key: 2,
      text: 'a33'
    }, {
      key: 3,
      text: 'b11'
    }]
    wrapper.setProps({
      items: options,
      value: 1,
      dropupAuto: true
    })
    wrapper.setMethods({
      select: sanbox.stub()
    })
    wrapper.setData({

    })
    wrapper.vm.toggle('click')
    expect(wrapper.vm.focusItem).toBe(null)
    expect(wrapper.vm.focusIndex).toBe(0)
  })

  it('select should be triggle when user click select item', () => {
    wrapper = shallowMount(SelectDesktop)
    let options = [{
      key: 0,
      text: 'a11'
    }, {
      key: 1,
      text: 'a22'
    }, {
      key: 2,
      text: 'a33'
    }, {
      key: 3,
      text: 'b11'
    }]
    wrapper.setProps({
      items: options,
      value: 1
    })
    let selectCallBack = sanbox.stub()
    wrapper.setMethods({
      select: selectCallBack
    })

    wrapper.find('.dp-field__dropdown-menu ul > li a').trigger('click')
    expect(selectCallBack.calledOnce).toBe(true)
  })

  it('select execute correctly', () => {
    wrapper = mount(SelectDesktop)
    let options = [{
      key: 0,
      text: 'a11',
      disabled: false
    }, {
      key: 1,
      text: 'a22',
      disabled: false
    }]
    wrapper.setProps({
      items: options,
      value: 1
    })

    wrapper.setData({
      show: true
    })

    wrapper.find('.dp-field__dropdown-menu ul > li a').trigger('click')
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.vm.show).toBe(false)
  })

  it('when keydown, keyDownSearchSelectIndex should be called', done => {
    const keyDownSearchSelectIndex = sanbox.stub()
    wrapper = generateWrapper({
      sync: false
    })
    let options = [{
      key: 0,
      text: 'a11',
      disabled: false
    }, {
      key: 1,
      text: 'b22',
      disabled: false
    },
    {
      key: 2,
      text: 'c22',
      disabled: false
    }]
    wrapper.setProps({
      items: options,
      value: 0
    })

    wrapper.setData({
      show: true
    })

    wrapper.setMethods({
      keyDownSearchSelectIndex: keyDownSearchSelectIndex
    })
    wrapper.vm.$nextTick(() => {
      wrapper.trigger('keydown', {
        keyCode: 67
      })
      expect(keyDownSearchSelectIndex.calledOnce).toBeTruthy()
      done()
    })
  })

  it('keyDownSearchSelectIndex Should return empty case inputChar not in options', done => {
    wrapper = mount(SelectDesktop)
    var options = [{
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }]
    let option = null
    let inputChar = 'w'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(undefined)
    done()
  })

  it('keyDownSearchSelectIndex Should return 3 case inputChar is b and not in options', done => {
    wrapper = mount(SelectDesktop)
    var options = [{
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }]
    let option = null
    let inputChar = 'b'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(3)
    done()
  })

  it('keyDownSearchSelectIndex Should return 1 case inputChar is a and option is {a11}', done => {
    wrapper = mount(SelectDesktop)
    var options = [{
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }]
    let option = {
      text: 'a11'
    }
    let inputChar = 'a'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(1)
    done()
  })

  it('keyDownSearchSelectIndex Should return 0 case inputChar is a and option is {a33}', done => {
    wrapper = mount(SelectDesktop)
    let options = [{
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }]
    let option = {
      text: 'a33'
    }
    let inputChar = 'a'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(0)
    done()
  })

  it('keyDownSearchSelectIndex Should return 6 case inputChar is b and option is {text: b22, index: 5}', done => {
    wrapper = mount(SelectDesktop)
    let options = [{
      text: 'b22'
    }, {
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }, {
      text: 'b22'
    }, {
      text: 'b33'
    }]
    let option = {
      text: 'b22',
      index: 5
    }
    let inputChar = 'b'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(6)
    done()
  })

  it('keyDownSearchSelectIndex Should return 4 case inputChar is b and option is {text: b22, index: 0}', done => {
    wrapper = mount(SelectDesktop)
    let options = [{
      text: 'b22'
    }, {
      text: 'a11'
    }, {
      text: 'a22'
    }, {
      text: 'a33'
    }, {
      text: 'b11'
    }, {
      text: 'b22'
    }, {
      text: 'b33'
    }]
    let option = {
      text: 'b22',
      index: 0
    }
    let inputChar = 'b'
    expect(wrapper.vm.keyDownSearchSelectIndex(inputChar, options, option)).toBe(4)
    done()
  })

  it('should render slot "prepend" correctly', () => {
    wrapper = generateWrapper({
      slots: {
        prepend: '<b class="inner_label">SORT BY</b>'
      },
      propsData: {
        items: [
          {key: 1, text: '1'}
        ]
      }
    })
    expect(wrapper.find('.dp-field__select-holder').text()).toBe('SORT BY 1')
  })
})
