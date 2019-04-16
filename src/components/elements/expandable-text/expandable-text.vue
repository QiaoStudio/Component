<template>
  <div class="dp-expandable-text"
       :style="componentStyles">
    <p class="dp-expandable-text__content"
       ref="container"
       :style="contentStyle">
      {{ shortContent }}<span ref="measureExtra"
                              v-if="showReadMore"
                              class="dp-expandable-text__measure-extra">... <button :style="componentStyles" ref="btnReadMore" tabindex="0"
                                                                                    @click="onReadMore">{{ readMoreText }}</button>
      </span>
    </p>
    <canvas ref="canvas"
            :class="canvasClass"></canvas>
  </div>
</template>

<script>
import domHelper from 'utilities/dom'

export default {
  name: 'dp-expandable-text',
  components: {},
  props: {
    content: { type: String, default: '' },
    displayLines: { type: Number, default: 2 },
    readMoreText: { type: String, default: 'Read more' },
    fontSize: { type: Number, default: 12 },
    lineHeight: { type: Number, default: 15 }
  },
  data() {
    return {
      shortContent: '',
      extraText: `... ${this.readMoreText} `,
      showReadMore: false,
      contentStyle: { visibility: 'hidden' },
      canvasClass: 'hidden',
      componentStyles: {}
    }
  },
  created() {
    this.shortContent = this.content
    this.componentStyles = {
      fontSize: `${this.fontSize}px`,
      lineHeight: `${this.lineHeight}px`
    }
  },
  mounted() {
    domHelper.onWindowLoad(this.initStyle)
  },
  methods: {
    // this method is defined for testing purpose only
    getContainerHeight() {
      return this.$refs.container.offsetHeight
    },
    onReadMore() {
      this.showReadMore = false
      this.shortContent = this.content
      this.contentStyle = {
        maxHeight: '100vh',
        transition: 'max-height 200ms ease-in'
      }
    },
    calculateShortContent(containerStyles) {
      const { canvas } = this.$refs
      const context = canvas.getContext('2d')

      // should substract 5px to make sure link Read more is displayed at last line
      canvas.width = parseInt(containerStyles.getPropertyValue('width')) - 5
      context.font = containerStyles.getPropertyValue('font')
      const { width: maxWidth } = canvas
      let noOfLines = 1
      const words = this.content.split(' ')
      let shortContent = ''

      let line = this.extraText
      for (const word of words) {
        const testText = `${line}${word} `
        const lineWidth = context.measureText(testText).width
        if (lineWidth <= maxWidth) {
          line += `${word} `
        } else {
          shortContent += line
          if (noOfLines < this.displayLines) {
            noOfLines++
            line = `${word} `
          } else {
            line = ''
            break
          }
        }
      }
      if (line) shortContent += line
      return shortContent.replace(this.extraText, '').trim()
    },
    initStyle() {
      const {container} = this.$refs
      const compStyles = window.getComputedStyle(container)
      const lineHeight = parseInt(compStyles.getPropertyValue('line-height'))
      const lines = this.getContainerHeight() / lineHeight

      if (lines > this.displayLines) {
        const height = this.displayLines * lineHeight
        this.contentStyle = {
          maxHeight: `${height}px`
        }
        this.showReadMore = true
        this.shortContent = this.calculateShortContent(compStyles)
      } else {
        this.contentStyle = {}
      }
      this.canvasClass = 'disappear'
    }
  }
}
</script>

<style lang="scss">
@import "~assets/css/elements/expandable-text";
</style>
