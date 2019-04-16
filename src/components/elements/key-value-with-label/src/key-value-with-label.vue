<template>
  <div class="dp-key-value-with-label">
    <div :class="classAlignment">
      <p class="dp-key-value-with-label__text-top" v-show="topLabel && topLabel.visible">
        {{ topLabel.content }}
      </p>
      <p class="dp-key-value-with-label__value-container">
        {{ valueFrom }}{{ valueTo?' - ':'' }}{{ valueTo }}{{ asteriskVisible?'*':'' }}
      </p>
      <p class="dp-key-value-with-label__text-bottom" v-show="bottomLabel && bottomLabel.visible">{{ bottomLabel.content }}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'dp-key-value-with-label',
  props: {
    topLabel: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    valueFrom: {
      type: [Number, String],
      default: ''
    },
    valueTo: {
      type: [Number, String],
      default: ''
    },
    asteriskVisible: {
      type: Boolean,
      default: true
    },
    bottomLabel: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    alignMobile: {
      type: String,
      default: 'center'
    },
    alignDesktop: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {}
  },
  computed: {
    isMobile() {
      return this.$screen.resize && this.$screen.mobile()
    },
    classAlignment() {
      let validSettings = ['left', 'right', 'center']
      if (this.isMobile) {
        if (validSettings.includes(this.alignMobile)) {
          return `dp-key-value-with-label--${this.alignMobile}-alignment`
        } else return null
      } else {
        if (validSettings.includes(this.alignDesktop)) {
          return `dp-key-value-with-label--${this.alignDesktop}-alignment`
        } else return null
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/elements/key-value-with-label';
</style>
