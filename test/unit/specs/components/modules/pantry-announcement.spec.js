import {
  shallowMount
} from 'dp-test'
import ComLabel from 'components/elements/label/label.vue'
import ComAnnouncement from 'components/modules/announcement/announcement.vue'

describe('modules/Com Announcement', () => {
  let wrapper

  function generateWrapper(options) {
    return shallowMount(ComAnnouncement, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when content text is set, content text should be shown', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New Label',
        content: 'Hey!'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__content').text()).toBe('Hey!')
  })

  it('when announcement is linked, announcement linked class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New Label',
        content: 'Hey!',
        isLinked: 'http://google.com'
        // target: false,
        // isInverse: false
      }
    })
    expect(wrapper.classes()).toContain('dp-announcement--linked')
  })

  it('when announcement is inversed, announcement inversed class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New Label',
        content: 'Hey!',
        isInverse: true
      }
    })
    expect(wrapper.classes()).toContain('dp-announcement--inverse')
  })

  it('when announcement target is, announcement target should be blank', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New Label',
        content: 'Hey!',
        isLinked: 'http://google.com',
        target: true
      }
    })
    expect(wrapper.find('a').attributes().target).toBe('_blank')
  })

  it('when label text is set, label text should be shown', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New Label'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label small').text()).toBe('New Label')
  })

  it('when red label is set, red class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New',
        labelColor: 'dp-label--red'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label').classes()).toContain('dp-label--red')
  })

  it('when orange label is set, orange class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New',
        labelColor: 'dp-label--orange'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label').classes()).toContain('dp-label--orange')
  })

  it('when gray label is set, gray class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New',
        labelColor: 'dp-label--gray'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label').classes()).toContain('dp-label--gray')
  })

  it('when medium label is set, medium class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New',
        labelSize: 'dp-label--md'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label').classes()).toContain('dp-label--md')
  })

  it('when large label is set, large class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        labelText: 'New',
        labelSize: 'dp-label--lg'
      },
      stubs: {
        'dp-label': ComLabel
      }
    })
    expect(wrapper.find('.dp-announcement__label').classes()).toContain('dp-label--lg')
  })
})
