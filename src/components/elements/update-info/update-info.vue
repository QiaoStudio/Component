<template>
  <div class="dp-update-info">
    <span class="dp-update-info__line"></span>
    <span class="dp-update-info__content">{{ content }}</span>
    <span class="dp-update-info__line"></span>
  </div>
</template>

<script>
export default {
  name: 'dp-update-info',
  props: {
    content: { type: String, required: true }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '~assets/css/elements/update-info';
</style>
