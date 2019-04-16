import Vue from 'vue'
import { stub } from 'sinon'
import { compact } from 'lodash'
import { mount, shallowMount } from 'dp-test'
import domHelper from 'utilities/dom'

import ExpandableText from 'components/elements/expandable-text/expandable-text.vue'

describe('elements/Expandable Text', () => {
  const MEASURE_EXTRA_CLASS = '.dp-expandable-text__measure-extra'

  it('when component is created, it should assign content prop to shortContent', () => {
    const content = 'content to display'
    const fontSize = 16
    const lineHeight = 20
    const wrapper = shallowMount(ExpandableText, {
      propsData: {
        content,
        fontSize,
        lineHeight
      }
    })

    const {vm} = wrapper
    expect(vm.shortContent).toEqual(content)
    expect(vm.componentStyles).toEqual({
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`
    })
  })

  describe('when component is mounted', () => {
    let getComputedStyleStub
    let onLoadStub
    const createWrapper = containerHeight => {
      return mount(ExpandableText, {
        propsData: {
          content: 'this is very long content ',
          displayLines: 3
        },
        methods: {
          getContainerHeight() {
            return containerHeight
          },
          calculateShortContent() {
            return 'abcd'
          }
        }
      })
    }

    beforeEach(() => {
      getComputedStyleStub = stub(window, 'getComputedStyle').callsFake(() => {
        return {
          getPropertyValue() {
            return 10
          }
        }
      })
      onLoadStub = stub(domHelper, 'onWindowLoad')
    })
    afterEach(() => {
      getComputedStyleStub.restore()
      onLoadStub.restore()
    })

    it('it should be call initStyle() after window loaded', () => {
      const wrapper = createWrapper(70)
      expect(onLoadStub.args).toEqual([[wrapper.vm.initStyle]])
    })

    it('it should not show Read me link for short content ', () => {
      const wrapper = createWrapper(20)
      const { vm } = wrapper

      vm.initStyle()
      expect(vm.contentStyle).toEqual({})
      expect(vm.canvasClass).toEqual('disappear')
      expect(wrapper.contains(MEASURE_EXTRA_CLASS)).toBeFalsy()
    })

    it('it should show Read me link for long content ', async () => {
      const wrapper = createWrapper(70)
      const { vm } = wrapper

      vm.initStyle()
      expect(vm.contentStyle).toEqual({
        maxHeight: '30px'
      })
      expect(vm.canvasClass).toEqual('disappear')
      expect(vm.showReadMore).toBeTruthy()
      expect(vm.shortContent).toEqual('abcd')

      await Vue.nextTick()
      expect(wrapper.contains(MEASURE_EXTRA_CLASS)).toBeTruthy()
      expect(wrapper.find('button').attributes().style)
        .toBe('font-size: 12px; line-height: 15px;')
    })

    it('button read more should has tabIndex is 0', () => {
      const wrapper = createWrapper(70)
      const {vm} = wrapper
      vm.initStyle()
      expect(vm.$refs.btnReadMore.getAttribute('tabindex')).toBe('0')
    })
  })

  it('getContainerHeight, it should return container offset height', async () => {
    const wrapper = shallowMount(ExpandableText, {
      propsData: {
        content: 'content test'
      }
    })
    const { vm } = wrapper
    vm.$refs.container = { offsetHeight: 20 }
    expect(vm.getContainerHeight()).toBe(20)
  })

  it('when user click Read more, it should show full content', async () => {
    const wrapper = shallowMount(ExpandableText, {
      propsData: {
        content: 'this is very long content',
        displayLines: 3,
        fontSize: 15,
        lineHeight: 18
      },
      methods: {
        getContainerHeight() {
          return 40
        }
      }
    })
    const { vm } = wrapper
    vm.onReadMore()
    expect(vm.showReadMore).toBeFalsy()
    expect(vm.shortContent).toBe('this is very long content')
    expect(vm.contentStyle).toEqual({
      maxHeight: '100vh',
      transition: 'max-height 200ms ease-in'
    })
  })

  it('calculateShortContent() should calculate content for number of lines to be displayed', () => {
    const wrapper = shallowMount(ExpandableText, {
      propsData: {
        content: 'content test for',
        displayLines: 2,
        readMoreText: 'Read more'
      }
    })
    const { vm } = wrapper
    const width = 10
    const font = '16px Alleyn'
    const containerStyles = {
      getPropertyValue(property) {
        return property === 'width' ? width + 5 : font
      }
    }
    vm.$refs.canvas = {
      getContext() {
        return {
          measureText(text) {
            const words = compact(text.replace('... Read more', '').split(' '))
            return { width: width * words.length }
          }
        }
      }
    }
    const shortContent = vm.calculateShortContent(containerStyles)
    expect(shortContent).toBe('content test')
  })
})
