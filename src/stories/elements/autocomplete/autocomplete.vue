<template>
  <div class="storybook-dark__bg">
    <dp-autocomplete-multiple
      :required="required"
      :error-status="errorStatus"
      :custom-available="customAvailable"
      :is-disabled="isDisabled" :label="textlabel"
      :multiple="multiple"
      :multiple-alt="multipleAlt"
      :options="options"
      :placeholder-single="placeholderSingle"
      :placeholder-multi="placeholderMulti"
      :error-message="errorMessage"
      :no-result="noResult"
      :display-by="displayBy"
      :value.sync="value"
      :custom-search="customSearch"
      :option-height="60"
      @search-change="searchChange">
    </dp-autocomplete-multiple>
  </div>
</template>
<script>
import _ from 'lodash'
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
const displayByOptions = {
  'text': 'text',
  'label': 'label'
}
export default {
  data() {
    return {
      textlabel: text('Label', 'Occupation'),
      required: boolean('required', false),
      isDisabled: boolean('isDisabled', false),
      multiple: boolean('multiple', true),
      multipleAlt: boolean('isMultipleAlt', false),
      customAvailable: boolean('customAvailable', false),
      errorStatus: boolean('errorStatus', false),
      displayBy: select('displayBy', displayByOptions, 'text'),
      errorMessage: text('errorMessage', 'this is required'),
      noResult: text('noResult', 'No result found. Try something else.'),
      options: [{ text: 'ba al', label: 'baal' }, { text: 'Blgeria', label: 'apple' }, { text: 'Albania', label: 'banana' }, { text: 'Abal', label: 'Abal' }, { text: 'afghanistan', label: 'Cherry' }, { text: 'Blgeria2', label: 'Lemon' }, { text: 'Blgeria3', label: 'Pear' }, { text: 'Blgeria4', label: 'Orange' }, { text: 'Blgeria5', label: 'Mango' }],
      themesType: select('ThemesType', themesMode, ''),
      placeholderSingle: text('placeholderSingle', 'Start typing to search'),
      placeholderMulti: text('placeholderMulti', 'Select destination(s)'),
      customSearch: boolean('customSearch', false)
    }
  },
  computed: {
    value: {
      get() {
        return this.multiple ? [{ text: 'ba al', label: 'baal' }] : { text: 'ba al', label: 'baal' }
      },
      set() {
      }
    }
  },
  methods: {
    searchChange(searchQuery) {
      if (this.customSearch) {
        let filteredOptions = _.filter(this.options, function(option) {
          return (
            _.lowerCase(option['text']).indexOf(
              _.lowerCase(searchQuery)
            ) >= 0
          )
        })
        this.options = _.sortBy(
          filteredOptions,
          function(option) {
            return _.lowerCase(option['text'])
          }
        )
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
