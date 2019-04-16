<template>
  <div class="dp-field dp-field__textarea"
       :class="{active: isActive, focus: inputing, error: isError, 'dp-animate-shake': isShake && isShowCharacterCounter,'dp-field__error-popver': isPopoverError}">
    <textarea class="dp-field__area"
              :value="value"
              @focus="focus"
              @blur="blur"
              @input="input"></textarea>
    <label class="dp-field__label"><slot name="label">{{ label }}</slot></label>
    <span class="dp-character-counter"
          v-if="isShowCharacterCounter">{{ characterCounterInfo }}</span>
    <p class="dp-field__invalid"
       v-if="isError && !isPopoverError">{{ (error && error.message) || errorMessage }}</p>
    <dp-popover
      v-if="isError && isPopoverError"
      class = 'dp-com-error-popup dp-com-text-area__error-popup'
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
@import '~assets/css/elements/textarea';
</style>
<script>
import InputBase from 'src/utilities/mixins/input'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'

let oldHeight = 0
export default {
  name: 'dp-textarea',
  mixins: [InputBase, FormError],
  components: {
    [Popover.name]: Popover
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
    }
  },
  mounted() {
    this.textAutoHeight()
  },
  methods: {
    input(e) {
      this.showError = true
      this.$emit('input', e.target.value)
    },
    textAutoHeight(e) {
      this.$nextTick(() => {
        let textarea = $(this.$el).find('textarea')
        let lineHeight = parseInt(textarea.css('line-height'))
        textarea.css('height', '')
        let height = textarea.prop('scrollHeight')
        if (oldHeight - height > 0 && oldHeight - height < lineHeight) {
          textarea.css('height', oldHeight - lineHeight)
          oldHeight = oldHeight - lineHeight
        } else {
          textarea.css('height', height)
          oldHeight = height
        }
      })
    }
  },
  watch: {
    value(val) {
      this.textAutoHeight()
    }
  }
}
</script>

