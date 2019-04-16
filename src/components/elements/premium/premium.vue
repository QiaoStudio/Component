<template>
  <div class="dp-premium">
    <div class="dp-premium__no-price"
         v-if="hasQuote === false">
      <span>{{ nonQuoteText }}</span>
    </div>
    <div v-else>
      <span class="dp-premium__price">
        <sup class="dp-premium__currency">
          <slot name="premium-currency">
            {{ currency }}
          </slot>
        </sup>
        <span class="dp-premium__value">
          <slot name="premium-value">
            {{ formatedPremium }}
          </slot>
        </span>
      </span>
      <span class="dp-premium__other">
        <del class="dp-premium__before-discount" v-if="isDiscountShow">
          <slot name="original-premium">
            {{ formatedOriginalPremium }}
          </slot>
        </del>
        <div class="dp-premium__unit">
          <sub class="dp-premium__unit-text">
            <slot name="unit">
              {{ unitText }}
            </slot>
          </sub>
        </div>
      </span>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/premium';
</style>
<script>
import Accounting from 'accounting'

export default {
  name: 'dp-premium',
  props: {
    currency: { type: String, default: '' },
    premium: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    originalPremium: {
      type: Number,
      default: 0
    },
    nonQuoteText: {
      type: String
    },
    hasQuote: {
      type: Boolean,
      default: true
    },
    thousandSeparator: {
      type: String,
      default: ','
    },
    decimalSeparator: {
      type: String,
      default: '.'
    },
    precision: {
      type: Number,
      default: 0
    },
    isDiscountShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formatedPremium() {
      if (this.premium) {
        return this.formatNumber(this.premium)
      }
      return ''
    },
    formatedOriginalPremium() {
      if (this.originalPremium) {
        return this.currency + this.formatNumber(this.originalPremium)
      }
      return ''
    },
    unitText() {
      if (this.unit) {
        return '/ ' + this.unit
      }
      return ''
    }
  },
  methods: {
    formatNumber (value) {
      return Accounting.formatNumber(value, this.precision, this.thousandSeparator, this.decimalSeparator)
    }
  }
}
</script>
