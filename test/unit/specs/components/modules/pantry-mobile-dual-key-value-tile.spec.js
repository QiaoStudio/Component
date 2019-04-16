import {
  shallowMount
} from 'dp-test'
import _ from 'lodash'
import ComMobileDualKeyValueTile from 'components/modules/mobile-dual-key-value-tile/mobile-dual-key-value-tile.vue'

describe('modules/Mobile Dual Key Value Tile', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComMobileDualKeyValueTile, _.merge({
      propsData: {
        insurerLogo: 'https://picsum.photos/62',
        insurerName: 'PRUDENTIAL',
        planName: 'Phú Đăng Khoa Thành Tài',
        maxLogoWidth: '',
        maxLogoHeight: '',
        valueFrom1: 200,
        valueTo1: 300,
        asteriskVisible1: true,
        valueFrom2: 200,
        valueTo2: 300,
        asteriskVisible2: true
      }
    }, options || {}))
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when exclusive message visibility is set to false then it should not show', () => {
    wrapper = createWrapper({
      propsData: {
        exclusiveMessage: {
          visible: false,
          content: 'Available only on GoBear'
        }
      }
    })
    expect(wrapper.find('.dp-mobile-dual-key-value-tile__exclusive').isVisible()).toBeFalsy()
  })

  it('when exclusive message visibility is set to true then it should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        exclusiveMessage: {
          visible: true,
          content: 'Available only on GoBear'
        }
      }
    })
    expect(wrapper.find('.dp-mobile-dual-key-value-tile__exclusive').isVisible()).toBeTruthy()
  })

  it('when exclusive message is not set to true then it should show still', () => {
    wrapper.setProps({
      exclusiveMessage: {}
    })
    expect(wrapper.find('.dp-mobile-dual-key-value-tile__exclusive').isVisible()).toBeTruthy()
  })

  it('when promotion visibility is set to true then it should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        promotion: {
          visible: true,
          summary: '50% rebate on first year premium',
          actionLabel: ''
        }
      }
    })
    expect(wrapper.find('.dp-mobile-dual-key-value-tile__promotion').isVisible()).toBeTruthy()
  })
})
