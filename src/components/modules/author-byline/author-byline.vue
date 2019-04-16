<template>
  <div class="dp-author__byline">
    <div class="dp-author__img-wrap" :style="imageStyle" v-if="isAvatarShow">
      <img :alt="alt" :src="authorAvatar" />
    </div>
    <div class="dp-author__content">
      <span class="dp-span--sm" :class="{'dp-span-wrap': spanWrap}">
        <span class="dp-author-wrap" :class="{'dp-author-name' : !isAvatarShow}">By<a :href="hrefValue" >{{ author }}</a></span>
        <span class="dp-date-wrap">last updated {{ updateTime }}</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@import '~assets/css/modules/author-byline';
</style>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'dp-author-byline',
  props: {
    author: {
      type: String,
      default: ''
    },
    authorAvatar: {
      type: String
    },
    alt: {
      type: String
    },
    time: {
      type: [Number, String, Date]
    },
    maxHeight: {
      type: Number
    },
    maxWidth: {
      type: Number
    },
    isSpanWrap: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: String,
      default: 'DD MMM YYYY'
    },
    href: {
      type: String
    }
  },
  computed: {
    isMobile() {
      return this.$screen.resize && this.$screen.mobile()
    },
    spanWrap() {
      return this.isSpanWrap || this.isMobile
    },
    isAvatarShow() {
      return !(this.authorAvatar === null || _.trim(this.authorAvatar) === '')
    },
    imageStyle() {
      return {
        maxWidth: this.maxWidth ? this.maxWidth + 'px' : '',
        maxHeight: this.maxHeight ? this.maxHeight + 'px' : ''
      }
    },
    updateTime() {
      if (!this.time) return null
      return moment(this.time).format(this.formatter)
    },
    hrefValue() {
      if (!this.href || _.trim(this.href) === '') return null
      return this.href
    }
  }
}
</script>
