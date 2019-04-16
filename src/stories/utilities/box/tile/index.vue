<template>
  <div class="dp-tile" style="width:200px;height:200px;" :class="[tileType, {'selected': selected, 'dp-tile--readonly': readonly}]"></div>
</template>

<script>
const tileType = {
  'Default': '',
  'outline': 'dp-tile__outline'
}
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}
export default {
  data () {
    return {
      tileType: select('TileType', tileType, ''),
      selected: boolean('Is selected?', false),
      themesType: select('ThemesType', themesMode, ''),
      readonly: boolean('Is Readonly', false)
    }
  },
  mounted() {
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
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
