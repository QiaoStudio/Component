<template>
  <div class="dp-field__checkbox"
       :class="{error: errorStatus, disabled: isDisabled,'dp-field__error-popver': isPopoverError}">
    <input :id="checkboxId"
           class="dp-checkbox__area"
           :value="label"
           type="checkbox"
           v-model="model"
           @focus="focus = true"
           @blur="focus = false"
           @keypress.enter="toggle"
           :name="name"
           :disabled="isDisabled"
           :tabindex="isDisabled ? null : '0'"
           @change="change">
    <label class="dp-field__label"
           :for="checkboxId">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </label>
    <slot name="unlabel"></slot>
    <p class="dp-field__invalid" v-if="!isPopoverError">{{ errorMessage }}</p>
    <dp-popover
      v-if="isPopoverError"
      class = 'dp-com-error-popup dp-com-checkbox__error-popup'
      :width="width"
      :content="errorMessage"
      :placement="placement"
      :always="errorStatus"
      :append-to-body="appendToBody"
      :error-popup=true
      :display="display">
    </dp-popover>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/checkbox';
</style>
<script>
import Emitter from 'src/utilities/mixins/emitter.js'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'

let idSeed = ''
export default {
  name: 'dp-checkbox',

  mixins: [Emitter, FormError],

  componentName: 'DpCheckbox',
  components: { [Popover.name]: Popover },
  props: {
    value: [String, Number, Boolean],
    label: [String, Number],
    disabled: Boolean,
    name: String,
    errorStatus: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Please select one option above'
    }
  },

  data() {
    return {
      focus: false
    }
  },

  computed: {
    checkboxId() {
      return 'dp_checkbox_' + idSeed
    },

    model: {
      get() {
        return this.isGroup ? this._checkboxGroup.value : this.value
      },

      set(val) {
        if (this.isGroup) {
          this.dispatch('DpCheckboxGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
      }
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled
        : this.disabled
    },

    _checkboxGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'DpCheckboxGroup') {
          parent = parent.$parent
          return undefined
        } else {
          return parent
        }
      }
    },

    isGroup() {
      return this._checkboxGroup !== undefined
    }
  },

  created() {
    idSeed = Math.random()
      .toString()
      .substr(2)
  },

  methods: {
    change(e) {
      this.$emit('change', e)
    },
    toggle(e) {
      e.target.dispatchEvent(new MouseEvent('click'))
    }
  }
}
</script>
