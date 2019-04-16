<template>
  <a class="dp-cta-tile dp-tile dp-tile__outline dp-blog" :href="link" :target="openNewTab ? '_blank' : '_self'">
    <span class="dp-cta-tile__text-container">
      <span class="dp-cta-tile__text-container__title">
        <span>{{ title }}</span>
        <slot name=iconTitle><i class="fa fa-arrow-right"></i></slot>
      </span>
      <span class="dp-cta-tile__text-container__caption">
        <span class="dp-p--sub dp-cta-tile__text-container__caption__text">{{ caption }}</span>
        <span class="dp-cta-tile__icon-container--mobile">
          <slot name="iconMobile"></slot>
        </span>
      </span>
    </span>
    <span class="dp-cta-tile__icon-container--desktop">
      <slot name="iconDesktop"></slot>
    </span>
  </a>
</template>

<script>

export default {
  name: 'dp-cta-tile',
  props: {
    title: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    openNewTab: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/modules/cta-tile';
</style>
