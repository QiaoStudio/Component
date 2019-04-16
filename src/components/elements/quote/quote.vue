<template>
  <div class="dp-quote" :class="{ 'dp-quote--pull': isPull }">
    <div class="dp-quote__content"><slot></slot></div>
  </div>
</template>

<style lang="scss">
@import '~assets/css/elements/quote';
</style>

<script>

export default {
  name: 'dp-quote',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPull() {
      return this.type === 'pull'
    }
  }
}
</script>
