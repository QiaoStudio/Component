<template>
  <div :class="{
         'dp-mobile-menu--opened': isOpen,
         'dp-mobile-menu--closing': isClosing
       }"
       class="dp-mobile-menu">
    <div class="dp-mobile-menu__items">
      <div class="dp-mobile-menu__header">
        <span>{{ title }}</span>
        <a @click.prevent="toggleOpen"
           href="#"
           class="dp-mobile-menu__close" />
      </div>
      <div v-if="hasTopSlot"
           class="dp-mobile-menu__top">
        <slot name="top" />
      </div>
      <div class="dp-mobile-menu__blocks">
        <dp-button :href="home.url"
                   :ripple="false"
                   class="dp-button--block dp-button--text">
          <span>{{ home.label }}</span>
        </dp-button>
      </div>
      <nav>
        <dp-accordion-group>
          <div slot="title">
            <span>{{ itemsTitle }}</span>
          </div>
          <template v-for="item in items">
            <dp-accordion
              v-if="item.megamenu && item.megamenu.length"
              :key="item.label"
              icon-position="right"
              slot="accordion">
              <span slot="header"
                    class="dp-button--text">
                {{ item.label }}
              </span>
              <ul>
                <template v-for="megaMenu in item.megamenu">
                  <template v-if="megaMenu.type === 'link'">
                    <template v-for="subItem in megaMenu.items">
                      <li :key="subItem.label">
                        <dp-button
                          :href="subItem.url"
                          :ripple="false"
                          class="dp-button--block dp-button--text">
                          <span v-html="subItem.label" />
                        </dp-button>
                      </li>
                    </template>
                  </template>
                </template>
              </ul>
            </dp-accordion>
          </template>
        </dp-accordion-group>
        <div class="dp-mobile-menu__blocks">
          <template v-for="item in items">
            <dp-button
              v-if="!item.megamenu.length"
              :key="item.label"
              :href="item.url"
              :ripple="false"
              class="dp-button--block dp-button--text">
              <span v-html="item.label" />
            </dp-button>
          </template>
        </div>
      </nav>
    </div>
    <div @click="toggleOpen"
         class="dp-mobile-menu__backdrop" />
  </div>
</template>

<style lang="scss">
@import '~assets/css/modules/mobile-menu';
</style>

<script>
import DpButton from 'elements/button'
import DpAccordionGroup from 'elements/accordion/src/accordion-group'
import DpAccordion from 'elements/accordion/src/accordion'
export default {
  name: 'dp-mobile-menu',
  components: {
    [DpButton.name]: DpButton,
    [DpAccordionGroup.name]: DpAccordionGroup,
    [DpAccordion.name]: DpAccordion
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Menu'
    },
    home: {
      type: Object,
      required: true,
      default: function() {
        return {
          label: 'Home',
          url: '/sg'
        }
      }
    },
    itemsTitle: {
      type: String,
      required: true,
      default: 'Compare:'
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
    hasTopSlot() {
      return !!this.$slots.top || !!this.$scopedSlots.top
    }
  },
  data() {
    return {
      isOpen: false,
      isClosing: false,
      closeTimeout: null
    }
  },
  mounted() {
    this.$root.$on('openMobileMenu', () => {
      this.toggleOpen()
    })
  },
  destroy() {
    this.$root.$off('openMobileMenu')
  },
  methods: {
    toggleOpen() {
      const el = document.body
      this.isOpen = !this.isOpen
      this.isClosing = true
      el.style.overflow = this.isOpen ? 'hidden' : ''
      this.closeTimeout = setTimeout(() => {
        this.isClosing = false
        clearTimeout(this.closeTimeout)
      }, 300)
    }
  },
  watch: {
    '$screen.resize'() {
      if (this.$screen.desktop() && this.isOpen) {
        this.toggleOpen()
      }
    }
  }
}
</script>
