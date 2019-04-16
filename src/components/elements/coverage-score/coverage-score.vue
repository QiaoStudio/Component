<template>
  <span class="dp-coverage-score" @click="$emit('score-popup')">
    {{ scoreResult }}
  </span>
</template>
<style lang="scss">
@import '~assets/css/elements/coverage-score';
</style>
<script>
export default {
  name: 'dp-coverage-score',
  props: {
    score: {
      type: Number,
      default: 0
    },
    scoreBase: {
      type: Number,
      default: 5
    },
    totalScore: {
      type: Number,
      default: 0
    }
  },
  computed: {
    scoreResult: function () {
      if (this.totalScore > 0) {
        return (this.scoreBase * this.score / this.totalScore).toFixed(1)
      }
      return '0.0'
    }
  }
}
</script>
