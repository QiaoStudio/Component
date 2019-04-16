<template>
  <div class="dp-message">
    <span class="dp-message__infoIcon">
      <i class="fa fa-info-circle"></i>
    </span>
    <div class="dp-message__content">
      <slot></slot>
    </div>
    <dp-button
      v-if="isShowButton"
      class="dp-button--text dp-message__button"
      @click="$listeners.click">
      {{ buttonText }}
    </dp-button>
  </div>
</template>

<script>
import ComButton from 'elements/button/index.js'

export default {
  name: 'dp-message',
  components: {
    [ComButton.name]: ComButton
  },
  props: {
    buttonText: {
      type: String,
      default: 'Ok, Got It!'
    },
    isShowButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
  @import '~assets/css/elements/message';
</style>
