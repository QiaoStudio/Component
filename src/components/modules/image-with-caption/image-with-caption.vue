<template>
  <figure class="dp-image-with-caption">
    <div class="dp-image-with-caption__image_holder" :style="{width: sizeWithPercent}">
      <div class="dp-image-with-caption__image_holder__image" :style="imageContainerStyle"
           @click.stop="toggleSize()"
           :class="{'dp-image-with-caption__image_holder__image--expanded': expanded, 'dp-image-with-caption__image_holder__image--unexpandable': !isExpandable}">
        <slot name="image"></slot>
        <span v-if="isExpandable && !expanded" class="dp-image-with-caption__image_holder__image__icon">
          <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-772.000000, -169.000000)" fill="#FFFFFF">
                <g transform="translate(330.000000, 165.000000)">
                  <g transform="translate(438.000000, 0.000000)">
                    <path d="M9.8203125,11.0703125 C9.87239609,11.1223961 9.8984375,11.1822913 9.8984375,11.25 C9.8984375,11.3177087 9.87239609,11.3776039 9.8203125,11.4296875 L7.2265625,14.0234375 L8.3515625,15.1484375 C8.45052133,15.2473963 8.5,15.3645827 8.5,15.5 C8.5,15.6354173 8.45052133,15.7526037 8.3515625,15.8515625 C8.25260367,15.9505213 8.13541734,16 8,16 L4.5,16 C4.36458266,16 4.24739633,15.9505213 4.1484375,15.8515625 C4.04947867,15.7526037 4,15.6354173 4,15.5 L4,12 C4,11.8645827 4.04947867,11.7473963 4.1484375,11.6484375 C4.24739633,11.5494787 4.36458266,11.5 4.5,11.5 C4.63541734,11.5 4.75260367,11.5494787 4.8515625,11.6484375 L5.9765625,12.7734375 L8.5703125,10.1796875 C8.62239609,10.1276039 8.68229133,10.1015625 8.75,10.1015625 C8.81770867,10.1015625 8.87760391,10.1276039 8.9296875,10.1796875 L9.8203125,11.0703125 Z M16,4.5 L16,8 C16,8.13541734 15.9505213,8.25260367 15.8515625,8.3515625 C15.7526037,8.45052133 15.6354173,8.5 15.5,8.5 C15.3645827,8.5 15.2473963,8.45052133 15.1484375,8.3515625 L14.0234375,7.2265625 L11.4296875,9.8203125 C11.3776039,9.87239609 11.3177087,9.8984375 11.25,9.8984375 C11.1822913,9.8984375 11.1223961,9.87239609 11.0703125,9.8203125 L10.1796875,8.9296875 C10.1276039,8.87760391 10.1015625,8.81770867 10.1015625,8.75 C10.1015625,8.68229133 10.1276039,8.62239609 10.1796875,8.5703125 L12.7734375,5.9765625 L11.6484375,4.8515625 C11.5494787,4.75260367 11.5,4.63541734 11.5,4.5 C11.5,4.36458266 11.5494787,4.24739633 11.6484375,4.1484375 C11.7473963,4.04947867 11.8645827,4 12,4 L15.5,4 C15.6354173,4 15.7526037,4.04947867 15.8515625,4.1484375 C15.9505213,4.24739633 16,4.36458266 16,4.5 Z"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
      <p class="dp-image-with-caption__image_holder__text dp-p--sm">
        <slot name="caption"></slot>
      </p>
    </div>
  </figure>
</template>

<script>
import _ from 'lodash'

const minOf = (...vals) => {
  return vals.reduce((min, val) => min > val ? val : min)
}

const scaleOf = (window, image) => {
  let originalScale = image.naturalWidth / image.width
  let windowWidthScale = window.innerWidth / image.width
  let windowHeightScale = window.innerHeight / image.height
  return minOf(originalScale, windowWidthScale, windowHeightScale)
}

const distanceMiddleOfWindow = (window, imageContainer) => {
  let y = (window.innerHeight - imageContainer.getBoundingClientRect().height) / 2
  return (y - imageContainer.getBoundingClientRect().y)
}
const distanceCenterWindow = (window, imageContainer) => {
  let x = (window.innerWidth - imageContainer.getBoundingClientRect().width) / 2
  return (x - imageContainer.getBoundingClientRect().x)
}
const SELECTORS = {
  IMAGE_CONTAINER: '.dp-image-with-caption__image_holder__image',
  IMAGE: '.dp-image-with-caption__image_holder__image img'
}

export default {
  name: 'dp-image-with-caption',
  data() {
    return {
      loaded: false,
      expanded: false,
      imageContainerStyle: {}
    }
  },
  props: {
    sizeImage: {
      type: Number,
      default: 100,
      validator: value => {
        return value && value <= 100
      }
    }
  },
  computed: {
    isExpandable() {
      return this.loaded && this.scale > 1
    },
    scale() {
      return this.$screen.resize && scaleOf(window, this.find(SELECTORS.IMAGE))
    },
    sizeWithPercent() {
      return this.sizeImage && this.sizeImage <= 100 ? this.sizeImage + '%' : ''
    }
  },
  mounted() {
    document.addEventListener('scroll', _.throttle(() => {
      if (this.expanded) this.unzoom()
    }, 500))
    this.find(SELECTORS.IMAGE)
      .addEventListener('load', this.initState)
  },
  methods: {
    initState() {
      this.loaded = true
    },
    toggleSize() {
      if (this.expanded) {
        this.unzoom()
      } else {
        this.zoom()
      }
    },
    zoom() {
      if (this.scale <= 1) {
        return
      }
      let imageContainer = this.find(SELECTORS.IMAGE_CONTAINER)
      let zoomStyling = [
        `scale(${this.scale})`,
        `translateY(${distanceMiddleOfWindow(window, imageContainer) / this.scale}px)`,
        `translateX(${distanceCenterWindow(window, imageContainer) / this.scale}px)`
      ].join(' ')
      this.imageContainerStyle = { transform: zoomStyling }
      this.expanded = true
      document.body.classList.add('zooming')
    },
    unzoom() {
      this.imageContainerStyle = {}
      this.expanded = false
      document.body.classList.remove('zooming')
    },
    find(selector) {
      return this.$el.querySelector(selector)
    }
  },
  detroy() {
    document.removeEventListener('scroll', this.unzoom)
  }
}
</script>

<style lang="scss">
@import '~assets/css/modules/image-with-caption'
</style>
