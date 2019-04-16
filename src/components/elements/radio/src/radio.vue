<template>
  <div class="dp-field__radio"
       :class="{error: errorStatus, disabled: isDisabled,'dp-field__error-popver': isPopoverError}" >
    <input :id="radioId"
           class="dp-radio__area"
           :value="label"
           type="radio"
           v-model="model"
           @focus="focus = true"
           @blur="focus = false"
           :name="name"
           :disabled="isDisabled">
    <label class="dp-field__label" :for="radioId">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </label>
    <p class="dp-field__invalid" v-if="!isPopoverError" >{{ errorMessage }}</p>
    <dp-popover
      v-if="isPopoverError"
      class = 'dp-com-error-popup dp-com-radio__error-popup'
      :width="width"
      :content=" errorMessage"
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

let idSeed = ''
export default {
  name: 'dp-radio',

  mixins: [Emitter, FormError],

  componentName: 'DpRadio',
  components: { [Popover.name]: Popover },
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: Boolean,
    name: String,
    errorStatus: {
      type: Boolean,
      default: false
    },
    errorMessage: { type: String, default: 'Please select one option above' }
  },

  data() {
    return {
      focus: false
    }
  },

  computed: {
    radioId() {
      return 'dp_radio_' + idSeed
    },

    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },

      set(val) {
        if (this.isGroup) {
          this.dispatch('DpRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
      }
    },

    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled
        : this.disabled
    },

    _radioGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'DpRadioGroup') {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return undefined
    },

    isGroup() {
      return this._radioGroup !== undefined
    }
  },
  created() {
    idSeed = Math.random().toString().substr(2)
  }
}
</script>
