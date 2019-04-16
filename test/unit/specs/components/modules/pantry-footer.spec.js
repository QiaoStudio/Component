import {
  shallowMount
} from 'dp-test'
import ComFooter from 'components/modules/footer/footer.vue'

describe('modules/Com Footer', () => {
  let wrapper
  const links = [
    {
      'columnClass': 'col-lg-2',
      'title': 'GoBear',
      'items': [
        {
          'columnClass': 'col-sm-12',
          'title': 'About us',
          'url': '/sg/about-us'
        }
      ]
    }
  ]
  const socialMedia = {
    'title': 'Follow',
    'items': [
      {
        'icon': 'facebook',
        'url': 'https://www.facebook.com/GoBearSG'
      },
      {
        'icon': 'twitter',
        'url': 'https://twitter.com/xxxxxxsg'
      }
    ]
  }
  const countries = [
    {
      'name': 'hk',
      'url': '/hk'
    }
  ]
  const policyLinks = [
    {
      'title': 'Terms',
      'url': '/sg/terms-and-conditions'
    }
  ]

  function generateWrapper(options) {
    return shallowMount(ComFooter, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when footer is set, footer should be shown', () => {
    wrapper = generateWrapper({
      propsData: {
        links: links,
        socialMedia: socialMedia,
        countries: countries,
        copyright: '© 2019 Woodpecker Asia Tech Pte. Ltd. All rights reserved.',
        policyLinks: policyLinks
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when footer links are set, footer links should be correct', () => {
    wrapper = generateWrapper({
      propsData: {
        links: links
      }
    })
    expect(wrapper.findAll('.container .row:first-child div > span').at(0).text()).toBe('GoBear')
    expect(wrapper.findAll('.container .row:first-child div ul li').length).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when footer social media is set, footer social media should be correct', () => {
    wrapper = generateWrapper({
      propsData: {
        socialMedia: socialMedia
      }
    })
    expect(wrapper.find('.dp-footer__social > span').text()).toBe('Follow')
    expect(wrapper.findAll('.dp-footer__social ul li').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when footer countries is set, footer countries should be correct', () => {
    wrapper = generateWrapper({
      propsData: {
        countries: countries
      }
    })
    expect(wrapper.findAll('.dp-footer__country ul li').length).toBe(1)
    expect(wrapper.find('.dp-footer__country ul li a').attributes().href).toBe('/hk')
    expect(wrapper.find('.dp-footer__country ul li a .dp-icon').classes()).toContain('dp-icon__country--hk')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when footer copyright is set, footer copyright should be correct', () => {
    let copyright = '© 2020 GoBear.'
    wrapper = generateWrapper({
      propsData: {
        copyright: copyright
      }
    })
    expect(wrapper.find('.dp-footer__copyright span').text()).toBe(copyright)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when footer policyLinks is set, footer policyLinks should be correct', () => {
    wrapper = generateWrapper({
      propsData: {
        policyLinks: policyLinks
      }
    })
    expect(wrapper.findAll('.dp-footer__policy ul li').length).toBe(1)
    expect(wrapper.find('.dp-footer__policy ul li a').attributes().href).toBe('/sg/terms-and-conditions')
    expect(wrapper.find('.dp-footer__policy ul li a').text()).toBe('Terms')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
