<template>
  <div class="storybook-dark__bg">
    <dp-textarea
      :error-style="errorStyle"
      :error-message="errorMessage"
      :error-status="errorStatus"
      :label="textlabel"
      :required="required"
      :max-length="max"
      :min-length="min"
      :value="innerInputValue"
      @input="InnerInput"
    ></dp-textarea>
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
      innerInputValue: text('innerInputValue', ''),
      textlabel: text('Label', 'Com Textarea'),
      required: boolean('required', false),
      errorStatus: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please enter text.'),
      errorStyle: select('errorStyle', errorStyleType, ''),
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

