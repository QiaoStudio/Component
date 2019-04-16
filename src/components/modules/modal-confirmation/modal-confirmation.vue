<template>
  <dp-modal
    :is-vetically="isVetically"
    :enable-close="enableClose"
    :is-sticky="isSticky"
    @after-close="close"
    :open-popup.sync="openPopup"
    :class="{'dp-modal__confirmation--no-title': !showTitle}"
    class="dp-modal__confirmation">
    <div v-show="showTitle" slot="title"><i :class="iconClass"></i>{{ title }}</div>
    <div>{{ content }}</div>
    <div slot="footer" class="dp-modal__confirmation-footer">
      <dp-button
        v-if="showCancelButton"
        class="dp-button--sm dp-button--ghost-secondary"
        @click="close">{{ cancelText }}
      </dp-button>
      <dp-button
        class="dp-button--sm dp-button--primary"
        @click="confirm">{{ okText }}
      </dp-button>
    </div>
  </dp-modal>
</template>
<style lang="scss">
@import '~assets/css/modules/modal-confirmation';
</style>

<script>
import DpModal from 'elements/modal'
import DpButton from 'elements/button'

const icons = {
  warning: 'warning',
  eye: 'eye',
  'eye-slash': 'eye-slash',
  calendar: 'calendar-o',
  lightbulb: 'lightbulb-o',
  question: 'question-circle',
  check: 'check',
  times: 'times',
  star: 'star',
  info: 'info-circle'
}

export default {
  name: 'dp-modal-confirmation',
  components: {
    [DpModal.name]: DpModal,
    [DpButton.name]: DpButton
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    icon: { type: String, default: 'warning' },
    title: { type: String, default: 'Sure to cancel?' },
    content: { type: String, default: 'The selected values will be canceled if you say yes.' },
    okText: { type: String, default: 'Yep, I\'m sure' },
    cancelText: { type: String, default: 'Let\'s keep going' }
  },
  data() {
    return {
      isVetically: true,
      enableClose: true,
      isSticky: false,
      openPopup: false
    }
  },
  computed: {
    iconClass() {
      return `fa fa-${icons[this.icon]}`
    },
    showTitle() {
      return Boolean(this.title)
    },
    showCancelButton() {
      return Boolean(this.cancelText)
    }
  },
  methods: {
    close() {
      this.$emit('modal-confirmation-close')
      this.openPopup = false
    },
    confirm() {
      this.$emit('confirm')
      this.close()
    }
  },
  watch: {
    isOpen(val) {
      this.openPopup = val
    },
    openPopup(val) {
      this.$emit('update:isOpen', val)
    }
  }
}
</script>
