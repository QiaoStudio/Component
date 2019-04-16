<template>
  <div :class="[themesType, nationalType]"
       :style="themeStyle">
    <dp-brand
      :country="countryMode"
      :type="brandType"
      :fallback-logo="fallbackLogo"
      :fallback-tagline="fallbackTagline">
    </dp-brand>
  </div>
</template>
<script>
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th',
  'HK': 'dp-theme-hk'
}

const brandMode = {
  'Default': '',
  'Blog': 'blog'
}

export default {
  data() {
    return {
      themesType: select('Theme Type', themesMode, ''),
      nationalType: select('National Type', nationalMode, ''),
      brandType: select('Type', brandMode, ''),
      fallbackLogo: text('Logo fallback', 'https://picsum.photos/121/36'),
      fallbackTagline: text('Tagline fallback', 'https://picsum.photos/121/11')
    }
  },
  computed: {
    countryMode() {
      let selected = ''
      if (this.nationalType === 'dp-theme-th') {
        selected = 'th'
      } else if (this.nationalType === 'dp-theme-hk') {
        selected = 'hk'
      } else {
        selected = 'sg'
      }
      return selected
    },
    themeStyle() {
      if (this.themesType === 'dp-theme-dark') {
        return 'padding: 1.5em; background: #303639;'
      }
    }
  }
}
</script>

