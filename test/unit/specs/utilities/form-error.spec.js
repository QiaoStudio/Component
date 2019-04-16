import FormError from 'src/utilities/mixins/form-error.js'
import { shallowMount } from 'dp-test'
import _ from 'lodash'

describe('src/components/src/utilities/mixins/form-error.js', () => {
  let wrapper

  let createWrapper = function(options) {
    return shallowMount(_.merge({
      template: '<div></div>',
      data() {
        return {
          errorStatus: false
        }
      },
      mixins: [FormError]
    }, options || {}))
  }

  it('when errorStyle is popover, isPopoverError should be true', () => {
    wrapper = createWrapper()
    wrapper.setProps({errorStyle: 'popover'})
    expect(wrapper.vm.isPopoverError).toBe(true)
  })

  it('when errorStyle is empty, isPopoverError should be false', () => {
    wrapper = createWrapper()
    expect(wrapper.vm.isPopoverError).toBe(false)
  })
})
