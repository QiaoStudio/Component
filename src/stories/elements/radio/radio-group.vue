<template>
  <dp-radio-group
    :error-style="errorStyle"
    :value="currentValue"
    @input="changeSelected"
    :error-status="isValid"
    :message="errorMessage"
  >
    <div :key="index" v-for="(option, index) in options">
      <dp-radio :label="option.key">{{ option.text }}</dp-radio>
    </div>
  </dp-radio-group>
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
      currentValue: '1',
      options: [
        { key: '1', text: 'Option A' },
        { key: '2', text: 'Option B' },
        { key: '3', text: 'Option C' }
      ],
      isValid: boolean('errorStatus', false),
      errorStyle: select('errorStyle', errorStyleType, ''),
      errorMessage: text('errorMessage', 'Please select one option above')
    }
  },
  methods: {
    changeSelected (value) {
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

