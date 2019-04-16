<template>
  <dp-checkbox
    v-model="checkbox"
    :error-style="errorStyle"
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
  data() {
    return {
      themesType: select('ThemesType', themesMode, ''),
      textlabel: text('label', 'Basic Checkbox'),
      isDisabled: boolean('isDisabled', false),
      isValid: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please select one option above'),
      errorStyle: select('errorStyle', errorStyleType, ''),
      checkbox: 'Basic Checkbox'
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

