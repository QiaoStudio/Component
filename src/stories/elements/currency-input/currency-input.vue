<template>
  <div class="storybook-dark__bg">
    <dp-currency-input
      :max-length="maxLength"
      :precision="precision"
      :label="textlabel"
      :disabled="disabled"
      :currency-label="currencyLabel"
      :thousand-separator="thousandSeparator"
      :decimal-separator="decimalSeparator"
      :error-status="isValid"
      :value="innerInputValue"
      @input="InnerInput"
      @change="changeValue($event)"
    />
  </div>
</template>

<script>
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      isLarge: boolean('isLarge', false),
      currencyLabel: text('currencyLabel', '$'),
      thousandSeparator: text('thousandSeparator', ','),
      decimalSeparator: text('decimalSeparator', '.'),
      innerInputValue: number('innerInputValue', 1),
      precision: number('precision', 0),
      maxLength: number('maxLength', 120),
      textlabel: text('label', 'Com Currency Input'),
      isValid: boolean('errorStatus', false),
      disabled: boolean('disabled', false)
    }
  },
  methods: {
    changeValue (value) {
      this.innerInputValue = number('innerInputValue', value)
    },
    InnerInput (value) {
      this.innerInputValue = value
    }
  },
  mounted() {
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
    themesType(val) {
      if (val === 'dp-theme-dark') {
        document.querySelector('body').classList.add('dp-theme-dark')
      } else {
        document.querySelector('body').classList.remove('dp-theme-dark')
      }
    }
  }
}
</script>

