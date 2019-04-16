import {
  shallowMount
} from 'dp-test'
import ComUpdateInfo from 'components/elements/update-info/update-info.vue'

describe('elements/Update Info', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComUpdateInfo, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('Update Info component should render right prop content', () => {
    const testContent = 'Design Com Update Info'
    wrapper = createWrapper({
      propsData: {
        content: testContent
      }
    })

    expect(wrapper.find('.dp-update-info__content').text()).toEqual(testContent)
  })

  it('Update Info component should render exact element', () => {
    wrapper = createWrapper()
    const spanElements = wrapper.findAll('span')
    const horizontalLines = wrapper.findAll('.dp-update-info__line')

    expect(spanElements.length).toEqual(3)
    expect(horizontalLines.length).toEqual(2)
  })
})
