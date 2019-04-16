<template>
  <com-modal :open-popup="show"
             :enable-close="true"
             open-direction="bottom"
             @after-close="closeModal"
             class="dp-filter-drawer">
    <div slot="title"
         class="dp-filter-drawer__header">
      <com-button class="dp-button--text dp-filter-drawer__header__btn-reset"
                  @click="onResetButtonClick">RESET</com-button>
      <h5 class="dp-title dp-filter-drawer__header__title">{{ title }}</h5>
      <com-button class="dp-button--text dp-filter-drawer__header__btn-done"
                  @click="onDoneButtonClick">DONE</com-button>
    </div>
    <div class="dp-filter-drawer__content">
      <slot></slot>
    </div>
  </com-modal>
</template>

<script>
import ComModal from 'elements/modal/index.js'
import ComButton from 'elements/button/index.js'
export default {
  name: 'dp-filter-drawer',
  components: {
    ComModal,
    ComButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show: {
      get() {
        return this.showDrawer
      },
      set(newValue) {
        this.$emit('update:showDrawer', newValue)
      }
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    onDoneButtonClick() {
      this.$emit('apply-filters')
      this.closeModal()
    },
    onResetButtonClick() {
      this.$emit('reset-filters')
    }
  }
}
</script>

<style lang="scss">
@import "~assets/css/modules/filter-drawer";
</style>
