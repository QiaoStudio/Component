<template>
  <div class="dp-field__radio-group"
       :class="{error: errorStatus,'dp-field__error-popver': isPopoverError}">
    <slot></slot>
    <p class="dp-field__invalid" v-if="!isPopoverError">{{ message }}</p>
    <dp-popover
      v-if="isPopoverError"
      class = 'dp-com-error-popup dp-com-radio__error-popup'
      :width="width"
      :content=" message"
      :placement="placement"
      :always="errorStatus"
      :append-to-body="appendToBody"
      :error-popup=true
      :display="display">
    </dp-popover>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/radio';
</style>
<script>
import Emitter from 'src/utilities/mixins/emitter.js'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'

export default {
  name: 'dp-radio-group',

  componentName: 'DpRadioGroup',

  mixins: [Emitter, FormError],

  components: {
    [Popover.name]: Popover
  },

  props: {
    value: [String, Number],
    errorStatus: {
      type: Boolean,
      default: false
    },
    message: { type: String, default: 'Please select one option above' }
  },
  watch: {
    value(value) {
      this.$emit('change', value)
    }
  }
}
</script>
