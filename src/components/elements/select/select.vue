<template>
  <div class="dp-field dp-field__select"
       :class="{
         active: isValidValue,
         focus: isFocus,
         error: isError || errorstatus,
         'fit-width': isFitWidth,
         disabled: disabled,
         'dp-field__error-popver': isPopoverError,
         'dp-field--large': isLarge,
         'dp-field__outline': outline,
         'dp-field__shadow': shadow}" tabindex="0">
    <span class="dp-field__icon"><i class="fa fa-caret-down"></i></span>
    <component :is="currentView"
               v-bind="$attrs"
               v-on="$listeners"
               :default-text="''"
               @change="change"
               :seed="seed"
               @open-desktop-dropdown="openDesktopDropdown"
               @close-desktop-dropdown="closeDesktopDropdown"
               @select-mobile-blur="selectMobileBlur"
               @select-mobile-click="selectMobileClick"
               :disabled="disabled"
               class="dp-field__area"
               :class="{'text-center': alignCenter, 'text-left': alignLeft, 'text-right': alignRight}">
      <b class="dp-field__select_label" v-if="outline || shadow" slot="prepend">{{ label }}:</b>
    </component>
    <label class="dp-field__label" v-if="!(outline || shadow)"><slot name="label">{{ label }}</slot></label>
    <p class="dp-field__invalid"
       v-if="!isPopoverError && isError">{{ errorMessage || error.message }}</p>
    <dp-popover
      v-if="(isError && isPopoverError)"
      class = 'dp-com-error-popup dp-com-select__error-popup'
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
@import '~assets/css/elements/select';
</style>
<script>
import _ from 'lodash'
import SelectDesktop from 'components/elements/select/select-desktop.vue'
import SelectMobile from 'components/elements/select/select-mobile.vue'
import FormError from 'src/utilities/mixins/form-error.js'
import Popover from 'elements/popover/index.js'
import { KEY_VALUES, getKey } from 'utilities/event-helper/key-event'
import { KeyboardInteractionForList } from 'utilities/mixins/keyboard-interaction'

export default {
  name: 'dp-select',
  mixins: [FormError, KeyboardInteractionForList],
  props: {
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String
    },
    errorstatus: {
      type: Boolean,
      default: false
    },
    dataWidth: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    }
  },
  components: {
    SelectDesktop,
    SelectMobile,
    [Popover.name]: Popover
  },
  data() {
    return {
      showError: false,
      beginCatchError: false,
      isFocus: false,
      seed: 0,
      keyboardSettings: {
        itemSelector: '.dp-field__dropdown-menu a',
        backwardKeys: [KEY_VALUES.ARROW_UP],
        forwardKeys: [KEY_VALUES.ARROW_DOWN],
        selectKeys: [KEY_VALUES.ENTER, KEY_VALUES.SPACE, KEY_VALUES.ARROW_DOWN],
        onSelect: this.select,
        onDismiss: this.dismiss
      }
    }
  },
  created () {
    this.beginCatchError = true
  },
  computed: {
    isFitWidth() {
      return this.$screen.resize && !this.$screen.smallScreen() && this.dataWidth === 'fit'
    },
    currentView() {
      return this.$screen.resize && this.$screen.smallScreen() ? SelectMobile : SelectDesktop
    },
    isValidValue() {
      return (
        !_.isUndefined(this.$attrs.value) &&
        !_.isNull(this.$attrs.value) &&
        this.$attrs.value !== ''
      )
    },
    isError() {
      return this.showError && (this.errorMessage || !!this.error)
    },
    error() {
      if (!this.beginCatchError) {
        return null
      }
      if (this.required && !this.isValidValue) {
        return {
          type: 'empty',
          message: 'This field is required.'// this.$t('This field is required.')
        }
      }
      return null
    },
    alignCenter() {
      return this.textAlign === 'center'
    },
    alignRight() {
      return this.textAlign === 'right'
    },
    alignLeft() {
      return !(this.alignCenter || this.alignRight)
    }
  },
  methods: {
    $_KFL_supportKeyboard(e) {
      const keyEntered = getKey(e)
      e.preventDefault()
      e.stopPropagation()
      if (this.$_KFL_settings.backwardKeys.includes(keyEntered)) {
        this.$_KFL_findNextFocusable(-1).focus()
      } else if (this.$_KFL_settings.dismissKeys.includes(keyEntered) && this.$_KFL_settings.onDismiss) {
        this.$_KFL_settings.onDismiss(this.$_KFL_getFocusedElement())
      } else {
        if (this.$_KFL_settings.selectKeys.includes(keyEntered) && Boolean(this.$_KFL_settings.onSelect)) {
          this.$_KFL_settings.onSelect(this.$_KFL_getFocusedElement(), e)
        }
        if (this.$_KFL_settings.forwardKeys.includes(keyEntered)) {
          this.$_KFL_findNextFocusable(1).focus()
        }
      }
    },
    openDropdown() {
      this.seed = (this.seed + 1) % 100
    },
    dismiss() {
      if (document.activeElement !== this.$el) {
        this.seed = (this.seed + 1) % 100
      }
      this.$el.focus()
    },
    select (item, e) {
      if (!item) {
        this.openDropdown()
      } else {
        if (item !== this.$el && getKey(e) !== KEY_VALUES.ARROW_DOWN) {
          item.dispatchEvent(new Event('click'))
          this.$el.focus()
        }
      }
    },
    change() {
      this.showError = true
    },
    openDesktopDropdown() {
      this.isFocus = true
      this.$nextTick(() => {
        const target = this.$el.querySelector('.dp-field__dropdown-menu li.selected a')
        target && target.focus()
      })
    },
    closeDesktopDropdown() {
      this.isFocus = false
    },
    selectMobileBlur() {
      this.isFocus = false
    },
    selectMobileClick() {
      this.isFocus = !this.isFocus
    }
  },
  watch: {
    error(val) {
      let msg = val ? val.message : ''
      this.$emit('update:errorMessage', msg)
    }
  }
}
</script>
