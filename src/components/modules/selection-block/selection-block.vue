<template>
  <div class="dp-selection-block dp-tile"
       :class="[selectedClass, layoutClass]"
       @click="$listeners.click">
    <div v-if="imageUrl"
         class="dp-selection-block__image"><img :src="imageUrl"></div>
    <div v-if="text"
         class="dp-selection-block__text"><span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
const HORIZONTAL = 'horizontal'
const DEFAULT_CLASS_NAME = 'dp-selection-block'

export default {
  name: 'dp-selection-block',
  props: {
    imageUrl: { type: String, default: () => '' },
    text: { type: String, default: () => '' },
    layout: { type: String, default: () => '' },
    selected: { type: Boolean, default: () => false }
  },
  data() {
    return {
    }
  },
  computed: {
    selectedClass() {
      return this.selected ? 'selected' : ''
    },
    layoutClass() {
      return this.layout === HORIZONTAL
        ? `${DEFAULT_CLASS_NAME}--${HORIZONTAL}`
        : `${DEFAULT_CLASS_NAME}--default`
    }
  }
}
</script>

<style lang="scss">
@import "~assets/css/modules/selection-block";
</style>
