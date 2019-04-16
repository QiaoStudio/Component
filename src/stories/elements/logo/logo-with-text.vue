<template>
  <div :class="[nationalType]">
    <dp-logo
      :max-width="maxW"
      :max-height="maxH"
      :container-width="containerWidth"
      :container-height="containerHeight"
      :img-vert-align-mobile="imgVertAlignMobile"
      :img-vert-align-desktop="imgVertAlignDesktop"
      :img-horiz-align-mobile="imgHorizAlignMobile"
      :img-horiz-align-desktop="imgHorizAlignDesktop"
      :src="src"
      :href="href"
      :target="target"
      :insurer-name="insurerName"
      :plan-name="planName"
      :alt="alt"
    ></dp-logo>
  </div>
</template>

<script>
const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}
export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      src: text('Logo URL', 'https://picsum.photos/62'),
      maxW: number('Max Width in px', 0),
      maxH: number('Max Height in px', 0),
      containerWidth: number('Width of img container', 62),
      containerHeight: number('Height of img container', 62),
      imgVertAlignMobile: text('Vertical alignment of image on mobile', 'center'),
      imgVertAlignDesktop: text('Vertical alignment of image on desktop', 'center'),
      imgHorizAlignMobile: text('Horizontal alignment of image on mobile', 'center'),
      imgHorizAlignDesktop: text('Horizontal alignment of image on desktop', 'center'),
      insurerName: text('Insurer Name', 'FWD'),
      planName: text('Plan Name', 'Premium Assurance Authorised Workshop'),
      alt: text('Logo Alt', 'logo'),
      target: text('Target', '_blank'),
      href: text('Href', 'https://xxxxxx.com')
    }
  }
}
</script>

