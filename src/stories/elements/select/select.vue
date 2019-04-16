<template>
  <div class="storybook-dark__bg">
    <dp-select
      :text-align="textAlign"
      :outline="outline"
      :shadow="shadow"
      :required="required"
      :error-style="errorStyle"
      :error-message="errorMessage"
      :label="label"
      :disabled="disabled"
      :error-status="isValid"
      :items="selectitems"
      :is-large="isLarge"
      :value="innerSelectValue"
      @change="changeValue($event)"
    ></dp-select>
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

const textAlign = {
  'Align Left': 'left',
  'Align Center': 'center',
  'Align Right': 'right'
}
const options = {
  'None': '',
  'Lowest price': '2',
  'Lowest premium': '3'
}
export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      shadow: boolean('Enable Shadow', false),
      outline: boolean('Enable Outline', false),
      textAlign: select('Text Align', textAlign, 'left'),
      isLarge: boolean('isLarge', false),
      innerSelectValue: select('innerSelectValue', options, ''),
      selectitems: [{ key: '', text: '' }, { key: '2', text: 'Lowest price' }, { key: '3', text: 'Lowest premium' }],
      errorStyle: select('errorStyle', errorStyleType, ''),
      inputErrorMessage: text('errorMessage', 'please input errorMessage'),
      isValid: boolean('errorStatus', false),
      label: text('label', 'Com Select'),
      disabled: boolean('disabled', false),
      required: boolean('required', false)
    }
  },
  methods: {
    changeValue (newValue) {
      this.innerSelectValue = select('innerSelectValue', options, newValue)
    }
  },
  computed: {
    errorMessage() {
      return this.isValid ? this.inputErrorMessage : ''
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

