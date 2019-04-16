<template>
  <div>
    <h1 class="dp-title" :class="headingStyle">Big title heading <span class="dp-title--highlight">highlighted text</span></h1>
    <h2 class="dp-title" :class="headingStyle">Big title heading <span class="dp-title--highlight">highlighted text</span></h2>
    <h3 class="dp-title" :class="headingStyle">Big title heading <span class="dp-title--highlight">highlighted text</span></h3>
    <h4 class="dp-title" :class="headingStyle">Big title heading <span class="dp-title--highlight">highlighted text</span></h4>
    <h5 class="dp-title" :class="headingStyle">Big title heading highlighted text</h5>
    <h6 class="dp-title" :class="headingStyle">Big title heading highlighted text</h6>
  </div>
</template>

<script>
const headingStlye = {
  'default': '',
  'light': 'dp-title--light',
  'lead': 'dp-title--lead'
}
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
export default {
  data() {
    return {
      themesType: select('ThemesType', themesMode, ''),
      headingStyle: select('Please select a heading style', headingStlye, '')
    }
  },
  mounted() {
    if (this.headingStyle === 'dp-title--light') {
      this.$el.parentNode.style.backgroundColor = '#303639'
    }
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
    headingStyle(val) {
      if (val === 'dp-tittle--light') {
        this.$el.parentNode.style.backgroundColor = '#303639'
      }
    },
    themesType(val) {
      if (val === 'dp-theme-dark') {
        document.querySelector('body').classList.add('dp-theme-dark')
      } else {
        document.querySelector('body').classList.remove('dp-theme-dark')
      }
    }
  }
}
</script>
