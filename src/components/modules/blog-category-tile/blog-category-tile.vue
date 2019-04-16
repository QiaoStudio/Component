<template>
  <component :href="link" :target="target" :is="rootTag" class="dp-blog-category-tile dp-tile">
    <component :is="childTag" class="dp-blog-category-tile__img-wrap">
      <slot name="img"></slot>
    </component>
    <component :is="childTag" class="dp-blog-category-tile__content">
      <slot name="title"></slot>
      <component :is="childTag" class="dp-blog-category-tile__content-desc">
        <slot name="description"></slot>
      </component>
    </component>
  </component>
</template>
<style lang="scss">
@import '~assets/css/modules/blog-category-tile';
</style>
<script>

export default {
  name: 'dp-blog-category-tile',
  props: {
    link: {
      type: String,
      default: null,
      required: false
    },
    target: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    rootTag() {
      if (this.link && this.link.trim()) {
        return 'a'
      }
      return 'div'
    },
    childTag() {
      if (this.rootTag === 'a') {
        return 'span'
      }
      return 'div'
    }
  }
}
</script>
