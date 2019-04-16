import { shallowMount, createLocalVue } from 'dp-test'
import DatePicker from 'elements/date-picker/date-picker.vue'
import DatePickerDeskTop from 'elements/date-picker/date-picker-desktop.vue'
import DatePickerMobile from 'elements/date-picker/date-picker-mobile.vue'
import sinon from 'sinon'
import _ from 'lodash'
describe('elements/date picker', () => {
  let wrapper
  let sanbox
  let localVue = createLocalVue()

  beforeEach(() => {
    sanbox = sinon.createSandbox()
  })

  function generateWrapper(options) {
    return shallowMount(DatePicker, _.merge({
      propsData: {
        label: 'Date'
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })
  it('components should be shown correct when mode is single in desktop', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'single'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return false
          },
          resize: true
        }
      }
    })
    expect(wrapper.find('.dp-field__area input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('.dp-field__area input[type="date"]').exists()).toBe(false)
  })
  it('components should be shown correct when mode is single in mobile', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'single'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    expect(wrapper.find('.dp-field__area input[type="text"]').exists()).toBe(false)
    expect(wrapper.find('.dp-field__area input[type="date"]').exists()).toBe(true)
  })
  it('components should be shown correct when mode is range in desktop', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return false
          },
          resize: true
        }
      }
    })
    expect(wrapper.find('.dp-field__area input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('.dp-field__area input[type="date"]').exists()).toBe(false)
  })
  it('components should be shown correct when mode is range in mobile', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    expect(wrapper.find('.dp-field__area input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('.dp-field__area input[type="date"]').exists()).toBe(false)
  })
  it('inputing should correct in desktop', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return false
          }
        }
      }
    })
    wrapper.vm.focus()
    expect(wrapper.vm.inputing).toBe(true)
    wrapper.vm.blur()
    expect(wrapper.vm.inputing).toBe(false)
  })
  it('inputing should correct in mobile', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return true
          }
        }
      }
    })
    wrapper.vm.focus()
    expect(wrapper.vm.inputing).toBe(true)
    wrapper.vm.blur()
    expect(wrapper.vm.inputing).toBe(false)
  })
  it('displayValue should correct in disktop when mode is single', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'single',
        value: '2018-03-01'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return false
          },
          resize: true
        }
      }
    })
    expect(wrapper.find(DatePickerDeskTop).exists()).toBe(true)
    expect(wrapper.vm.value).toBe('2018-03-01')

    expect(wrapper.find(DatePickerDeskTop).props().value).toEqual('2018-03-01')
    wrapper.setProps({
      value: '2018-03-03'
    })
    expect(wrapper.find(DatePickerDeskTop).props().value).toEqual('2018-03-03')
  })
  it('displayValue should correct in mobile when mode is single', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'single',
        value: '2018-03-02'
      },
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    expect(wrapper.find(DatePickerMobile).exists()).toBe(true)
    expect(wrapper.vm.value).toBe('2018-03-02')

    expect(wrapper.find(DatePickerMobile).props().value).toEqual('2018-03-02')
    wrapper.setProps({
      value: '2018-03-03'
    })
    expect(wrapper.find(DatePickerMobile).props().value).toEqual('2018-03-03')
  })
  it('displayValue should correct in disktop when mode is range', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range',
        value: {
          start: '2018-03-01',
          end: '2018-03-02'
        }
      },
      mocks: {
        $screen: {
          smallScreen() {
            return false
          },
          resize: true
        }
      }
    })
    expect(wrapper.find(DatePickerDeskTop).exists()).toBe(true)
    expect(wrapper.vm.value).toEqual({'end': '2018-03-02', 'start': '2018-03-01'})
  })
  it('displayValue should correct in mobile when mode is range', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        mode: 'range',
        value: {
          start: '2018-03-02',
          end: '2018-03-03'
        }
      },
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    expect(wrapper.find(DatePickerMobile).exists()).toBe(true)
    expect(wrapper.vm.value).toEqual({'end': '2018-03-03', 'start': '2018-03-02'})
  })
  // it('focus and blur stayle should correct in desktop', () => {
  //   wrapper = shallowMount(DatePicker, {
  //     mocks: {
  //       $screen: {
  //         smallScreen() {
  //           return false
  //         }
  //       }
  //     }
  //   })
  //   wrapper.find('.dp-field__area input').trigger('focus')
  //   expect(wrapper.find('.dp-field__datepicker').classes()).toContain('focus')
  //   wrapper.find('.dp-field__area input').trigger('blur')
  //   expect(wrapper.find('.dp-field__datepicker').classes()).not.toContain('focus')
  // })
  // it('focus and blur stayle should correct in mobile', () => {
  //   wrapper = shallowMount(DatePicker, {
  //     mocks: {
  //       $screen: {
  //         smallScreen() {
  //           return true
  //         }
  //       }
  //     }
  //   })
  //   wrapper.find('.dp-field__area input').trigger('focus')
  //   expect(wrapper.find('.dp-field__datepicker').classes()).toContain('focus')
  //   wrapper.find('.dp-field__area input').trigger('blur')
  //   expect(wrapper.find('.dp-field__datepicker').classes()).not.toContain('focus')
  // })
  it('error stayle and error message should correct when errorStatus is not null', () => {
    wrapper = generateWrapper({localVue})
    wrapper.setProps({
      errorStatus: true,
      message: 'error message'
    })
    expect(wrapper.find('.dp-field__datepicker').classes()).toContain('error')
    expect(wrapper.find('.dp-field__invalid').text()).toBe('error message')
    wrapper.setProps({
      errorStatus: false
    })
    expect(wrapper.find('.dp-field__datepicker').classes()).not.toContain('error')
  })
  it('disabled stayle should correct when isDisabled is not null', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.find('.dp-field__datepicker').classes()).toContain('disabled')
  })
  it('disabled stayle should correct when isDisabled is null', () => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        disabled: false
      }
    })
    expect(wrapper.find('.dp-field__datepicker').classes()).not.toContain('disabled')
  })
  it('dateInput should be fire in desktop', () => {
    wrapper = shallowMount(DatePickerDeskTop)
    wrapper.vm.dateInput('2018-09-10')
    expect(wrapper.emitted('dateInput')).toBeTruthy()
  })
  it('dateInput should be fire in mobile ', () => {
    wrapper = shallowMount(DatePickerMobile, {
      mode: 'single'
    })
    wrapper.vm.dateInput('2018-09-10')
    expect(wrapper.emitted('dateInput')).toBeTruthy()
    wrapper.setProps({
      mode: 'range'
    })
    wrapper.vm.dateInput('2018-09-10')
    expect(wrapper.emitted('dateInput')).toBeTruthy()
  })
  it('when focus , emit focus', () => {
    wrapper = shallowMount(DatePickerMobile, {
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    wrapper.vm.focus()
    expect(wrapper.emitted().focus).toBeTruthy()
  })
  it('when blur , emit blur', () => {
    wrapper = shallowMount(DatePickerMobile, {
      mocks: {
        $screen: {
          smallScreen() {
            return true
          },
          resize: true
        }
      }
    })
    wrapper.vm.blur()
    expect(wrapper.emitted().blur).toBeTruthy()
  })
})
