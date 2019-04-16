import {
  shallowMount
} from 'dp-test'

import ComBreadcrumbs from 'components/elements/breadcrumbs/src/breadcrumbs.vue'

describe('elements/Breadcrumbs', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComBreadcrumbs, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when nothing is set, breadcrumbs should show nothing', () => {
    wrapper = createWrapper({
      propsData: {
      }
    })
    expect(wrapper.find('.dp-breadcrumbs').text()).toBe('')
  })

  it('when level array is empty, breadcrumbs should show nothing', () => {
    wrapper = createWrapper({
      propsData: {
        levels: []
      }
    })
    expect(wrapper.find('.dp-breadcrumbs').text()).toBe('')
  })

  it('when all properties are set and levelToBeDisplayed is set to all then breadcrumbs should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        levels: [
          {
            text: 'Blog',
            link: 'https://www.xxxxxx.com'
          },
          {
            text: 'Budgeting',
            link: 'https://www.xxxxxx.com'
          },
          {
            text: '8 Tips to Save Money Everyday',
            link: 'https://www.xxxxxx.com'
          }
        ]
      }
    })
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(0).text()).toBe('Blog')
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(1).text()).toBe('Budgeting')
    expect(wrapper.find('.dp-breadcrumbs .dp-breadcrumbs__text').text()).toBe('8 Tips to Save Money Everyday')
    expect(wrapper.findAll('.dp-breadcrumbs .fa-angle-right').at(0).exists()).toBeTruthy()
    expect(wrapper.findAll('.dp-breadcrumbs .fa-angle-right').at(1).exists()).toBeTruthy()
  })

  it('when all levels are set to not visible then breadcrumbs should still show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        levels: [
          {
            text: 'Blog',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          },
          {
            text: 'Budgeting',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          },
          {
            text: '8 Tips to Save Money Everyday',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          }
        ]
      }
    })
    expect(wrapper.find('.dp-breadcrumbs').text()).toBe('')
  })

  it('when all properties are set and all levels are visible then breadcrumbs should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        levels: [
          {
            text: 'Blog',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          },
          {
            text: 'Budgeting',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          },
          {
            text: '8 Tips to Save Money Everyday',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          }
        ]
      }
    })
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(0).text()).toBe('Blog')
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(1).text()).toBe('Budgeting')
    expect(wrapper.find('.dp-breadcrumbs .dp-breadcrumbs__text').exists()).toBeTruthy()
    expect(wrapper.findAll('.dp-breadcrumbs .fa-angle-right').at(0).exists()).toBeTruthy()
  })

  it('when only level 1 and 2 are visible then breadcrumbs should still show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        levels: [
          {
            text: 'Blog',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          },
          {
            text: 'Budgeting',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          },
          {
            text: '8 Tips to Save Money Everyday',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          }
        ],
        levelToBeDisplayed: ['1', '2', '4']
      }
    })
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(0).text()).toBe('Blog')
    expect(wrapper.findAll('.dp-breadcrumbs .dp-breadcrumbs__link').at(1).text()).toBe('Budgeting')
    expect(wrapper.find('.dp-breadcrumbs .dp-breadcrumbs__text').exists()).toBeFalsy()
    expect(wrapper.findAll('.dp-breadcrumbs .fa-angle-right').at(0).exists()).toBeTruthy()
  })

  it('when all properties are set and only level 2 is visible then breadcrumbs should show correctly', () => {
    wrapper = createWrapper({
      propsData: {
        levels: [
          {
            text: 'Blog',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          },
          {
            text: 'Budgeting',
            link: 'https://www.xxxxxx.com',
            isVisible: true
          },
          {
            text: '8 Tips to Save Money Everyday',
            link: 'https://www.xxxxxx.com',
            isVisible: false
          }
        ]
      }
    })
    expect(wrapper.find('.dp-breadcrumbs .dp-breadcrumbs__text').exists()).toBeFalsy()
  })
})
