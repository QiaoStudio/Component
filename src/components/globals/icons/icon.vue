<template>
  <span :class="[categoryClass, display]" class="dp-icon"></span>
</template>

<style lang="scss">
@import '~assets/css/globals/icons/project';
</style>

<script>
export default {
  name: 'dp-icon',
  props: {
    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    display: {
      type: String,
      required: false
    }
  },
  computed: {
    categoryClass() {
      return 'dp-icon__' + this.type + '--' + this.category
    }
  }
}
</script>
