<template>
  <dp-slider
    v-model="value"
    :interval="interval"
    :piecewise="piecewise"
    :min="min"
    :max="max"
    :disabled="disabled"
    :formatter="separator ? separator : formatter"
  ></dp-slider>
</template>

<script>

const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

const formatter = {
  '¥{value}': '¥{value}',
  'separator': 'separator',
  '': ''
}

export default {
  data () {
    return {
      themesType: select('ThemesType', themesMode, ''),
      single: boolean('single', false),
      max: number('max', 120),
      min: number('min', 0),
      piecewise: boolean('piecewise', false),
      interval: number('interval', 4),
      disabled: boolean('disabled', false),
      formatter: select('formatter', formatter, '')
    }
  },
  methods: {
    separator(val) {
      return val ? val.toLocaleString() : 0
    }
  },
  computed: {
    value: {
      get() {
        return this.single ? 0 : [0, 50]
      },
      set() {}
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

