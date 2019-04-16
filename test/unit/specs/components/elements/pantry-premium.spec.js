import {
  shallowMount
} from 'dp-test'
import ComPremium from 'components/elements/premium/premium.vue'

describe('elements/Premium', () => {
  let wrapper

  function createWrapper(options) {
    return shallowMount(ComPremium, options)
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('when premium currency is set, premium currency and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        currency: '$'
      }
    })
    expect(wrapper.find('.dp-premium__currency').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__currency').text()).toBe('$')
  })

  it('when premium value is set, premium value and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        premium: 29000.03
      }
    })
    expect(wrapper.find('.dp-premium__value').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__value').text()).toBe('29,000')
  })

  it('when thousandSeparator is set, premium value and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        premium: 29000.03,
        thousandSeparator: '+'
      }
    })
    expect(wrapper.find('.dp-premium__value').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__value').text()).toBe('29+000')
  })

  it('when decimalSeparator and precision are set, premium value and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        premium: 29000.033,
        decimalSeparator: '+',
        precision: 2
      }
    })
    expect(wrapper.find('.dp-premium__value').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__value').text()).toBe('29,000+03')
  })

  it('when premium unit is set, premium unit text and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        unit: 'Trip'
      }
    })
    expect(wrapper.find('.dp-premium__unit').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__unit-text').text()).toBe('/ Trip')
  })

  it('when originalPremium is setted, premium before discount text and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        originalPremium: 193,
        currency: '$'
      }
    })
    expect(wrapper.find('.dp-premium__before-discount').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__before-discount').text()).toBe('$193')
  })

  it('when originalPremium is null, premium before discount text should be empty string and class should exist', () => {
    wrapper = createWrapper({
      propsData: {
        originalPremium: null,
        currency: '$'
      }
    })
    expect(wrapper.find('.dp-premium__before-discount').exists()).toBe(true)
    expect(wrapper.find('.dp-premium__before-discount').text()).toBe('')
  })

  it('when slot originalPremium is existed, display accordingly original premium defined in slot', () => {
    wrapper = createWrapper({
      propsData: {
        discountValue: 1
      },
      slots: {
        'original-premium': '<span>321บาท</span>'
      }
    })
    expect(wrapper.find('.dp-premium__before-discount').text()).toBe('321บาท')
  })

  it('when slot premium-currency is existed, display accordingly premium defined in slot', () => {
    wrapper = createWrapper({
      propsData: {
        discountValue: 1
      },
      slots: {
        'premium-currency': '<template slot="premium-currency">$</template>'
      }
    })
    expect(wrapper.find('.dp-premium__price sup').text()).toBe('$')
  })

  it('when slot premium-value is existed, display accordingly premium defined in slot', () => {
    wrapper = createWrapper({
      propsData: {
        discountValue: 1
      },
      slots: {
        'premium-value': '<template slot="premium-value">32</template>'
      }
    })
    expect(wrapper.find('.dp-premium__value').text()).toBe('32')
  })

  it('when slot unit is existed, display accordingly unit defined in slot', () => {
    wrapper = createWrapper({
      propsData: {
        discountValue: 1
      },
      slots: {
        'unit': '<span>บาท</span>'
      }
    })
    expect(wrapper.find('.dp-premium__unit').text()).toBe('บาท')
  })

  it('when originalPremium is setted and isDiscountShow value is false, premium before discount element should not exist', () => {
    wrapper = createWrapper({
      propsData: {
        originalPremium: 193,
        currency: '$',
        isDiscountShow: false
      }
    })
    expect(wrapper.find('.dp-premium__before-discount').exists()).toBe(false)
  })
})
