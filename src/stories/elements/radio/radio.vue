<template>
  <div>
    <dp-radio
      :error-style="errorStyle"
      v-model="radio"
      :disabled="isDisabled"
      :error-status="isValid"
      :message="errorMessage"
      :label="textlabel"
    ></dp-radio>
  </div>
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
      textlabel: text('label', 'OptionA'),
      isDisabled: boolean('isDisabled', false),
      isValid: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please select one option above'),
      errorStyle: select('errorStyle', errorStyleType, ''),
      radio: 'OptionA'
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
