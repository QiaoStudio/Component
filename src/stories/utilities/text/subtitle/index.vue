<template>
  <div>
    <span class="dp-subtitle" :class="subtitleStyle">Sub title text</span>
  </div>
</template>

<script>
const subtitleStyle = {
  'default': '',
  'light': 'dp-subtitle--light',
  'lead': 'dp-subtitle--lead'
}
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
export default {
  data() {
    return {
      themesType: select('ThemesType', themesMode, ''),
      subtitleStyle: select('Please select a heading style', subtitleStyle, '')
    }
  },
  mounted() {
    if (this.subtitleStyle === 'dp-subtitle--light') {
      this.$el.parentNode.style.backgroundColor = '#303639'
    }
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
    subtitleStyle(val) {
      if (val === 'dp-subtitle--light') {
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
