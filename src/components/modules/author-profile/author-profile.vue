<template>
  <div class="dp-author-profile">
    <div class="dp-author-profile__avatar" v-if="isAvatarShow">
      <img :src="authorAvatar" :alt="alt">
    </div>
    <div class="dp-author-profile__content-wrap">
      <div class="dp-theme-article">
        <h2 class="dp-title dp-author-profile__author">{{ author }}</h2>
      </div>
      <div class="dp-theme-blog">
        <p class="dp-p--sub dp-author-profile__description">{{ description }}</p>
      </div>
      <a class="dp-author-profile__link-button dp-link dp-link--author-profile"
         v-if="isLinkButtonShow"
         :href="getLinkUrl">
        {{ linkButtonText }}
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import '~assets/css/modules/author-profile';
</style>

<script>
import _ from 'lodash'

export default {
  name: 'dp-author-profile',
  props: {
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    authorAvatar: {
      type: String
    },
    linkButtonText: {
      type: String
    },
    linkUrl: {
      type: String
    },
    alt: {
      type: String
    }
  },
  computed: {
    isAvatarShow() {
      return !(this.authorAvatar === null || _.trim(this.authorAvatar) === '')
    },
    isLinkButtonShow() {
      return !(this.linkButtonText === null || _.trim(this.linkButtonText) === '')
    },
    getLinkUrl() {
      return _.trim(this.linkUrl) || undefined
    }
  }
}
</script>
