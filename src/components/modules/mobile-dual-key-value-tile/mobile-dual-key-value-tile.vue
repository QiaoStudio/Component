<template>
  <div class="dp-mobile-dual-key-value-tile">
    <div class="dp-mobile-dual-key-value-tile__tile">
      <div class="dp-tile">
        <div class="dp-mobile-dual-key-value-tile__exclusive" v-show="exclusiveMessage.visible">
          <dp-exclusive :message-tip="exclusiveMessage.content">
          </dp-exclusive>
        </div>
        <div class="dp-mobile-dual-key-value-tile__logo">
          <dp-logo
            :src="insurerLogo"
            :insurer-name="insurerName"
            :plan-name="planName"
            :alt="alt"
            :max-width="maxWidth"
            :max-height="maxHeight"
            :container-width="containerWidth"
            :container-height="containerHeight"
            :img-vert-alignmobile="imgVertAlignMobile"
            :img-vert-align-desktop="imgVertAlignDesktop"
            :img-horiz-align-mobile="imgHorizAlignMobile"
            :img-horiz-align-desktop="imgHorizAlignDesktop"
            style="padding-bottom: 16px; padding-left: 0px; padding-right: 0px; padding-top: 12px; padding-bottom: 12px; margin-left: 16px; margin-right: 16px;">
          </dp-logo>
        </div>
        <div class="dp-mobile-dual-key-value-tile__hr"></div>
        <div class="dp-mobile-dual-key-value-tile__promotion" v-show="promotion.visible">
          <dp-promotion
            :promotion-summary="promotion.summary"
            :action-label="promotion.actionLabel">
          </dp-promotion>
        </div>
        <div class="dp-mobile-dual-key-value-tile__body">
          <dp-key-value-with-label
            :top-label="topLabel1"
            :value-from="valueFrom1"
            :value-to="valueTo1"
            :asterisk-visible="asteriskVisible1"
            :bottom-label="bottomLabel1"
            :align-mobile="alignMobile1"
            :align-desktop="alignDesktop1"
            class="key-value1">
          </dp-key-value-with-label>
          <dp-key-value-with-label
            :top-label="topLabel2"
            :value-from="valueFrom2"
            :value-to="valueTo2"
            :asterisk-visible="asteriskVisible2"
            :bottom-label="bottomLabel2"
            :align-mobile="alignMobile2"
            :align-desktop="alignDesktop2"
            class="key-value2">
          </dp-key-value-with-label>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/modules/mobile-dual-key-value-tile';
</style>
<script>
export default {
  name: 'dp-mobile-dual-key-value-tile',
  props: {
    exclusiveMessage: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    insurerLogo: {
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
    insurerName: {
      type: String,
      default: ''
    },
    planName: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    promotion: {
      type: Object,
      default() {
        return {
          visible: true,
          summary: '',
          actionLabel: ''
        }
      }
    },
    topLabel1: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    valueFrom1: {
      type: [Number, String],
      default: ''
    },
    valueTo1: {
      type: [Number, String],
      default: ''
    },
    asteriskVisible1: true,
    bottomLabel1: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    alignMobile1: {
      type: String,
      default: 'center'
    },
    alignDesktop1: {
      type: String,
      default: 'left'
    },
    topLabel2: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    valueFrom2: {
      type: [Number, String],
      default: ''
    },
    valueTo2: {
      type: [Number, String],
      default: ''
    },
    asteriskVisible2: {
      type: Boolean,
      default: true
    },
    bottomLabel2: {
      type: Object,
      default() {
        return {
          visible: true,
          content: ''
        }
      }
    },
    alignMobile2: {
      type: String,
      default: 'center'
    },
    alignDesktop2: {
      type: String,
      default: 'left'
    }
  }
}
</script>
