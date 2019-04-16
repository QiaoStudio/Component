import {
  shallowMount
} from 'dp-test'
import ComTabs from 'components/elements/tabs/tabs.vue'
import _ from 'lodash'
import { KEY_VALUES } from 'utilities/event-helper/key-event'

describe('elements/Tabs', () => {
  let wrapper
  let activate = () => {}
  let deactivate = () => {}
  let tabItems = [
    {
      label: 'tab1',
      visible: true,
      activate,
      deactivate
    },
    {
      label: 'tab2',
      visible: true,
      activate,
      deactivate
    },
    {
      label: 'tab3',
      visible: true,
      activate,
      deactivate
    }
  ]

  function generateWrapper(options) {
    return shallowMount(ComTabs, _.merge({
      data: () => {
        return {
          tabItems
        }
      },
      propsData: {
        index: 1
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
  })

  function getTabClasses(wrapper) {
    const classes = []
    classes.push(wrapper.findAll('li').at(0).classes())
    classes.push(wrapper.findAll('li').at(1).classes())
    classes.push(wrapper.findAll('li').at(2).classes())
    return classes
  }

  function getTabIndexes(wrapper) {
    const indexes = []
    indexes.push(wrapper.findAll('li').at(0).attributes().tabindex)
    indexes.push(wrapper.findAll('li').at(1).attributes().tabindex)
    indexes.push(wrapper.findAll('li').at(2).attributes().tabindex)
    return indexes
  }

  it('when set tabItems, tab label should be shown', () => {
    wrapper = generateWrapper()
    expect(wrapper.findAll('li a').at(0).text()).toBe('tab1')
    expect(wrapper.findAll('li a').at(1).text()).toBe('tab2')
    expect(wrapper.findAll('li a').at(2).text()).toBe('tab3')
  })

  it('when tabItems length is zero, tab should be hiden', () => {
    let tabItems = []
    wrapper = shallowMount(ComTabs, {
      data: () => {
        return {
          tabItems
        }
      }
    })
    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('when set activeTab, tab should has active class', () => {
    wrapper = generateWrapper()
    expect(wrapper.findAll('li').at(1).classes()).toContain('active')
  })

  it('when no setting index, first tab should be active', () => {
    wrapper = shallowMount(ComTabs, {
      data: () => {
        return {
          tabItems
        }
      }
    })
    expect(wrapper.findAll('li').at(0).classes()).toContain('active')
  })

  it('when index change, active tab should be changed', () => {
    wrapper = generateWrapper()
    expect(wrapper.findAll('li').at(1).classes()).toContain('active')
    wrapper.setProps({
      index: 2
    })
    expect(wrapper.findAll('li').at(0).classes()).toEqual([])
    expect(wrapper.findAll('li').at(1).classes()).toEqual([])
    expect(wrapper.findAll('li').at(2).classes()).toContain('active')
    expect(wrapper.emitted()['change'][0][0]).toBe(2)
  })

  it('if click other tab, that tab should be actived', () => {
    wrapper = generateWrapper()
    wrapper.findAll('li').at(0).trigger('click')
    expect(wrapper.findAll('li').at(0).classes()).toContain('active')
  })

  it('if click acvtive tab, do nothing', () => {
    wrapper = generateWrapper()
    wrapper.findAll('li').at(1).trigger('click')
    expect(wrapper.findAll('li').at(1).classes()).toContain('active')
  })

  it('when slot exists,show the slot in div', () => {
    wrapper = generateWrapper({
      slots: {
        default: '<div class="el">test el</div>'
      }
    })
    expect(wrapper.find('.el').text()).toBe('test el')
  })

  it('when set the isTabUnderline,the theme will change', () => {
    wrapper = generateWrapper({
      propsData: {
        isTabUnderline: true
      }
    })
    expect(wrapper.classes()).toContain('dp-tabs--underline')
  })

  it.each([
    [KEY_VALUES.ARROW_RIGHT],
    [KEY_VALUES.ARROW_DOWN]
  ])('when press %s, active tab should be changed to next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 0
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], ['active'], []])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '0', '-1'])
  })

  it.each([
    [KEY_VALUES.ARROW_RIGHT],
    [KEY_VALUES.ARROW_DOWN]
  ])('when press %s, active tab should be changed to next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 0
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], ['active'], []])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '0', '-1'])
  })

  it.each([
    [KEY_VALUES.ARROW_LEFT],
    [KEY_VALUES.ARROW_UP]
  ])('when press %s, active tab should be changed to next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 2
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], ['active'], []])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '0', '-1'])
  })

  it.each([
    [KEY_VALUES.ARROW_UP],
    [KEY_VALUES.ARROW_LEFT]
  ])('when press %s, active tab should be changed to next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 0
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], [], ['active']])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '-1', '0'])
  })

  it.each([
    [KEY_VALUES.ARROW_RIGHT],
    [KEY_VALUES.ARROW_DOWN]
  ])('when last tab is active and press %s, active tab should be changed to first tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 2
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([['active'], [], []])
    expect(getTabIndexes(wrapper)).toEqual(['0', '-1', '-1'])
  })

  it.each([
    [KEY_VALUES.ARROW_LEFT],
    [KEY_VALUES.ARROW_UP]
  ])('when first tab is active and press %s, active tab should be changed to last tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 0
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], [], ['active']])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '-1', '0'])
  })

  it.each([
    [KEY_VALUES.ARROW_RIGHT],
    [KEY_VALUES.ARROW_DOWN]
  ])('when press %s twice, active tab should be changed to next of next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 2
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], ['active'], []])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '0', '-1'])
  })

  it('when press right arrow then press left arrow, active tab should not be changed', () => {
    wrapper = generateWrapper({
      propsData: {
        index: 2
      }
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: KEY_VALUES.ARROW_RIGHT
    })
    wrapper.find('.dp-tabs__header li.active').trigger('keydown', {
      key: KEY_VALUES.ARROW_LEFT
    })
    expect(getTabClasses(wrapper)).toEqual([[], [], ['active']])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '-1', '0'])
  })

  it.each([
    [KEY_VALUES.ARROW_RIGHT],
    [KEY_VALUES.ARROW_DOWN]
  ])('when focus on ul and press %s, active tab should be changed to next tab', (key) => {
    wrapper = generateWrapper({
      propsData: {
        index: 0
      }
    })
    wrapper.find('.dp-tabs__header').trigger('keydown', {
      key: key
    })
    expect(getTabClasses(wrapper)).toEqual([[], ['active'], []])
    expect(getTabIndexes(wrapper)).toEqual(['-1', '0', '-1'])
  })
})
