import { mount } from 'dp-test'
import sinon from 'sinon'
import { KeyboardInteractionForList } from 'utilities/mixins/keyboard-interaction'
import { KEY_VALUES } from 'utilities/event-helper/key-event'

describe('utilities/Keyboard Interaction', () => {
  let wrapper, sanbox
  let keyboardSettings = {}
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    keyboardSettings = {}
  })
  afterEach(() => {
    sanbox.restore()
    wrapper.destroy()
  })
  function createWrapper() {
    return mount(
      {
        template: `
      <ul class="container">
        <li class="item lv-1">
          1
          <ul class="container">
            <li class="item">1-1</li>
            <li class="item">1-2</li>
            <li class="item">1-3</li>
          </ul>
        </li>
        <li class="item lv-1">
          2
          <ul class="container">
            <li class="item">2-1</li>
            <li class="item">2-2</li>
            <li class="item">2-3</li>
          </ul>
        </li>
        <li class="item lv-1">
          3
          <ul class="container">
            <li class="item">3-1</li>
            <li class="item">3-2</li>
            <li class="item">3-3</li>
          </ul>
        </li>
      </ul>
      `,
        mixins: [KeyboardInteractionForList],
        data() {
          return {
            keyboardSettings
          }
        }
      },
      {
        attachToDocument: true
      }
    )
  }
  function getTabIndex(arrayWrapper) {
    return arrayWrapper.wrappers.map(wrapper => wrapper.attributes().tabindex)
  }
  it.each`
    itemSelector | expected
    ${'.item'}   | ${['0', '-1', '-1']}
    ${null}      | ${[undefined, undefined, undefined]}`(
  'should have tabindex like $expected when itemSelector is $itemSelector', ({ itemSelector, expected }) => {
    keyboardSettings.itemSelector = itemSelector
    wrapper = createWrapper()
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(expected)
    getTabIndex(wrapper.findAll('.item:not(.lv-1)')).forEach(tabindex => expect(tabindex).toBeUndefined())
  })
  it('should NOT change tabindex position when backwardKeys and forwardKeys are NOT defined', () => {
    keyboardSettings.itemSelector = '.item'
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', {
      key: KEY_VALUES.ARROW_UP
    })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['0', '-1', '-1'])
    wrapper.trigger('keydown', {
      key: KEY_VALUES.ARROW_LEFT
    })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['0', '-1', '-1'])
    wrapper.trigger('keydown', {
      key: KEY_VALUES.ARROW_RIGHT
    })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['0', '-1', '-1'])
    wrapper.trigger('keydown', {
      key: KEY_VALUES.ARROW_DOWN
    })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['0', '-1', '-1'])
  })
  it('should be able to change tabindex position when press on key which is defined in backwardKeys', () => {
    keyboardSettings.itemSelector = '.item'
    keyboardSettings.backwardKeys = [KEY_VALUES.ARROW_DOWN]
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_DOWN })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['-1', '-1', '0'])
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_LEFT })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['-1', '-1', '0'])
  })
  it('should be able to change tabindex position when press on key which is defined in forwardKeys', () => {
    keyboardSettings.itemSelector = '.item'
    keyboardSettings.forwardKeys = [KEY_VALUES.ARROW_RIGHT]
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_RIGHT })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['-1', '0', '-1'])
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_LEFT })
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['-1', '0', '-1'])
  })
  it('should invoke onFocus when tabindex has been changed', () => {
    let onFocus = sanbox.stub()
    keyboardSettings.itemSelector = '.item'
    keyboardSettings.forwardKeys = [KEY_VALUES.ARROW_RIGHT]
    keyboardSettings.onFocus = onFocus
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_RIGHT })
    expect(onFocus.called).toBeTruthy()
  })
  it('should NOT invoke onSelect when selectKeys is EMPTY', () => {
    let onSelect = sanbox.stub()
    keyboardSettings.onSelect = onSelect
    keyboardSettings.selectKeys = []
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.ENTER })
    expect(onSelect.called).toBeFalsy()
    wrapper.trigger('keydown', { key: KEY_VALUES.SPACE })
    expect(onSelect.called).toBeFalsy()
  })
  it('should invoke onSelect when press on key which is defined in selectKeys', () => {
    let onSelect = sanbox.stub()
    keyboardSettings.onSelect = onSelect
    keyboardSettings.selectKeys = [KEY_VALUES.SPACE]
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.SPACE })
    expect(onSelect.calledOnce).toBeTruthy()
  })
  it('should invoke onSelect when press on ENTER or SPACE by default', () => {
    let onSelect = sanbox.stub()
    keyboardSettings.onSelect = onSelect
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.SPACE })
    expect(onSelect.calledOnce).toBeTruthy()
    wrapper.trigger('keydown', { key: KEY_VALUES.SPACE })
    expect(onSelect.calledTwice).toBeTruthy()
  })
  it('should NOT invoke onDismiss when dismissKeys is EMPTY', () => {
    let onDismiss = sanbox.stub()
    keyboardSettings.onDismiss = onDismiss
    keyboardSettings.dismissKeys = []
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.ESCAPE })
    expect(onDismiss.called).toBeFalsy()
  })
  it('should invoke onDismiss when press on key which is defined in dismissKeys', () => {
    let onDismiss = sanbox.stub()
    keyboardSettings.onDismiss = onDismiss
    keyboardSettings.dismissKeys = [KEY_VALUES.SPACE]
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.SPACE })
    expect(onDismiss.calledOnce).toBeTruthy()
  })
  it('should invoke onDismiss when press on ESCAPE by default', () => {
    let onDismiss = sanbox.stub()
    keyboardSettings.onDismiss = onDismiss
    wrapper = createWrapper()
    wrapper.trigger('keydown', { key: KEY_VALUES.ESCAPE })
    expect(onDismiss.called).toBeTruthy()
  })

  it('should reset tabindex when focusout', () => {
    keyboardSettings.itemSelector = '.item'
    keyboardSettings.forwardKeys = [KEY_VALUES.ARROW_RIGHT]
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_RIGHT })
    wrapper.trigger('focusout')
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['0', '-1', '-1'])
  })

  it('should set tabindex on element which found in getDefaultFocus when focusout', () => {
    keyboardSettings.itemSelector = '.item'
    keyboardSettings.forwardKeys = [KEY_VALUES.ARROW_RIGHT]
    keyboardSettings.getDefaultFocus = list => list[2]
    wrapper = createWrapper()
    wrapper.find('.item.lv-1').element.focus()
    wrapper.trigger('keydown', { key: KEY_VALUES.ARROW_RIGHT })
    wrapper.trigger('focusout')
    expect(getTabIndex(wrapper.findAll('.item.lv-1'))).toEqual(['-1', '-1', '0'])
  })
})
