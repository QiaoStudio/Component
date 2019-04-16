<template>
  <div :class="[nationalType]">
    <dp-logo :max-width="maxW" :max-height="maxH" :src="src" :alt="alt"></dp-logo>
  </div>
</template>

<script>
const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}
export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      src: text('Logo URL', 'https://picsum.photos/62'),
      maxW: number('Max Width', 0),
      maxH: number('Max Height', 0),
      alt: text('Logo Alt', 'logo')
    }
  }
}
</script>
