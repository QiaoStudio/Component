<template>
  <div :class="['dp-accordion',
                expanded && 'dp-accordion--expanded',
                iconPosition && `dp-accordion--icon-${iconPosition}`]">
    <div class="accordion__header"
         @click="toggle">
      <slot name="header">
        <span>Accordion Title</span>
      </slot>
    </div>
    <transition name="dp-accordion"
                @enter="onEnter"
                @after-enter="afterEnter"
                @leave="onLeave"
                @after-leave="afterLeave">
      <div class="accordion__body"
           v-show="expanded">
        <div class="accordion__body-inner">
          <slot>Accordion Body</slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/accordion';
</style>
<script>
import DOM from 'utilities/dom'

export default {
  name: 'dp-accordion',
  props: {
    iconPosition: {
      type: String,
      validator: val => ['left', 'right'].includes(val),
      default: 'left'
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize, false)
    window.addEventListener('orientationchange', this.handleResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize, false)
    window.removeEventListener('orientationchange', this.handleResize, false)
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
    onEnter(el) {
      el.style.height = 0
      DOM.reflow(el)
      el.style.height = el.scrollHeight + 'px'
    },
    afterEnter(el) {
      el.style.height = null
    },
    onLeave(el) {
      el.style.height = 'auto'
      el.style.display = 'block'
      el.style.height = el.getBoundingClientRect().height + 'px'
      DOM.reflow(el)
      el.style.height = 0
    },
    afterLeave(el) {
      el.style.height = null
    },
    handleResize() {
      this.expanded = this.$el.classList.contains('dp-accordion--expanded')
    }
  }
}
</script>
