import {
  shallowMount
} from 'dp-test'

import ComProgressBar from 'components/elements/progress-bar/src/progress-bar.vue'

describe('elements/Progress Bar', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComProgressBar, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when percent is set then percent nunber should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        percent: 49
      }
    })
    expect(wrapper.find('.dp-progress-bar__number').text()).toBe('49%')
  })

  it('should render progress bar in the correct height when height is set', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-progress-bar__percent-bar').attributes().style).toMatch(/height: 6px/)
    wrapper.setProps({
      height: 10
    })
    expect(wrapper.find('.dp-progress-bar__percent-bar').attributes().style).toMatch(/height: 10px/)
    wrapper.setProps({
      height: 8.5
    })
    expect(wrapper.find('.dp-progress-bar__percent-bar').attributes().style).toMatch(/height: 8.5px/)
  })

  it('when percent is set then percent bar should show have correct width', () => {
    wrapper = createWrapper({
      propsData: {
        percent: 79
      }
    })
    expect(wrapper.find('.dp-progress-bar__percent-bar').attributes().style).toMatch(/width: 79%;/)
  })

  it('when percent is 0, then the width should equals to bar height', () => {
    wrapper = createWrapper({
      propsData: {
        percent: 0
      }
    })
    expect(wrapper.find('.dp-progress-bar__percent-bar').attributes().style).toMatch(/width: 6px;/)
  })

  it('when percent is set more than 100, then percent nunber should show 100%', () => {
    wrapper = createWrapper({
      propsData: {
        percent: 111
      }
    })
    expect(wrapper.find('.dp-progress-bar__number').text()).toBe('100%')
  })

  it('when percent is set less than 0, then percent nunber should show 0%', () => {
    wrapper = createWrapper({
      propsData: {
        percent: -1
      }
    })
    expect(wrapper.find('.dp-progress-bar__number').text()).toBe('0%')
  })

  it('when indicator on desktop is set to false, then indicator should hide', () => {
    wrapper = createWrapper({
      propsData: {
        indicatorOnDesktop: false
      }
    })
    expect(wrapper.find('.dp-progress-bar__description--desktop').exists()).toBe(true)
  })

  it('when indicator on mobile is set to false, then indicator should hide', () => {
    wrapper = createWrapper({
      propsData: {
        indicatorOnMobile: false
      }
    })
    expect(wrapper.find('.dp-progress-bar__description--mobile').exists()).toBe(true)
  })
})
