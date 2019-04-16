
<template>
  <div class="dp-field__area">
    <template v-if="mode === 'range'">
      <div v-if="!$isServer">
        <v-date-picker :mode="mode"
                       :value="value"
                       @input="dateInput($event)"
                       :popover-visibility="popoverVisibility"
                       :tint-color="datePickerTintColor"
                       :theme-styles="themeStyles"
                       :show-popover="false"
                       @focus="focus"
                       @blur="blur"
                       show-caps>
          <input type="text"
                 icon="calendar"
                 :value="innerValue"
                 @focus="focus"
                 @blur="blur"
                 expanded
                 :disabled="disabled"
                 readonly="readonly">
        </v-date-picker>
      </div>
    </template>
    <template v-else>
      <input type="date"
             :value="innerValue"
             :disabled="disabled"
             @input="dateInput($event)"
             @focus="focus"
             @blur="blur">
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'dp-date-picker-mobile',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Object, Date]
    },
    mode: {
      type: String,
      default: 'range'
    },
    formatter: { type: String, default: 'DD-MMM-YYYY' }
  },
  data() {
    return {
      popoverVisibility: 'focus',
      datePickerTintColor: '#00B84B',
      themeStyles: {
        dayContentHover: {
          backgroundColor: 'rgba(5,219,92,.3)'
        }
      }
    }
  },
  methods: {
    focus() {
      this.$emit('focus')
    },
    blur() {
      this.$emit('blur')
    },
    dateInput(value) {
      var date
      if (this.mode === 'single') {
        date = new Date(value.target.value)
      } else {
        date = value
      }
      this.$emit('dateInput', date)
    }
  },
  computed: {
    innerValue() {
      if (typeof this.value === 'object' && this.mode === 'range') {
        let dateObject = _.cloneDeep(this.value)
        let startDate = moment(dateObject.start).format(this.formatter)
        let endDate = moment(dateObject.end).format(this.formatter)
        return `${startDate} - ${endDate}`
      }
      return moment(this.value).format('YYYY-MM-DD')
    }
  },
  beforeMount() {
    const VDatePicker = require('v-calendar')
    VDatePicker.setupCalendar()
    this.$options.components.VDatePicker = VDatePicker.DatePicker
  }
}
</script>
