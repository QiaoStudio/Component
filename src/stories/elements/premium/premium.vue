<template>
  <div :class="[nationalType]">
    <dp-premium
      :currency="currency"
      :premium="premium"
      :unit="unit"
      :original-premium="originalPremium"
      :is-discount-show="isDiscountShow"
      :has-quote="hasQuote"
      :non-quote-text="nonQuoteText"
      :decimal-separator="decimalSeparator"
      :thousand-separator="thousandSeparator"
      :precision="precision"
    ></dp-premium>
  </div>
</template>

<script>

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

export default {
  data () {
    return {
      nationalType: select('NationalType', nationalMode, ''),
      currency: text('Currency', '$'),
      premium: number('Premium', 190),
      unit: text('Unit', 'Trip'),
      originalPremium: number('Original Premium', 198),
      isDiscountShow: boolean('Is discount show?', true),
      hasQuote: boolean('Has Quotes', true),
      nonQuoteText: text('Non Quote Text', 'Quotes not available online'),
      thousandSeparator: text('Thousand Separator', ','),
      decimalSeparator: text('Decimal Separator', '.'),
      precision: number('Precision', 0)
    }
  }
}
</script>
