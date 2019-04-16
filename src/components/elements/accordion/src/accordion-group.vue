<template>
  <div :class="['dp-accordion-group', titleBorder && 'is-title-bordered']">
    <div class="accordion-group__title">
      <slot name="title">Accordion Group Title</slot>
    </div>
    <div class="accordion-group__items">
      <slot name="accordion"></slot>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/accordion';
</style>
<script>
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import { KeyboardInteractionForList } from 'utilities/mixins/keyboard-interaction'
export default {
  name: 'dp-accordion-group',
  mixins: [KeyboardInteractionForList],
  props: {
    titleBorder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyboardSettings: {
        itemSelector: '.accordion__header',
        backwardKeys: [KEY_VALUES.ARROW_UP],
        forwardKeys: [KEY_VALUES.ARROW_DOWN],
        onSelect: this.select,
        getDefaultFocus: this.getDefaultFocus
      }
    }
  },
  methods: {
    select (e) {
      e.dispatchEvent(new Event('click'))
    },
    getDefaultFocus (items) {
      return items.reduce((result, current) => {
        if (result.parentElement.classList.contains('dp-accordion--expanded')) {
          return result
        }
        return current.parentElement.classList.contains('dp-accordion--expanded') ? current : result
      })
    }
  }
}
</script>
