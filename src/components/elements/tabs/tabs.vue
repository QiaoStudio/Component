<template>
  <div :class="{'dp-tabs': !isTabUnderline, 'dp-tabs--underline': isTabUnderline}" v-show="tabItems.length > 0">
    <nav class="dp-tabs__header" v-if="isTabVisible" @keydown="bindKeyEvents">
      <ul>
        <li v-for="(item,i) in tabItems"
            v-show="item.visible"
            :key="i"
            :index="i"
            :tabindex="activeTab === i ? 0 : -1"
            :class="{ active : activeTab === i }"
            @click="changeTab(i)">
          <a>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
    <section class="dp-tabs__content">
      <slot/>
    </section>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/tabs';
</style>

<script>
import { getKey, KEY_VALUES } from 'utilities/event-helper/key-event'

export default {
  name: 'dp-tabs',
  props: {
    index: {
      type: [Number, String],
      default: 0
    },
    isTabVisible: {
      type: Boolean,
      default: true
    },
    isTabUnderline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: this.index || 0,
      tabItems: []
    }
  },
  watch: {
    index(index) {
      this.changeTab(index)
    }
  },
  methods: {
    changeTab(newIndex) {
      if (this.activeTab === newIndex) {
        return
      }
      this.tabItems[this.activeTab].deactivate()
      this.tabItems[newIndex].activate()
      this.activeTab = newIndex
      this.$emit('change', newIndex)
      this.$el.querySelectorAll('.dp-tabs__header li')[newIndex].focus()
    },
    bindKeyEvents(e) {
      let newIndex = -1
      let currentIndex
      if (parseInt(e.target.getAttribute('index')) >= 0) {
        currentIndex = parseInt(e.target.getAttribute('index'))
      } else {
        const activeLiTab = e.target.querySelector('.dp-tabs__header li.active')
        currentIndex = activeLiTab ? parseInt(activeLiTab.getAttribute('index')) : 0
      }
      switch (getKey(e)) {
        case KEY_VALUES.ARROW_RIGHT:
        case KEY_VALUES.ARROW_DOWN:
          newIndex = currentIndex === this.tabItems.length - 1 ? 0 : currentIndex + 1
          break
        case KEY_VALUES.ARROW_LEFT:
        case KEY_VALUES.ARROW_UP:
          newIndex = currentIndex === 0 ? this.tabItems.length - 1 : currentIndex - 1
          break
      }

      if (newIndex !== -1) {
        e.preventDefault()
        this.changeTab(newIndex)
      }
    }
  },
  mounted() {
    if (this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true
    }
  }
}
</script>
