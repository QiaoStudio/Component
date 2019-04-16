<template>
  <dp-formfield-launcher :is-tab-two-visible="isTabTwoVisible"></dp-formfield-launcher>
</template>
<script>
import DpFormfieldLauncher from 'components/modules/formfield-launcher.vue'
export default {
  components: { DpFormfieldLauncher },
  data() {
    return {
      isTabTwoVisible: boolean('Is Tab Two Visible?', true),
      status: text('Status', '23 travel plans'),
      sticky: boolean('Is Sticky', false),
      currentFilters: number('Current Filters', 10)
    }
  }
}
</script>
