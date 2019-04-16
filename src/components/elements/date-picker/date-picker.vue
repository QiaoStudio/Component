<template>
  <div class="dp-field dp-field__datepicker"
       :class="{active: isValidValue, focus: inputing, error: errorStatus, disabled: disabled,'dp-field__error-popver': isPopoverError}">
    <span class="dp-field__icon">
      <i class="fa fa-calendar-o"></i>
    </span>
    <div v-if="!$isServer">
      <component
        :is="currentView"
        :value="value"
        :formatter="formatter"
        @dateInput="dateInput"
        @focus="focus"
        @blur="blur"
        :disabled="disabled"
        :class="{'dp-field__area-single': isSingle }"
        :mode="mode">
      </component>
    </div>
    <label class="dp-field__label"><slot name="label">{{ label }}</slot></label>
    <p class="dp-field__invalid" v-if="!isPopoverError">{{ message }}</p>
    <dp-popover
      v-if="isPopoverError"
      class = 'dp-com-error-popup dp-com-date-picker__error-popup'
      :width="width"
      :content="message"
      :placement="placement"
      :always="errorStatus"
      :append-to-body="appendToBody"
      :error-popup=true
      :display="display">
    </dp-popover>
  </div>
</template>
<style lang="scss">
@import 'v-calendar/lib/v-calendar.min.css';
@import '~assets/css/elements/date-picker';
</style>
<script>
import _ from 'lodash'
import DatePickDeskTop from 'elements/date-picker/date-picker-desktop.vue'
import DatePickMobile from 'elements/date-picker/date-picker-mobile.vue'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'

export default {
  name: 'dp-date-picker',
  mixins: [FormError],
  props: {
    disabled: { type: Boolean, default: false },
    errorStatus: { type: Boolean, default: false },
    mode: { type: String, default: 'range' },
    value: {
      type: [String, Date, Object]
    },
    formatter: { type: String, default: 'DD-MMM-YYYY' },
    label: { type: String, default: 'Date' },
    message: { type: String, default: 'please pick a date' }
  },
  components: {
    DatePickDeskTop,
    DatePickMobile,
    [Popover.name]: Popover
  },
  data() {
    return {
      inputing: false
    }
  },
  methods: {
    focus() {
      this.inputing = true
    },
    blur() {
      this.inputing = false
    },
    dateInput(val) {
      this.currentValue = val
      this.$emit('input', val)
    }
  },
  computed: {
    isValidValue() {
      return !_.isUndefined(this.value) && !_.isNull(this.value)
    },
    currentView() {
      return this.$screen.resize && this.$screen.smallScreen()
        ? DatePickMobile
        : DatePickDeskTop
    },
    isSingle() {
      if (this.mode === 'single') {
        return true
      }
      return false
    }
  }
}
</script>
