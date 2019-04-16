<template>
  <div class="dp-field dp-field__input--currency"
       :class="{active: isActive, warning: inputing, error: errorStatus, disabled: disabled, 'dp-field--large': isLarge}">
    <input class="dp-field__area"
           type="text"
           autocomplete="off"
           ref="input"
           :value="valueToBind"
           :disabled="disabled"
           @keypress="keypress"
           @touchstart="showkeyboard"
           @input="updateValue($event.target.value)"
           @focus="focus"
           @blur="blur">
    <label class="dp-field__label"><slot name="label">{{ label }}</slot></label>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/currency-input';
</style>
<script>
import Vue from 'vue'
import _ from 'lodash'
import Accounting from 'accounting'
const isServer = Vue.prototype.$isServer

if (!isServer) {
  require('bootstrap-3-typeahead')
}

export default {
  name: 'dp-currency-input',
  props: {
    label: {
      type: String
    },
    errorStatus: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: ''
    },
    precision: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String
    },
    autocompleteDigits: {
      type: Object,
      default() {
        return {
          min: 0,
          max: 0
        }
      }
    },
    maxLength: {
      type: Number,
      required: false,
      default: null
    },
    currencyLabel: {
      type: String,
      default: '$'
    },
    thousandSeparator: {
      type: String,
      default: ','
    },
    decimalSeparator: {
      type: String,
      default: '.'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false,
      inputing: false,
      isDirty: false,
      inputValue: '',
      oldInputValue: '' // this field is for remove the duplicate change event
    }
  },
  computed: {
    isValidValue() {
      return !_.isUndefined(this.value) && !_.isNull(this.value)
    },
    isActive() {
      return this.active || this.isValidValue
    },
    valueToBind() {
      let val
      if (this.isDirty) {
        val = this.inputValue
      } else {
        val = this.formatMoney(this.value, this.precision)
      }
      return val
    },
    autocompleteData() {
      let data = []
      if (this.$screen.mobile()) {
        return data
      }
      if (
        !this.autocompleteDigits ||
        this.autocompleteDigits.max <= this.autocompleteDigits.min ||
        this.value === '' ||
        this.value === 0
      ) {
        return []
      }

      for (
        let i = this.autocompleteDigits.min;
        i <= this.autocompleteDigits.max;
        i++
      ) {
        let stringValue = this.inputValue.toString()
        if (stringValue === '0' || stringValue === '') {
          continue
        }
        if (stringValue.length < i) {
          let paddedValue = stringValue
          for (let j = stringValue.length; j < i; j++) {
            paddedValue += '0'
          }
          let paddedName = this.formatMoney(paddedValue, this.precision)
          data.push({ id: paddedValue, name: paddedName })
        }
      }
      return data
    }
  },
  mounted() {
    this.setupTypeahead()
  },
  destroyed() {
    $(this.$el).typeahead('destroy')
  },
  methods: {
    formatMoney (value, precision) {
      return Accounting.formatMoney(value, this.currencyLabel, precision, this.thousandSeparator, this.decimalSeparator)
    },
    unformatMoney (value) {
      return Accounting.unformat(value, this.decimalSeparator)
    },
    focus(e) {
      this.active = true
      this.inputing = true
      this.selectAll(e)
    },
    blur(e) {
      e.target.type = 'text'
      this.isDirty = false

      this.active = false
      this.inputing = false

      let inputValue = this.inputValue
      this.inputValue = ''
      if (
        $(this.$el).data('typeahead') &&
        $(this.$el).data('typeahead').mouseddown
      ) {
        e.cancelBubble = true
        return false
      } else {
        this.changeEvent(this.unformatMoney(inputValue))
      }
    },
    updateValue(value) {
      if (
        this.maxLength !== null &&
        this.maxLength !== '' &&
        !isNaN(parseInt(this.maxLength)) &&
        value.toString().length > this.maxLength
      ) {
        value = value.toString().substr(0, this.maxLength)
        this.$set(this.$el, 'value', value)
      }
      this.isDirty = true
      this.inputValue = value
      let adjustedValue = Accounting.toFixed(value, this.precision)
      this.$emit('input', this.unformatMoney(adjustedValue))
      if (this.autocompleteData.length > 0) {
        $(this.$el).typeahead('lookup', adjustedValue)
      }
    },
    selectAll(event) {
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      this.isDirty = true
      this.inputValue = this.unformatMoney(event.target.value)
      setTimeout(() => {
        event.target.select()
      })
    },
    keypress(e) {
      let code = e.charCode || e.keyCode
      let keyAllowed = code >= 48 && code <= 57
      if (!keyAllowed) {
        e.preventDefault()
      }
    },
    showkeyboard(e) {
      this.selectAll(e)
      if (this.$screen.mobile()) {
        this.$refs.input.value = this.unformatMoney(e.target.value)
        e.target.type = 'number'
        e.target.pattern = '\\d*'
      }
    },
    changeEvent(changeValue) {
      if (this.oldInputValue.toString() === changeValue.toString()) {
        return
      }

      this.oldInputValue = changeValue
      this.$emit('change', changeValue)
    },
    source(query, process) {
      return process(this.autocompleteData)
    },
    matcher(item) {
      return item.id.indexOf(this.query) > -1
    },
    sorter(items) {
      return _.orderBy(
        items,
        function(n) {
          let r = parseInt(n)
          return isNaN(r) ? n : r
        },
        ['desc']
      )
    },
    updater(item) {
      let adjustedValue = this.unformatMoney(
        Accounting.toFixed(item.id, this.precision)
      )
      this.inputValue = adjustedValue
      this.$emit('input', adjustedValue)
      this.changeEvent(adjustedValue)
      return this.inputValue
    },
    setupTypeahead() {
      let $this = this
      $($this.$el).typeahead({
        source: $this.source,
        matcher: $this.matcher,
        sorter: $this.sorter,
        updater: $this.updater
      })
    }
  }
}
</script>
