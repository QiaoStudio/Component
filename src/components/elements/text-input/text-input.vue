<template>
  <div class="dp-field dp-field__input--text"
       :class="{
         active: isActive,
         disabled: disabled,
         warning: inputing,
         error: isError,
         'dp-animate-shake': isShake && isShowCharacterCounter,
         'dp-field__error-popver': isPopoverError,
         'dp-field--large': isLarge,
         'dp-field__input_box': box
  }">
    <input class="dp-field__area"
           :class="{
             'dp-field__has-value': typed
           }"
           :type="type"
           autocomplete="off"
           :value="value"
           @input="input"
           @focus="focus"
           :disabled="disabled"
           :placeholder="box ? label : ''"
           @blur="blur">
    <label v-if="!box" class="dp-field__label"><slot name="label">{{ label }}</slot></label>
    <span class="dp-character-counter"
          v-if="isShowCharacterCounter && !box">{{ characterCounterInfo }}</span>
    <p class="dp-field__invalid" v-if="!isPopoverError && isError">{{ (error && error.message) || errorMessage }}</p>
    <dp-popover
      v-if="isPopoverError && isError"
      class = 'dp-com-error-popup dp-com-text-input__error-popup'
      :width="width"
      :content=" (error && error.message) || errorMessage"
      :placement="placement"
      :always="!!isError"
      :append-to-body="appendToBody"
      :error-popup=true
      :display="display">
    </dp-popover>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/text-input';
</style>
<script>
import InputBase from 'src/utilities/mixins/input'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'
const SUPPORTED_TYPES = ['email', 'number', 'text']
export default {
  name: 'dp-text-input',
  mixins: [InputBase, FormError],
  components: {
    [Popover.name]: Popover
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    box: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    isShake() {
      if (!this.showError || !this.isValidValue) {
        return false
      }
      if (this.value.length > this.maxLength) {
        return true
      }
      return false
    },
    type() {
      if (SUPPORTED_TYPES.includes(this.inputType)) {
        return this.inputType
      }
      return 'text'
    },
    typed() {
      return this.value && this.value.length > 0
    }
  },
  methods: {
    focus(e) {
      this.active = true
      this.inputing = true
      this.showCharacterCounter = true
      this.selectAll(e)
      this.$emit('focus', e)
    },
    input(e) {
      this.showError = true
      this.$emit('input', e.target.value)
    }
  }
}
</script>

