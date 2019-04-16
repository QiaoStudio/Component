<template>
  <div
    class="dp-field__search-bar"
    :class="{ 'dp-border-pill': pill }">
    <span class="dp-field__search-icon" @click="clickHandler"></span>
    <auto-complete
      ref="autocomplete"
      :options="options"
      :label="label"
      :custom-available=true
      :required=false
      :display-by="displayBy"
      :value.sync="value"
      :placeholder-single="label"
      @close="close"
      @open="open"
      @input="input"
      @select="select"
      @search-change="searchChange"
    ></auto-complete>
    <dp-popover
      v-if="isErrorShow"
      class = 'dp-com-error-popup dp-com-search-bar__error-popup'
      :width="width"
      :content=" errorMessage"
      :placement="placement"
      :always="isErrorShow"
      :append-to-body="appendToBody"
      :error-popup=true
      :display="display">
    </dp-popover>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/search-bar';
</style>

<script>
import AutoComplete from 'elements/autocomplete/index.js'
import Popover from 'elements/popover/index.js'
import FormError from 'src/utilities/mixins/form-error.js'

export default {
  name: 'dp-search-bar',
  components: {
    AutoComplete,
    [Popover.name]: Popover
  },
  mixins: [FormError],
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    label: {
      type: String,
      default: 'Search...'
    },
    checkBy: {
      type: String,
      default: 'text'
    },
    displayBy: {
      type: String,
      default: 'text'
    },
    errorStatus: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Error'
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      isOpened: false
    }
  },
  computed: {
    isErrorShow() {
      return !this.isOpened && this.errorStatus
    }
  },
  mounted() {
    this.selectFlag = false
  },
  methods: {
    searchChange(val, id) {
      this.$emit('search-change', val, id)
    },
    input(val) {
      this.$emit('input', val)
    },
    select() {
      this.selectFlag = true
    },
    valueHandler(val) {
      if (this.selectFlag) {
        this.$emit('select-option', val)
        this.selectFlag = false
      }
    },
    clickHandler() {
      this.selectFlag = true
      this.valueHandler(this.value)
    },
    open() {
      this.isOpened = true
    },
    close() {
      this.isOpened = false
    }
  },
  watch: {
    value: {
      handler: 'valueHandler'
    }
  }
}
</script>
