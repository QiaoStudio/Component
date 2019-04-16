<template>
  <component :is="rootTag" class="dp-tile__article-with-snippet" :target="target" :href="link"
             :class="{'dp-tile--snippet-bottom': isBottomSnippet,
                      'dp-tile--snippet-stacked': isStackedSnippet,
                      'dp-tile--snippet-right': isRightSnippet}">
    <component :is="childTag" class="dp-tile__img-wrap">
      <slot name="img"></slot>
    </component>
    <component :is="childTag" class="dp-tile__label">
      <slot name="label"></slot>
    </component>
    <component :is="childTag" class="dp-tile__content">
      <slot name="title"></slot>
      <slot name="snippet"></slot>
      <component :is="childTag" class="dp-tile__info">
        <slot name="author"></slot>
        <slot name="date"></slot>
      </component>
    </component>
  </component>
</template>

<style lang="scss">
@import '~assets/css/modules/article-tile-with-snippet';
</style>
<script>
export default {
  name: 'dp-article-tile-with-snippet',
  props: {
    snippetPosition: {
      type: String,
      required: true,
      default: 'right'
    },
    isStacked: {
      type: Boolean,
      default: false,
      required: false
    },
    link: {
      type: String,
      default: '',
      required: false
    },
    target: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    isStackedSnippet() {
      return this.isBottomSnippet && this.isStacked
    },
    isRightSnippet() {
      return this.snippetPosition === 'right'
    },
    isBottomSnippet() {
      return this.snippetPosition === 'bottom'
    },
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
