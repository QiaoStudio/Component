<template>
  <div class="dp-popover"
       :class="{ 'dp-popover--disabled': disabled }">
    <div v-if="display" v-html="display"></div>
    <div v-else>
      <i class="fa fa-question-circle" aria-hidden="true"></i>
    </div>
    <transition name="fade">
      <div class="dp-popover__popup"
           :class="[{'dp-popover__popup-error': errorPopup}, popoverClass]"
           ref="popper"
           v-show="isShow"
           :style="popperStyle">
        <div class="dp-popover__title" v-if="title">
          <h3 v-html="title"></h3>
        </div>
        <div class="dp-popover__content">
          <slot name="content">
            <div v-html="content"></div>
          </slot>
        </div>
        <div class="dp-popover__arrow" x-arrow></div>
        <div class="dp-popover__close" v-if="closeLabel">{{ closeLabel }}</div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  @import '~assets/css/elements/popover';
  @import '~assets/css/elements/error-popup';
</style>

<script>
import _ from 'lodash'
export default {

  name: 'dp-popover',

  props: {
    title: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: '<i class="fa fa-question-circle" aria-hidden="true"></i>'
    },
    content: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    closeLabel: {
      type: String
    },
    placement: {
      type: String,
      default: 'top'
    },
    always: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorPopup: {
      type: Boolean,
      default: false
    },
    popoverClass: {
      type: String
    },
    offsetOption: {
      type: Object,
      default: function() {
        return {}
      }
    },
    preventOverflowOption: {
      type: Object,
      default: function() {
        return {}
      }
    },
    flipPosition: {
      type: [Array, String],
      validator: value => {
        if (Array.isArray(value)) {
          return _.difference(value, ['top', 'right', 'bottom', 'left']).length === 0 && value.length !== 0
        } else if (typeof value === 'string') {
          return ['flip', 'clockwise', 'counterclockwise'].indexOf(value) >= 0
        }
      },
      default: 'flip'
    }
  },
  data() {
    return {
      reference: null,
      popper: null,
      isShow: false,
      isMobile: false,
      bodyEl: typeof document === 'undefined' || document.body,
      classMobile: 'dp-popover--mobile',
      classClose: 'dp-popover__close',
      classOpened: 'dp-popover--opened',
      popporOptions: {}
    }
  },

  computed: {
    popperStyle() {
      if (this.width && this.width !== 276) {
        return { width: `${this.width}px`, maxWidth: 'none' }
      }
      return null
    },
    mobileView() {
      if (typeof this.$screen !== 'undefined') {
        return this.$screen.resize && this.$screen.mobile()
      } else {
        return false
      }
    }
  },

  watch: {
    disabled(val) {
      if (!val) {
        this.runPopper()
      } else {
        this.destroy()
      }
    }
  },

  methods: {

    hidePopper() {
      if (this.trigger !== 'hover') this.isShow = false
      this.timer = setTimeout(() => {
        this.isShow = false
        this.popperTimer = setTimeout(() => {
          if (this.popper !== null) {
            this.popper.destroy() // destroy popper when hide
            this.popper = null
          }
          this.removePopoverClass(this.bodyEl, this.classOpened)
        }, 300)
      }, 300)
    },

    showPopper() {
      this.isShow = true
      this.addPopoverClass(this.bodyEl, this.classOpened)
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
    },

    resizePopper() {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.mobileView) {
          this.isMobile = true
          this.addPopoverClass(this.bodyEl, this.classMobile)
        } else {
          this.isMobile = false
          this.removePopoverClass(this.bodyEl, this.classMobile)
        }
        this.removePopoverClass(this.bodyEl, this.classOpened)
        this.destroy()
        this.runPopper()
      }, 500)
    },

    createInstance() {
      // this.isShow = true
      this.showPopper()
      if (this.popper) {
        this.popper.update()
        return
      }
      const placementMapper = {
        top: 'top',
        left: 'left',
        right: 'right',
        bottom: 'bottom',
        topLeft: 'top-end',
        topRight: 'top-start',
        leftTop: 'left-end',
        leftBottom: 'left-start',
        bottomLeft: 'bottom-end',
        bottomRight: 'bottom-start',
        rightTop: 'right-end',
        rightBottom: 'right-start',
        auto: 'auto'
      }
      const placement = placementMapper[this.placement] ? placementMapper[this.placement] : 'bottom'
      const always = this.always
      const flipPosition = this.flipPosition
      const offsetOption = this.offsetOption
      const preventOverflowOption = this.preventOverflowOption
      const reference = this.reference = this.reference || this.$el.children[0]
      const popperEl = this.$refs.popper
      this.popperOptions = {
        placement,
        always,
        modifiers: {
          flip: {
            behavior: flipPosition
          },
          preventOverflow: preventOverflowOption,
          offset: offsetOption
        }
      }
      if (this.appendToBody) {
        this.bodyEl.appendChild(popperEl)
      } else {
        let rootEl = document.querySelector('#root')
        rootEl.appendChild(popperEl)
      }
      if (!this.$isServer) {
        const Popper = require('popper.js').default
        this.popper = new Popper(reference, popperEl, this.popperOptions)
      }
    },

    handleClick(e) {
      e.stopPropagation()
      if (this.$el.contains(e.target)) {
        if (this.isShow) {
          // this.isShow = false
          this.hidePopper()
        } else {
          this.createInstance()
        }
      } else {
        // this.isShow = false
        /*eslint-disable */
        if (this.isShow) this.hidePopper()
        /*eslint-disable */
      }
    },

    bindEvent() {
      const reference = this.reference = this.reference || this.$el.children[0]
      const popper = this.$refs.popper
      if (!reference || !popper) return
      if (!(this.mobileView) && this.trigger === 'hover') {
        reference.addEventListener('mouseenter', this.createInstance)
        reference.addEventListener('mouseleave', this.hidePopper)
        popper.addEventListener('mouseenter', this.showPopper)
        popper.addEventListener('mouseleave', this.hidePopper)
      } else {
        reference.addEventListener('click', this.handleClick)
        popper.addEventListener('click', this.showPopper)
        document.documentElement.addEventListener('click', this.handleClick)
        // on mobile, unbind hover events, force click event
        if (this.isMobile) {
          reference.removeEventListener('mouseenter', this.createInstance)
          reference.removeEventListener('mouseleave', this.hidePopper)
          popper.removeEventListener('mouseenter', this.showPopper)
          popper.removeEventListener('mouseleave', this.hidePopper)
        }
      }
      window.addEventListener('resize', this.resizePopper)
    },

    runPopper() {
      if (this.disabled) return
      if (this.always) {
        this.createInstance()
      } else {
        this.bindEvent()
      }
      if (this.mobileView) {
        this.addPopoverClass(this.bodyEl, this.classMobile)
      }
    },

    addPopoverClass(el, cls) {
      if(!el.classList.contains(cls)) {
        el.classList.add(cls)
      }
    },

    removePopoverClass(el, cls) {
      if(el.classList.contains(cls)) {
        el.classList.remove(cls)
      }
    },

    destroy() {
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
    },

    removeEvent() {
      if (!this.reference) return
      const popper = this.$refs.popper
      if (this.trigger === 'click') {
        this.reference.removeEventListener('click', this.handleClick)
        popper.removeEventListener('click', this.showPopper)
        document.documentElement.removeEventListener('click', this.handleClick)
      } else {
        this.reference.removeEventListener('mouseenter', this.createInstance)
        this.reference.removeEventListener('mouseleave', this.hidePopper)
        if (this.isMobile) {
          popper.removeEventListener('mouseenter', this.showPopper)
          popper.removeEventListener('mouseleave', this.hidePopper)
        }
      }
      window.removeEventListener('resize', this.resizePopper)
      this.removePopoverClass(this.bodyEl, this.classMobile) // remove popover mobile style
      this.removePopoverClass(this.bodyEl, this.classOpened) // remove popover opened style
    }

  },

  mounted() {
    this.runPopper()
  },

  beforeDestroy() {
    this.removeEvent()
    this.$refs.popper.remove()
    this.destroy()
  }
}
</script>
