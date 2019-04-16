<template>
  <div class="dp-field__checkbox-group"
       :class="{error: errorStatus,'dp-field__error-popver': isPopoverError}">
    <slot></slot>
    <p class="dp-field__invalid" v-if="!isPopoverError">{{ message }}</p>
    <dp-popover
      v-if="isPopoverError"
      class = 'dp-com-error-popup dp-com-checkbox__error-popup'
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
<script>
import Emitter from 'utilities/mixins/emitter'
import FormError from 'utilities/mixins/form-error'
import Popover from 'elements/popover/index.js'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import { KeyboardInteractionForList } from 'utilities/mixins/keyboard-interaction'
const TABINDEX = 'tabindex'

export default {
  name: 'dp-checkbox-group',

  componentName: 'DpCheckboxGroup',

  mixins: [Emitter, FormError, KeyboardInteractionForList],

  components: {
    [Popover.name]: Popover
  },

  props: {
    value: Array,
    errorStatus: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Please select one option above'
    }
  },

  data () {
    return {
      focusing: null,
      keyboardSettings: {
        itemSelector: 'input[type="checkbox"][tabindex]:not(:disabled)',
        backwardKeys: [KEY_VALUES.ARROW_LEFT, KEY_VALUES.ARROW_UP],
        forwardKeys: [KEY_VALUES.ARROW_RIGHT, KEY_VALUES.ARROW_DOWN]
      }
    }
  },
  updated() {
    const focusing = this.$el.querySelectorAll('input[type="checkbox"][tabindex="0"]')
    if (focusing.length > 1) {
      focusing.forEach((item, index) => {
        item.setAttribute(TABINDEX, index === 0 ? 0 : -1)
      })
    }
  },

  watch: {
    value(value) {
      this.$emit('change', value)
    }
  }
}
</script>
