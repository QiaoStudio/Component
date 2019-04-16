import {
  shallowMount
} from 'dp-test'
import ComButton from 'components/elements/button/button.vue'
import ComLabel from 'components/elements/label/label.vue'
import ComAnnouncement from 'components/modules/announcement/announcement.vue'
import ComPanel from 'components/modules/panel/panel.vue'

describe('modules/Com Panel', () => {
  let wrapper

  function generateWrapper(options) {
    return shallowMount(ComPanel, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when panel is linked, linked class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        panelLinked: 'http://google.com',
        panelTarget: true
      }
    })
    expect(wrapper.classes()).toContain('dp-panel--linked')
    expect(wrapper.find('.dp-panel__wrapper').attributes().href).toBe('http://google.com')
    expect(wrapper.find('.dp-panel__wrapper').attributes().target).toBe('_blank')
  })

  it('when panel title is set, panel should display correct panel title text', () => {
    wrapper = generateWrapper({
      propsData: {
        panelTitle: 'Hello, World!'
      }
    })
    expect(wrapper.find('.dp-panel__title .dp-title').text()).toBe('Hello, World!')
  })

  it('when panel title alignment is set, panel should use correct panel title alignment', () => {
    wrapper = generateWrapper({
      propsData: {
        panelTitle: 'Hello, World!',
        panelTitleAlign: 'right'
      }
    })
    expect(wrapper.find('.dp-panel__title').classes()).toContain('text-right')
  })

  it('when panel icon is set then panel should display panel icon', () => {
    wrapper = generateWrapper({
      propsData: {
        panelIcon: 'https://picsum.photos/g/125/40'
      }
    })
    expect(wrapper.find('.dp-panel__icon')).not.toBe(null)
    expect(wrapper.find('.dp-panel__icon img').attributes().src).toBe('https://picsum.photos/g/125/40')
  })

  it('when panel icon alignment is set, panel should use correct panel icon alignment', () => {
    wrapper = generateWrapper({
      propsData: {
        panelIcon: 'https://picsum.photos/g/125/40',
        panelIconAlign: 'left'
      }
    })
    expect(wrapper.find('.dp-panel__icon').classes()).toContain('text-left')
  })

  it('when panel image is set, panel should display panel image', () => {
    wrapper = generateWrapper({
      propsData: {
        panelImage: 'https://picsum.photos/696/400'
      }
    })
    expect(wrapper.find('.dp-panel__image')).not.toBe(null)
    expect(wrapper.find('.dp-panel__image').attributes().style).toBe('background-image: url(https://picsum.photos/696/400);')
  })

  it('when panel image width is set, panel should use correct panel image width', () => {
    wrapper = generateWrapper({
      propsData: {
        panelImage: 'https://picsum.photos/696/400',
        isImageFullWidth: true
      }
    })
    expect(wrapper.find('.dp-panel__image').classes()).toContain('dp-panel__image--full-width')
  })

  it('when panel subtitle is set, panel should display correct panel subtitle text', () => {
    wrapper = generateWrapper({
      propsData: {
        panelSubtitle: 'Aloha!'
      }
    })
    expect(wrapper.find('.dp-panel__subtitle span').text()).toBe('Aloha!')
  })

  it('when panel subtitle alignment is set, panel should use correct panel subtitle alignment', () => {
    wrapper = generateWrapper({
      propsData: {
        panelSubtitle: 'Aloha!',
        panelSubtitleAlign: 'right'
      }
    })
    expect(wrapper.find('.dp-panel__subtitle').classes()).toContain('text-right')
  })

  it('when panel main title is set, panel should display correct panel main title text', () => {
    wrapper = generateWrapper({
      propsData: {
        panelMaintitle: 'Hey, Thanos is here'
      }
    })
    expect(wrapper.find('.dp-panel__maintitle .dp-title').text()).toBe('Hey, Thanos is here')
  })

  it('when panel main title alignment is set, panel should use correct panel main title alignment', () => {
    wrapper = generateWrapper({
      propsData: {
        panelMaintitle: 'Hey, Thanos is here',
        panelMaintitleAlign: 'right'
      }
    })
    expect(wrapper.find('.dp-panel__maintitle').classes()).toContain('text-right')
  })

  it('when panel announcement is enabled, panel should display panel announcement', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true
      }
    })
    expect(wrapper.find('.dp-panel__announcement')).not.toBe(null)
  })

  it('when panel announcement alignment is set, panel should use correct panel announcement alignment', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementAlign: 'right'
      }
    })
    expect(wrapper.find('.dp-panel__announcement').classes()).toContain('text-right')
  })

  it('when panel announcement label is set, panel should display correct panel announcement label text', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementLabelText: 'Free'
      },
      stubs: {
        'dp-label': ComLabel,
        'dp-announcement': ComAnnouncement
      }
    })
    expect(wrapper.find('.dp-panel__announcement .dp-label small').text()).toBe('Free')
  })

  it('when panel announcement label color is set, panel should use correct panel announcement label color', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementLabelText: 'Free',
        announcementLabelColor: 'dp-label--gray'
      },
      stubs: {
        'dp-label': ComLabel,
        'dp-announcement': ComAnnouncement
      }
    })
    expect(wrapper.find('.dp-panel__announcement .dp-label').classes()).toContain('dp-label--gray')
  })

  it('when panel announcement label size is set, panel should use correct panel announcement label size', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementLabelText: 'Free',
        announcementLabelSize: 'dp-label--md'
      },
      stubs: {
        'dp-label': ComLabel,
        'dp-announcement': ComAnnouncement
      }
    })
    expect(wrapper.find('.dp-panel__announcement .dp-label').classes()).toContain('dp-label--md')
  })

  it('when panel announcement content is set, panel should display correct panel announcement content', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementLabelText: 'Free',
        announcementContent: 'Wow! much free!'
      },
      stubs: {
        'dp-label': ComLabel,
        'dp-announcement': ComAnnouncement
      }
    })
    expect(wrapper.find('.dp-announcement__content').text()).toBe('Wow! much free!')
  })

  it('when panel announcement is linked, panel announcement should be clickable', () => {
    wrapper = generateWrapper({
      propsData: {
        isAnnouncementEnabled: true,
        announcementLabelText: 'Free',
        announcementContent: 'Wow! much free!',
        announcementLinked: 'http://google.com',
        announcementTarget: true
      },
      stubs: {
        'dp-label': ComLabel,
        'dp-announcement': ComAnnouncement
      }
    })
    expect(wrapper.find('.dp-announcement').classes()).toContain('dp-announcement--linked')
    expect(wrapper.find('.dp-announcement a').attributes().href).toBe('http://google.com')
    expect(wrapper.find('.dp-announcement a').attributes().target).toBe('_blank')
  })

  it('when panel body is set, panel should display correct panel body', () => {
    wrapper = generateWrapper({
      propsData: {
        panelBody: 'Huehuehuehuehue!'
      }
    })
    expect(wrapper.find('.dp-panel__body').text()).toBe('Huehuehuehuehue!')
  })

  it('when panel button text is set, panel should display correct panel button text and should not nest block elements', () => {
    wrapper = generateWrapper({
      propsData: {
        buttonLinked: 'http://google.com',
        buttonText: 'Submit'
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when not pass right value of buttonText,should validate it right', () => {
    const buttonText = wrapper.vm.$options.props.buttonText
    expect(buttonText.type).toBe(String)
    expect(typeof buttonText.validator).toBe('function')
    expect(buttonText.validator('div')).toBeTruthy()
    expect(buttonText.validator('<div class="div">hello</div>')).toBeFalsy()
    expect(buttonText.validator('hello,<p id="ip" class="what">how are you</p>')).toBeFalsy()
    expect(buttonText.validator('<a name="a" href="#">text link</a> lalal')).toBeFalsy()
    expect(buttonText.validator('test<ul class="test"><li>test</li></ul>test')).toBeFalsy()
    expect(buttonText.validator('test<ol><li>test</li></ol>')).toBeFalsy()
    expect(buttonText.validator('test<hr>test')).toBeFalsy()
    expect(buttonText.validator('test<h1 title="xxxxxx">test</h1>test')).toBeFalsy()
    expect(buttonText.validator('test<h2 title="xxxxxx">test</h2>test')).toBeFalsy()
    expect(buttonText.validator('test<h3 title="xxxxxx" class="title>test</h3>test')).toBeFalsy()
    expect(buttonText.validator('test<h4 title="xxxxxx">test</h4>test')).toBeFalsy()
    expect(buttonText.validator('test<h5 title="xxxxxx">test</h5>test')).toBeFalsy()
    expect(buttonText.validator('test<h6 title="xxxxxx">test</h6>test')).toBeFalsy()
  })

  it('when panel button type is set, panel should display correct panel button type', () => {
    wrapper = generateWrapper({
      propsData: {
        buttonLinked: 'http://google.com',
        buttonText: 'Submit',
        buttonType: 'dp-button--ghost-primary'
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    expect(wrapper.find('.dp-panel__cta .dp-button').classes()).toContain('dp-button--ghost-primary')
  })

  it('when panel button size is set, panel should display correct panel button size', () => {
    wrapper = generateWrapper({
      propsData: {
        buttonLinked: 'http://google.com',
        buttonText: 'Submit',
        buttonSize: 'dp-button--sm'
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    expect(wrapper.find('.dp-panel__cta .dp-button').classes()).toContain('dp-button--sm')
  })

  it('when panel button is block, panel button block class should exist', () => {
    wrapper = generateWrapper({
      propsData: {
        buttonLinked: 'http://google.com',
        buttonText: 'Submit',
        isButtonBlock: true
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    expect(wrapper.find('.dp-panel__cta .dp-button').classes()).toContain('dp-button--block')
  })

  it('when panel button is disabled, panel button should be disabled', () => {
    wrapper = generateWrapper({
      propsData: {
        buttonLinked: 'http://google.com',
        buttonText: 'Submit',
        isButtonDisabled: true
      },
      stubs: {
        'dp-button': ComButton
      }
    })
    expect(wrapper.find('.dp-panel__cta .dp-button').classes()).toContain('disabled')
  })
})
