<template>
  <div :class="themesType" :style="scrollWrapStyle">
    <dp-tabs :is-tab-underline="isTabUnderline">
      <dp-tab-item label="tab 1">
        <div :style="scrollContStyle">
          <h1>Put any elements you want</h1>
        </div>
      </dp-tab-item>

      <dp-tab-item label="tab 2" :visible="visible">
        <div>
          <dp-select
            :label="'label'"
            :items="[{ key: '1', text: '1 month' }, { key: '2', text: '2 month' }, { key: '3', text: '3 month' }]"
          ></dp-select>

          <dp-date-picker
            label="Date"
            mode="single"
            formatter="DD-MMM-YYYY"
            message="please pick a date"
          ></dp-date-picker>
        </div>
      </dp-tab-item>

      <dp-tab-item label="tab 3">
        <div>
          <h2>Put any elements you want</h2>
        </div>
      </dp-tab-item>
    </dp-tabs>
  </div>
</template>

<script>
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
export default {
  data() {
    return {
      visible: boolean('Tab 2 is visible?', true),
      themesType: select('ThemesType', themesMode, ''),
      isTabUnderline: boolean('isTabUnderline', false)
    }
  },
  computed: {
    isMobile() {
      return this.$screen.resize && this.$screen.mobile()
    },
    scrollWrapStyle() {
      let style = ''
      if (this.isTabUnderline && this.isMobile) {
        style = 'height:400px; overflow: auto;'
      }
      return style
    },
    scrollContStyle() {
      let style = ''
      if (this.isTabUnderline && this.isMobile) {
        style = 'height:1000px;'
      }
      return style
    }
  }
}
</script>
