<template>
  <div style="background-color: #000; text-align: center; padding: 24px 0; display: flex; justify-content: center;">
    <dp-icon class="dp-icon__country" :type="type" :category="category"></dp-icon>
  </div>
</template>

<script>
const countryCategoryMode = {
  'Hong Kong': 'hk',
  'Indonesia': 'id',
  'Malaysia': 'my',
  'Philippines': 'ph',
  'Singapore': 'sg',
  'Thailand': 'th',
  'Vietnam': 'vn'
}

export default {
  data () {
    return {
      type: select('Type', {'Country': 'country'}, 'country'),
      category: select('Category', countryCategoryMode, 'hk')
    }
  }
}
</script>
