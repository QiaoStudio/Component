<template>
  <div style="background: gray;">
    <div style="height: 300px;"></div>
    <dp-mobile-dual-key-value-tile
      :exclusive-message="exclusiveMessage"
      :insurer-logo="insurerLogo"
      :max-width="maxW"
      :max-height="maxH"
      :container-width="containerWidth"
      :container-height="containerHeight"
      :img-vert-align-mobile="imgVertAlignMobile"
      :img-vert-align-desktop="imgVertAlignDesktop"
      :img-horiz-align-mobile="imgHorizAlignMobile"
      :img-horiz-align-desktop="imgHorizAlignDesktop"
      :insurer-name="insurerName"
      :plan-name="planName"
      :alt="alt"
      :promotion="promotion"
      :top-label1="topLabel1"
      :value-from1="valueFrom1"
      :value-to1="valueTo1"
      :asterisk-visible1="asteriskVisible1"
      :bottom-label1="bottomLabel1"
      :align-mobile1="alignMobile1"
      :align-desktop1="alignDesktop1"
      :top-label2="topLabel2"
      :value-from2="valueFrom2"
      :value-to2="valueTo2"
      :asterisk-visible2="asteriskVisible2"
      :bottom-label2="bottomLabel2"
      :align-mobile2="alignMobile2"
      :align-desktop2="alignDesktop2">
    </dp-mobile-dual-key-value-tile>
  </div>
</template>
<script>
const alignOptions = {
  left: 'left',
  right: 'right',
  center: 'center'
}
export default {
  data() {
    return {
      exclusiveMessage: {
        visible: boolean('Is Exclusive Message visible', true),
        content: text('Exclusive message', 'Available only on GoBear')
      },
      insurerLogo: text('Insurer logo source', 'https://picsum.photos/62'),
      maxW: number('Max Width of image inside in px', 0),
      maxH: number('Max Height of image inside in px', 0),
      containerWidth: number('Width of img container', 62),
      containerHeight: number('Height of img container', 62),
      imgVertAlignMobile: text('Vertical alignment of image on mobile', 'center'),
      imgVertAlignDesktop: text('Vertical alignment of image on desktop', 'center'),
      imgHorizAlignMobile: text('Horizontal alignment of image on mobile', 'center'),
      imgHorizAlignDesktop: text('Horizontal alignment of image on desktop', 'center'),
      alt: text('Logo Alt', 'logo'),
      insurerName: text('Insurer name', 'PRUDENTIAL'),
      planName: text('Plan name', 'Phú Đăng Khoa Thành Tài'),
      promotion: {
        visible: boolean('Is promotion visible?', true),
        summary: text('Promotion summary', '50% rebate on first year premium'),
        actionLabel: text('Promotionn action label', '')
      },
      topLabel1: {
        visible: boolean('Is top label 1 visible?', true),
        content: text('Text of top label 1', 'You might get up to')
      },
      valueFrom1: number('Value From 1', 200),
      valueTo1: number('Value To 1', 300),
      asteriskVisible1: boolean('Is asterisk 1 visible?', true),
      bottomLabel1: {
        visible: boolean('Is bottom label 1 visible?', true),
        content: text('Text of bottom label 1', 'million dong at year 15 when the plan is mature')
      },
      alignMobile1: select('Text alignment key value 1 on mobile (left, right or center)', alignOptions, 'center'),
      alignDesktop1: select('Text alignment key value 1 on desktop (left, right or center)', alignOptions, 'left'),
      topLabel2: {
        visible: boolean('Is top label 2 visible?', true),
        content: text('Text of top label 2', 'You might get up to')
      },
      valueFrom2: number('Value From 2', 200),
      valueTo2: number('Value To 2', 300),
      asteriskVisible2: boolean('Is asterisk 2 visible?', true),
      bottomLabel2: {
        visible: boolean('Is bottom label 2 visible?', true),
        content: text('Text of bottom label 2', 'million dong at year 15 when the plan is mature')
      },
      alignMobile2: select('Text alignment key value 2 on mobile (left, right or center)', alignOptions, 'center'),
      alignDesktop2: select('Text alignment key value 2on desktop (left, right or center)', alignOptions, 'left')
    }
  },
  computed: {
    isDesktop() {
      return this.$screen.resize && this.$screen.desktop()
    }
  }
}
</script>
