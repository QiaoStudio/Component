<template>
  <div class="dp-logo">
    <div class="dp-logo__img" :class="[vertAlignMobile, vertAlignDesktop, horizAlignMobile, horizAlignDesktop]" v-if="src" :style="imageContainerStyle">
      <a :href="href" :target="target">
        <img :alt="alt" :src="src" :style="imageStyle"/>
      </a>
    </div>
    <div v-if="insurerName && planName">
      <dp-logo-title
        :target="target"
        :href="href"
        :insurer-name="insurerName"
        :plan-name="planName">
      </dp-logo-title>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/logo';
</style>
<script>
import DpLogoTitle from 'elements/logo-title/index.js'
export default {
  name: 'dp-logo',
  components: {[DpLogoTitle.name]: DpLogoTitle},
  props: {
    src: {
      type: String,
      default: ''
    },
    insurerName: {
      type: String,
      default: ''
    },
    planName: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: Number
    },
    maxWidth: {
      type: Number
    },
    containerHeight: {
      type: Number,
      default: 62
    },
    containerWidth: {
      type: Number,
      default: 62
    },
    imgVertAlignMobile: {
      type: String,
      default: 'center'
    },
    imgVertAlignDesktop: {
      type: String,
      default: 'center'
    },
    imgHorizAlignMobile: {
      type: String,
      default: 'center'
    },
    imgHorizAlignDesktop: {
      type: String,
      default: 'center'
    },
    alt: {
      type: String,
      default: 'logo'
    },
    target: {
      type: String,
      validator: function (value) {
        return ['_blank', '_self', '_parent', '_top'].indexOf(value) !== -1
      },
      default: '_self'
    },
    href: {
      type: String,
      default: 'javascript:;'
    }
  },
  computed: {
    imageStyle() {
      return {
        maxWidth: this.maxWidth ? this.maxWidth + 'px' : '',
        maxHeight: this.maxHeight ? this.maxHeight + 'px' : ''
      }
    },
    imageContainerStyle() {
      return {
        width: this.containerWidth ? this.containerWidth + 'px' : '62px',
        height: this.containerHeight ? this.containerHeight + 'px' : '62px'
      }
    },
    vertAlignMobile() {
      if (this.imgVertAlignMobile === 'top') {
        return 'dp-logo__img--mobile-top'
      } else if (this.imgVertAlignMobile === 'bottom') {
        return 'dp-logo__img--mobile-bottom'
      } else return 'dp-logo__img--mobile-ver-center'
    },
    horizAlignMobile() {
      if (this.imgHorizAlignMobile === 'left') {
        return 'dp-logo__img--mobile-left'
      } else if (this.imgHorizAlignMobile === 'right') {
        return 'dp-logo__img--mobile-right'
      } else return 'dp-logo__img--mobile-hori-center'
    },
    vertAlignDesktop() {
      if (this.imgVertAlignDesktop === 'top') {
        return 'dp-logo__img--desktop-top'
      } else if (this.imgVertAlignDesktop === 'bottom') {
        return 'dp-logo__img--desktop-bottom'
      } else return 'dp-logo__img--desktop-ver-center'
    },
    horizAlignDesktop() {
      if (this.imgHorizAlignDesktop === 'left') {
        return 'dp-logo__img--desktop-left'
      } else if (this.imgHorizAlignDesktop === 'right') {
        return 'dp-logo__img--desktop-right'
      } else return 'dp-logo__img--desktop-hori-center'
    }
  }
}
</script>
