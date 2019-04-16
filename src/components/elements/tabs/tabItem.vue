<template>
  <div v-show="isActive && visible" class="tab-item">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'dp-tab-item',
  props: {
    label: String,
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    activate() {
      this.isActive = true
    },
    deactivate() {
      this.isActive = false
    }
  },
  created() {
    this.$parent.tabItems.push(this)
  }
}
</script>
