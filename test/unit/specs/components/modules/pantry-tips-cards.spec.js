import sinon from 'sinon'
import {
  shallowMount
} from 'dp-test'
import ComTipsCard from 'components/modules/tips-card/tips-card.vue'
import TipsCardFooter from 'components/modules/tips-card/tips-card-footer.vue'
import ComButton from 'elements/button/button.vue'

describe('modules/Com Tips card', () => {
  let wrapper
  let sandbox

  function generateWrapper(options) {
    return shallowMount(ComTipsCard, options)
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    wrapper.destroy()
    sandbox.restore()
  })

  it('component should determine single mode correctly', () => {
    const content = 'This is a single mode tip'
    wrapper = generateWrapper({
      propsData: {
        content,
        imageUrl: 'google.com',
        alternateText: 'logo'
      }
    })
    expect(wrapper.vm.isSingleTip).toBe(true)
    expect(wrapper.vm.contentLength).toBe(1)
    expect(wrapper.vm.tipsContent).toEqual(content)
    expect(wrapper.find('img').attributes().alt).toEqual('logo')
  })

  describe('Multiple page tips card', () => {
    const content = ['Page 1', 'Page 2']

    beforeEach(() => {
      wrapper = generateWrapper({
        propsData: {
          content,
          imageUrl: 'google.com'
        },
        stubs: {
          'dp-button': ComButton,
          'dp-tips-card-footer': TipsCardFooter
        }
      })
    })

    it('component should determine multi mode correctly', () => {
      expect(wrapper.vm.isSingleTip).toBe(false)
      expect(wrapper.vm.contentLength).toBe(content.length)
      expect(wrapper.vm.tipsContent).toEqual(content[0])
    })

    it('component should determine button text correctly', (done) => {
      const { vm } = wrapper
      wrapper.find('.dp-button').trigger('click')

      setTimeout(() => {
        expect(vm.nextButtonText).toEqual(vm.lastStepText)
        done()
      }, 1000)
    })

    it('method: goToNextPage', () => {
      const { vm } = wrapper
      vm.changePage = sandbox.stub()
      wrapper.find('.dp-button').trigger('click')
      expect(vm.changePage.calledWith('next', 1)).toBe(true)
    })

    it('method: goToPreviousPage should trigger change page with right args', () => {
      const { vm } = wrapper
      vm.changePage = sandbox.stub()
      vm.goToPreviousPage()
      expect(vm.changePage.calledWith('previous', -1)).toBe(true)
    })

    it('method: runActions', (done) => {
      const { vm } = wrapper
      const currentMethod = sandbox.stub()
      const futureMethod = sandbox.stub()
      vm.runActions({
        current: currentMethod,
        future: [
          {
            action: futureMethod,
            time: 0
          },
          {
            action: futureMethod,
            time: 0
          }
        ]
      })

      expect(currentMethod.called).toBe(true)
      expect(futureMethod.called).toBe(false)
      setTimeout(() => {
        expect(futureMethod.called).toBe(true)
        expect(futureMethod.calledTwice).toBe(true)
        done()
      }, 1000)
    })
  })
})
