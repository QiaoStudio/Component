<template>
  <component
    :is="rootTag"
    :href="url"
    :target="target"
    class="dp-tile__article"
    :class="{
      [`dp-tile__article--${type}`]: type !== '',
      'dp-tile__article--stacked': isStacked,
      'dp-tile': type.trim() !== 'x-small'
    }"
  >
    <component
      :is="childTag"
      class="dp-tile__img-wrap">
      <slot name="img"></slot>
    </component>
    <component
      :is="childTag"
      class="dp-tile__content">
      <slot name="title"></slot>
      <slot name="desc"></slot>
      <p class="dp-tile__info">
        <slot name="label"></slot>
        <slot name="author"></slot>
        <slot name="date"></slot>
      </p>
    </component>
  </component>
</template>
<style lang="scss">
@import '~assets/css/modules/article-tile';
</style>

<script>
export default {
  name: 'dp-article-tile',
  props: {
    type: {
      type: String,
      default: 'large'
    },
    isStacked: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: null
    }
  },
  computed: {
    tileArticleClass() {
      if (this.type.trim() !== '') {
        return 'dp-tile__article--' + this.type
      }
    },
    enableTileStyle() {
      return this.type.trim() !== 'x-small'
    },
    rootTag() {
      if (this.url && this.url.trim()) {
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
