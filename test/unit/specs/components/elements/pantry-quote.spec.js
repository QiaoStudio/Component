import { shallowMount } from 'dp-test'
import ComQuote from 'components/elements/quote'
import _ from 'lodash'
describe('elements/quote', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComQuote, _.merge({
    }, options || {}))
  }

  beforeEach(() => {
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
  })
  it('content should be the same as slot passed', () => {
    wrapper = createWrapper({
      slots: {
        default: '“Always compare between different policies to see if the coverage is right for what you’re doing.”'
      }
    })
    expect(wrapper.find('.dp-quote__content').text()).toBe('“Always compare between different policies to see if the coverage is right for what you’re doing.”')
  })

  it('when prop type is pull, class will be added dp-quote--pull', () => {
    wrapper = createWrapper({
      propsData: {
        type: 'pull'
      }
    })
    expect(wrapper.classes()).toContain('dp-quote')
    expect(wrapper.classes()).toContain('dp-quote--pull')
  })

  it('when prop type is not passed, class will only be dp-quote', () => {
    expect(wrapper.classes()).toContain('dp-quote')
    expect(wrapper.classes()).not.toContain('dp-quote--pull')
  })
})
