<template>
  <span :class="{ 'dp-label--discount': discountText }"
        class="dp-label">
    <small>
      <strong v-if="discountText">
        {{ discountText }}
      </strong>
      <slot></slot>
    </small>
  </span>
</template>
<style lang="scss">
@import '~assets/css/elements/label';
</style>
<script>
export default {
  name: 'dp-label',
  props: {
    discountText: { type: String, default: '' }
  }
}
</script>
