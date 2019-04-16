import {
  shallowMount
} from 'dp-test'
import ComMegamenu from 'components/elements/megamenu/megamenu.vue'
import sinon from 'sinon'
import _ from 'lodash'

describe('elements/Megamenu', () => {
  let wrapper
  let sanbox
  const columns = [{
    'title': 'Compare insurance',
    'type': 'link',
    'layout': 'two-column',
    'items': [{
      'iconType': 'product',
      'iconCategory': 'travel-insurance',
      'iconDisplay': 'dp-icon--sm-only',
      'label': 'Travel Insurance',
      'url': '/sg/travel-insurance',
      'target': ''
    },
    {
      'iconType': 'product',
      'iconCategory': 'car-insurance',
      'iconDisplay': 'dp-icon--sm-only',
      'label': 'Car Insurance',
      'url': '/sg/car-insurance',
      'target': ''
    },
    {
      'iconType': 'product',
      'iconCategory': 'health-insurance',
      'iconDisplay': 'dp-icon--sm-only',
      'label': 'Driver & Passenger\' <br>Personal Accident',
      'url': '/sg/personal-accident',
      'target': ''
    }]
  },
  {
    'title': 'Promotion',
    'type': 'article',
    'layout': '',
    'items': [{
      'imgUrl': 'https://picsum.photos/120',
      'url': '/sg/promotion',
      'title': 'Learn a bunch of stuff here',
      'description': 'Don\'t miss the exclusive campaign because you don\'t want to.',
      'target': '_self'
    }]
  }]

  function createWrapper(options) {
    let shallowOption = _.merge({
      data() {
        return {
          columns: []
        }
      }
    }, options || {})
    return shallowMount(ComMegamenu, shallowOption)
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('when megamenu has columns, megamenu should match snapshot', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when megamenu has columns, megamenu columns should be array', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(Array.isArray(wrapper.vm.columns)).toBe(true)
  })

  it('when megamenu has links, megamenu links should be array', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(Array.isArray(wrapper.vm.columns[0].items)).toBe(true)
  })

  it('when megamenu has article, megamenu article should be array', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(Array.isArray(wrapper.vm.columns[1].items)).toBe(true)
  })

  it('when megamenu has two columns, megamenu two columns should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(wrapper.findAll('.dp-megamenu > div')).toHaveLength(2)
  })

  it('when megamenu links are set, megamenu links should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(wrapper.findAll('.dp-megamenu__link')).toHaveLength(3)
  })

  it('when megamenu article is set, megamenu article should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        columns: columns
      }
    })
    expect(wrapper.findAll('.dp-megamenu__article')).toHaveLength(1)
  })
})
