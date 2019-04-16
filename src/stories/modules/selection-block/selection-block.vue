<template>
  <dp-selection-block
    :image-url="imageUrlData"
    :layout="layout"
    :text="textData"
    :selected="selected"
    :style="style"
    @click="onClick">
  </dp-selection-block>
</template>
<script>
import termLifeImage from './term-life.png'

const layouts = {
  Default: '',
  Hrizontal: 'horizontal'
}
export default {
  data() {
    return {
      layout: select('Layout', layouts, ''),
      text: text('Text', 'Cancer care'),
      selected: false,
      enableImage: boolean('Enable Image', true),
      enableText: boolean('Enable Text', true),
      imageUrl: text('Image url', termLifeImage)
    }
  },
  computed: {
    imageUrlData() {
      return this.enableImage ? this.imageUrl : ''
    },
    textData() {
      return this.enableText ? this.text : ''
    },
    style() {
      return this.layout !== 'horizontal'
        ? 'width: 150px; height: 150px'
        : 'width: 250px;'
    }
  },
  methods: {
    onClick() {
      this.selected = !this.selected
    }
  }
}
</script>
