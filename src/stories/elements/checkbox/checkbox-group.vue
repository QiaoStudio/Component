<template>
  <dp-checkbox-group
    :error-style="errorStyle"
    :value="currentValue"
    @input="changeSelected"
    :error-status="isValid"
    :error-message="errorMessage"
  >
    <div :key="index" v-for="(option, index) in options">
      <dp-checkbox :label="option.key">{{ option.text }}</dp-checkbox>
    </div>
  </dp-checkbox-group>
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
      currentValue: [1],
      options: [
        { key: 1, text: 'Checkbox A' },
        { key: 2, text: 'Checkbox B' },
        { key: 3, text: 'Checkbox C' }
      ],
      errorStyle: select('errorStyle', errorStyleType, ''),
      isValid: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please select one option above')
    }
  },
  methods: {
    changeSelected(value) {
      this.currentValue = value
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

