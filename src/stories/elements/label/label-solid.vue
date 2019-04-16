<template>
  <div :class="[nationalType]">
    <dp-label
      :class="[labelColor, labelSize]"
      :discount-text="discountText">
      {{ labelText }}
    </dp-label>
  </div>
</template>

<script>

const colorMode = {
  'Default': '',
  'Red': 'dp-label--red',
  'Orange': 'dp-label--orange',
  'Gray': 'dp-label--gray'
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
      labelColor: select('Color', colorMode, ''),
      labelSize: select('Size', sizeMode, ''),
      discountText: text('Discount Text', '')
    }
  }
}
</script>

