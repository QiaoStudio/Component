<template>
  <dp-checkbox
    :error-style="errorStyle"
    :class="smallClass"
    v-model="checkbox"
    :disabled="isDisabled"
    :error-status="isValid"
    :error-message="errorMessage"
    :label="textlabel"
  ></dp-checkbox>
</template>

<script>
const errorStyleType = {
  'default': '',
  'popover': 'popover'
}

const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      smallClass: 'dp-field__checkbox--small',
      textlabel: text('label', 'Small A'),
      isDisabled: boolean('isDisabled', false),
      errorStyle: select('errorStyle', errorStyleType, ''),
      isValid: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please select one option above'),
      checkbox: 'Small Checkbox'
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

