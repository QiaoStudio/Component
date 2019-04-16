<template>
  <div class="storybook-dark__bg">
    <dp-text-input
      :is-large="isLarge"
      :input-type="inputType"
      :box="box"
      :disabled="isDisabled"
      :error-style="errorStyle"
      :error-status="errorStatus"
      :error-message="errorMessage"
      :label="textlabel"
      :required="required"
      :max-length="max"
      :min-length="min"
      :value="innerInputValue"
      @input="InnerInput"
    />
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

const inputTypes = {
  '': '',
  'text': 'text',
  'email': 'email',
  'number': 'number'
}
export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      inputType: select('Input Type', inputTypes, ''),
      box: boolean('Is Box', false),
      isLarge: boolean('isLarge', false),
      innerInputValue: text('innerInputValue', ''),
      textlabel: text('Label', 'Com TextInput'),
      required: boolean('required', false),
      isDisabled: boolean('isDisabled', false),
      errorStatus: boolean('errorStatus', false),
      errorStyle: select('errorStyle', errorStyleType, ''),
      errorMessage: text('errorMessage', 'Please enter text.'),
      max: number('maxLength', 120),
      min: number('minLength', 0)
    }
  },
  methods: {
    InnerInput (value) {
      this.innerInputValue = text('innerInputValue', value)
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

