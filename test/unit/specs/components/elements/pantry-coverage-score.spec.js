import {
  shallowMount
} from 'dp-test'
import ComCoverageScore from 'components/elements/coverage-score/coverage-score.vue'

describe('elements/Coverage Score', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComCoverageScore, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when coverage score is set, coverage score should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        score: 8,
        scoreBase: 5,
        totalScore: 10
      }
    })
    expect(wrapper.vm.scoreResult).toBe('4.0')
    expect(wrapper.find('.dp-coverage-score').text()).toBe('4.0')
  })

  it('when coverage score is set, coverage score should be keep one decimal', () => {
    wrapper = createWrapper({
      propsData: {
        score: 100,
        scoreBase: 20,
        totalScore: 30
      }
    })
    expect(wrapper.vm.scoreResult).toBe('66.7')
    expect(wrapper.find('.dp-coverage-score').text()).toBe('66.7')
  })

  it('When user click component, should emit scorePopup event', () => {
    wrapper = createWrapper()
    wrapper.trigger('click')
    expect(wrapper.emitted('score-popup')).toBeTruthy()
  })
})
