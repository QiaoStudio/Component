<template>
  <div class="dp-article-header">
    <template v-if="isDesktop">
      <div>
        <dp-breadcrumbs :levels="levels" />
        <h1 class="dp-title" v-html="title" />
        <div class="dp-theme-article">
          <dp-author-byline
            :author="author.author"
            :author-avatar="author.authorAvatar"
            :alt="author.alt"
            :time="author.time"
            :max-width="author.maxW"
            :max-height="author.maxH"
            :is-span-wrap="author.isSpanWrap"
            :formatter="author.formatter"
            :href="author.href">
          </dp-author-byline>
        </div>
      </div>
      <div>
        <div v-lazyload
             class="dp-article-header__image">
          <img :src="imageUrl" :alt="imageAlt">
          <dp-loader />
        </div>
      </div>
    </template>
    <template v-else>
      <dp-breadcrumbs :levels="levels" />
      <h1 class="dp-title" v-html="title" />
      <div v-lazyload
           class="dp-article-header__image">
        <img :src="$screen.mobile() ? mobileImageUrl : imageUrl" :alt="imageAlt">
        <dp-loader />
      </div>
      <div class="dp-theme-article">
        <dp-author-byline
          :author="author.author"
          :author-avatar="author.authorAvatar"
          :alt="author.alt"
          :time="author.time"
          :max-width="author.maxW"
          :max-height="author.maxH"
          :is-span-wrap="author.isSpanWrap"
          :formatter="author.formatter"
          :href="author.href">
        </dp-author-byline>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import '~assets/css/modules/article-header';
</style>

<script>
import LazyLoad from '../../../directives/lazy-load-image'
import Loader from 'elements/loader'
import Breadcrumbs from 'elements/breadcrumbs'
import AuthorByline from 'modules/author-byline'
export default {
  name: 'dp-article-header',
  components: {
    [Loader.name]: Loader,
    [Breadcrumbs.name]: Breadcrumbs,
    [AuthorByline.name]: AuthorByline
  },
  props: {
    levels: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      required: false,
      default: 'image'
    },
    imageUrl: {
      type: String,
      required: true
    },
    mobileImageUrl: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      required: true
    }
  },
  computed: {
    isDesktop() {
      return this.$screen.resize && this.$screen.desktop()
    }
  },
  directives: {
    lazyload: LazyLoad
  }
}
</script>
