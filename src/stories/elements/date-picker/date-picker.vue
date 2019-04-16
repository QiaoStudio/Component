<template>
  <div class="storybook-dark__bg">
    <dp-date-picker
      :error-style="errorStyle"
      :label="textlabel"
      :disabled="disabled"
      :mode="mode"
      :value="date"
      @input="innerInput"
      :formatter="formatter"
      :error-status="isValid"
      :message="errorMessage"
    ></dp-date-picker>
  </div>
</template>

<script>
const options = {
  'single': '1',
  'range': '2'
}

const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

const errorStyleType = {
  'default': '',
  'popover': 'popover'
}
export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      dateMode: select('mode', options, '1'),
      textlabel: text('label', 'Date'),
      isValid: boolean('errorStatus', false),
      disabled: boolean('disabled', false),
      errorMessage: text('errorMessage', 'please pick a date'),
      mySelection: date('single', new Date('2018-01-09')),
      errorStyle: select('errorStyle', errorStyleType, ''),
      formatter: text('formatter', 'DD-MMM-YYYY')
    }
  },
  methods: {
    innerInput(value) {
      this.mySelection = value
    }
  },
  computed: {
    mode() {
      return this.dateMode === '1' ? 'single' : 'range'
    },
    date() {
      if (this.dateMode === '1') {
        return new Date(this.mySelection)
      } else {
        return {
          start: new Date(this.mySelection.start),
          end: new Date(this.mySelection.end)
        }
      }
    }
  },
  created() {
    if (this.dateMode === '1') {
      this.mySelection = date('single', new Date('2018-01-09'))
    } else {
      this.mySelection = {
        start: date('rangeStart', new Date('2018-01-09')),
        end: date('rangeEnd', new Date('2018-01-19'))
      }
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
