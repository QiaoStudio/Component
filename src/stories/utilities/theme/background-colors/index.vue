<template>
  <div>
    <p :class="bgColor">
      <span>{{ bgColor }}</span>
    </p>
  </div>
</template>

<style scoped>
  .dp-theme-bg-black-1 {
    color: #ffffff;
  }
  p {
    padding: 1.5rem;
  }
</style>

<script>
const bgColors = {
  'White': 'dp-theme-bg-white-1',
  'Gray': 'dp-theme-bg-gray-1',
  'Black': 'dp-theme-bg-black-1'
}
export default {
  data() {
    return {
      bgColor: select('Background Color', bgColors, 'dp-theme-bg-white-1')
    }
  }
}
</script>
