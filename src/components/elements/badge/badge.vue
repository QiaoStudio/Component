<template>
  <span class="dp-badge">
    <sup v-show="content"
         v-text="content"
         class="dp-badge__content">
    </sup>
  </span>
</template>
<style lang="scss">
@import '~assets/css/elements/badge';
</style>
<script>
export default {
  name: 'dp-badge',
  props: {
    value: { type: [String, Number], default: 0 },
    max: { type: Number, default: null }
  },
  computed: {
    content() {
      const { value, max } = this
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value
      }
      return value
    }
  }
}
</script>
