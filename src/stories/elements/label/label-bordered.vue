<template>
  <div :class="[nationalType]">
    <dp-label
      class="dp-label--bordered"
      :class="[labelColor, labelSize]"
      :discount-text="discountText">
      {{ labelText }}
    </dp-label>
  </div>
</template>

<script>
const colorModeForBordered = {
  'Default': '',
  'Blue': 'dp-label--blue'
}

const sizeMode = {
  'Default': '',
  'Medium': 'dp-label--md',
  'Large': 'dp-label--lg'
}

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}
export default {
  data () {
    return {
      nationalType: select('NationalType', nationalMode, ''),
      labelText: text('Text', 'New'),
      labelColor: select('Color', colorModeForBordered, ''),
      labelSize: select('Size', sizeMode, ''),
      discountText: text('Discount Text', '')
    }
  }
}
</script>

