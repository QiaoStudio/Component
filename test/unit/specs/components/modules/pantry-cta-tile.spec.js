import {
  shallowMount
} from 'dp-test'
import ComCtaTile from 'components/modules/cta-tile/cta-tile.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('/modules/cta-tile', () => {
  let wrapper
  let sanbox
  function generateWrapper(options) {
    return shallowMount(ComCtaTile, _.merge({
      propsData: {
        title: '',
        caption: ''
      }
    }, {} || options))
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = generateWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('when pass all properties, should render correctly', () => {
    wrapper.setProps({
      title: 'Compare the best shopping and grocery credit cards on GoBear',
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus vehicula ante in dignissim.'
    })
    expect(wrapper.find('.dp-cta-tile .dp-cta-tile__text-container__title span').text()).toBe('Compare the best shopping and grocery credit cards on GoBear')
    expect(wrapper.find('.dp-cta-tile .dp-cta-tile__text-container__caption__text').text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus vehicula ante in dignissim.')
  })
})
