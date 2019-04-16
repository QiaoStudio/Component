<template>
  <div :class="{
         [heroSize]: !!this.size,
         'dp-hero--auto': !this.size
       }"
       class="dp-hero">
    <div :style="`background-image: url(${imageUrl})`"
         class="dp-hero__bg">
      <div class="dp-hero__content">
        <slot name="content"></slot>
      </div>
    </div>
    <div v-if="overlayOpacity"
         :style="'opacity:' + overlayOpacity"
         class="dp-hero__overlay" />
    <div
      v-if="isCurved"
      class="dp-hero__curve">
      <svg
        width="1440px"
        height="131px"
        viewBox="0 0 1440 131"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMax">
        <path
          d="m0,0c458.78016,173.11964 980.65089,173.33387 1440,0l0,130.92008l-1440,0l0,-130.92008z"
          :fill="curveColor" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
@import '~assets/css/elements/hero';
</style>

<script>
export default {
  name: 'dp-hero',
  props: {
    isCurved: {
      type: Boolean,
      default: true
    },
    curveColor: {
      type: String,
      default: '#FFFFFF'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Hero Image'
    },
    size: {
      type: String,
      default: ''
    },
    overlayOpacity: {
      type: String,
      default: '0'
    }
  },
  computed: {
    heroSize() {
      let size = this.size
      let setSize = 'sm'
      if (size === 'large') {
        setSize = 'lg'
      } else if (size === 'medium') {
        setSize = 'md'
      }
      return `dp-hero--${setSize}`
    }
  }
}
</script>
