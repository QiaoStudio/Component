<template>
  <div class="dp-progress-bar">
    <div class="dp-progress-bar__container">
      <div class="dp-progress-bar__status-bar">
        <div class="dp-progress-bar__percent-bar" :style="{width: barWidth, height: barHeight}">
        </div>
      </div>
      <div class="dp-progress-bar__description" :class="{ 'dp-progress-bar__description--mobile': !indicatorOnMobile, 'dp-progress-bar__description--desktop': !indicatorOnDesktop}">
        <span class="dp-progress-bar__progress">Progress</span>
        <span class="dp-progress-bar__number" v-text="`${progress}%`"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dp-progress-bar',
  props: {
    percent: { type: Number },
    indicatorOnMobile: {
      type: Boolean,
      default: false
    },
    indicatorOnDesktop: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {}
  },
  computed: {
    progress() {
      let val = Number.parseInt(this.percent)
      if (val < 0) {
        return 0
      }
      if (val > 100) {
        return 100
      }
      return val
    },
    barWidth() {
      if (this.progress === 0) {
        return `${this.height}px`
      }
      return `${this.progress}%`
    },
    barHeight() {
      return `${this.height}px`
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/elements/progress-bar';
</style>
