<template>
  <header :class="{
            'dp-navbar--fixed': isFixed
          }"
          class="dp-navbar"
          ref="navbar">
    <div :class="{
           'dp-navbar__menu--active': isScrolled || isActive,
           'dp-navbar__no-transition': noTransition
         }"
         class="dp-navbar__menu">
      <div class="dp-navbar__brand">
        <dp-brand :country="brand.country"
                  :type="brand.type"
                  :fallback-logo="brand.fallbackLogo"
                  :fallback-tagline="brand.fallbackTagline" />
      </div>
      <div class="dp-navbar__items"
           @mouseenter="isHovered(true)"
           @mouseleave="isHovered(false)">
        <div class="dp-navbar__items--desktop">
          <div :class="{ 'dp-navbar__bg-wrapper--show': showBackground }"
               class="dp-navbar__bg-wrapper">
            <div ref="navbarBackground"
                 :class="{ 'dp-navbar__bg--animate': isAnimate }"
                 class="dp-navbar__bg" />
          </div>
          <nav>
            <ul>
              <template v-for="(item, index) in menuItems">
                <li v-if="item.megamenu && item.megamenu.length"
                    :key="index"
                    :ref="`navbarItem_${index}`"
                    :class="{ 'dp-navbar__item--active': item.active }"
                    class="dp-navbar__item"
                    @mouseenter="showContent($event, index)"
                    @mouseleave="hideContent($event, index)">
                  <a :href="item.url || '#'">
                    <span>
                      {{ item.label }}
                      <i class="fa fa-caret-down dp-button__icon--right"
                         aria-hidden="true"></i>
                    </span>
                  </a>
                </li>
                <li v-else
                    :key="index">
                  <dp-button :href="item.url"
                             class="dp-navbar__item dp-button--sm dp-button--text">
                    <span>{{ item.label }}</span>
                  </dp-button>
                </li>
              </template>
              <li v-if="hasRightSlot"
                  class="dp-navbar__right">
                <slot name="right"></slot>
              </li>
            </ul>
          </nav>
        </div>
        <div class="dp-navbar__items--mobile">
          <a class="dp-navbar__toggle"
             href="#"
             @click.prevent="openMobileMenu">
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </a>
        </div>
      </div>
    </div>
    <div class="dp-navbar__content"
         ref="navbarContent">
      <transition-group name="no-mode-translate-fade"
                        tag="ul"
                        @enter="transEnter">
        <template v-for="(item, index) in menuItems">
          <li class="dp-navbar__sub"
              v-show="item.megamenu && item.megamenu.length && item.active"
              :key="item.label"
              :ref="`navbarContent_${index}`"
              :data-sub-index="index"
              @mouseenter="subEnter($event, index)"
              @mouseleave="subLeave($event, index)">
            <dp-megamenu :columns="item.megamenu" />
          </li>
        </template>
      </transition-group>
    </div>
  </header>
</template>

<style lang="scss">
@import '~assets/css/modules/_navbar.scss';
</style>

<script>
import DpBrand from 'elements/brand'
import DpMegamenu from 'elements/megamenu'
import DpButton from 'elements/button'
export default {
  name: 'dp-navbar',
  components: {
    [DpBrand.name]: DpBrand,
    [DpMegamenu.name]: DpMegamenu,
    [DpButton.name]: DpButton
  },
  props: {
    isFixed: {
      type: Boolean,
      default: true
    },
    brand: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  },
  computed: {
    hasRightSlot() {
      return !!this.$slots.right || !!this.$scopedSlots.right
    }
  },
  data() {
    return {
      leftTimeout: null,
      noTransition: true,
      showBackground: false,
      isScrolled: false,
      isActive: false,
      isAnimate: false,
      menuItems: this.parseItems(this.items)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    parseItems(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    transEnter(el) {
      const itemIndex = el.dataset.subIndex
      const navbarItemLeft = this.$refs[`navbarItem_${itemIndex}`][0].offsetLeft
      const navbarItemWidth = this.$refs[`navbarItem_${itemIndex}`][0].clientWidth
      const itemOffsetLeft = navbarItemLeft
      const navbarContentWidth = this.$refs[`navbarContent_${itemIndex}`][0].clientWidth
      const contentOffsetLeft = (itemOffsetLeft - (navbarContentWidth / 2)) + navbarItemWidth
      const offset = contentOffsetLeft - (navbarItemWidth / 2)
      this.subPosition(itemIndex, el, offset)
    },
    isHovered(val) {
      this.isActive = val
      this.isAnimate = val
      if (!val) this.noTransition = true
    },
    showContent(event, i) {
      clearTimeout(this.leftTimeout)
      this.showBackground = true
      this.menuItems.map((item, index) => {
        item.active = index === i
        return item
      })
      this.toggleOverflow()
    },
    hideContent(event, i) {
      this.noTransition = false
      this.leftTimeout = setTimeout(() => {
        this.menuItems[i].active = false
        this.showBackground = false
        this.noTransition = true
        this.toggleOverflow()
        clearTimeout(this.leftTimeout)
      }, 300)
    },
    subEnter(event, i) {
      this.isActive = true
      this.showContent(event, i)
    },
    subLeave(event, i) {
      this.isActive = false
      this.hideContent(event, i)
    },
    subPosition(i, sub, offset) {
      let finalOffset = 0
      const bcr = sub.getBoundingClientRect()
      const bg = this.$refs['navbarBackground']
      const navbarContent = this.$refs['navbarContent']
      const navbarContentWidth = this.$refs[`navbarContent_${i}`][0].clientWidth
      const navbarWidth = parseInt(getComputedStyle(this.$refs.navbar).width, 10)
      const scaleX = bcr.width / 400
      const scaleY = bcr.height / 200
      if (offset > 0) {
        finalOffset = offset
        const offsetWidth = finalOffset + navbarContentWidth
        if (offsetWidth > navbarWidth) {
          finalOffset = navbarWidth - navbarContentWidth
        }
      }
      bg.style = `transform: translate(${finalOffset}px) scale(${scaleX}, ${scaleY})`
      navbarContent.style = `transform: translateX(${finalOffset}px)`
    },
    toggleOverflow() {
      document.body.style.overflowX = (this.isActive && !this.isFixed) ? 'hidden' : ''
    },
    openMobileMenu() {
      this.$root.$emit('openMobileMenu')
    }
  }
}
</script>
