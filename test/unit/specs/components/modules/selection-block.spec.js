import { shallowMount, mount } from 'dp-test'
import SelectionBlock from 'components/modules/selection-block/selection-block.vue'

describe('modules/Selection Block', () => {
  const IMAGE_CLASS = '.dp-selection-block__image'
  const TEXT_CLASS = '.dp-selection-block__text'

  it('when selection block image url is set, an image should be rendered', () => {
    const wrapper = shallowMount(SelectionBlock, {
      propsData: {
        imageUrl: 'http://test.com/1.jpg'
      }
    })
    expect(wrapper.contains(IMAGE_CLASS)).toBeTruthy()
    expect(wrapper.contains(TEXT_CLASS)).toBeFalsy()
  })

  it('when selection block text is set, it should render text content', () => {
    const textContent = 'content'
    const wrapper = shallowMount(SelectionBlock, {
      propsData: {
        imageUrl: '',
        text: textContent
      }
    })
    const textWrapper = wrapper.find(TEXT_CLASS)

    expect(wrapper.contains(IMAGE_CLASS)).toBeFalsy()
    expect(textWrapper.isEmpty()).toBeFalsy()
    expect(textWrapper.text()).toBe(textContent)
  })

  it('when selected is enable, selection block should set selected class', () => {
    const wrapper = mount(SelectionBlock, {
      propsData: {
        text: 'test',
        selected: true
      }
    })

    expect(wrapper.classes().includes('selected')).toBeTruthy()
  })

  describe('layout prop', () => {
    it('when layout is empty, selection block should set default class', () => {
      const wrapper = shallowMount(SelectionBlock, {
        propsData: {
          text: 'test'
        }
      })

      expect(wrapper.contains('.dp-selection-block--default')).toBeTruthy()
    })

    it('when layout is set, selection block should set approriate class', () => {
      const wrapper = shallowMount(SelectionBlock, {
        propsData: {
          text: 'test',
          layout: 'horizontal'
        }
      })

      expect(wrapper.contains('.dp-selection-block--horizontal')).toBeTruthy()
    })
  })
})
