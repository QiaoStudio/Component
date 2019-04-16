import {
  shallowMount
} from 'dp-test'
import ComTable from 'components/elements/table/table.vue'
import _ from 'lodash'

describe('elements/Table', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComTable, _.merge({
      propsData: {
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when no data is set then table should show nothing', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.dp-table th').exists()).toBeFalsy()
    expect(wrapper.find('.dp-table td').exists()).toBeFalsy()
    expect(wrapper.find('.dp-table .dp-table--default-header').exists()).toBeTruthy()
    expect(wrapper.find('.dp-table .dp-table--left-header').exists()).toBeFalsy()
  })

  it('when all data is set, table should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        tableStyle: 'dp-table__secondary-simple',
        headerStyle: 'top',
        headers: [
          {
            fieldName: 'creditCard',
            label: 'Credit card'
          },
          {
            fieldName: 'cashBack',
            label: 'Cash back card'
          }
        ],
        data: [
          {
            creditCard: 'Citi Cash Back Card'
          }
        ]
      }
    })
    expect(wrapper.findAll('.dp-table th').at(0).text()).toBe('Credit card')
    expect(wrapper.findAll('.dp-table td').at(0).text()).toBe('Citi Cash Back Card')
    expect(wrapper.find('.dp-table .dp-table--default-header').exists()).toBeTruthy()
  })
})
