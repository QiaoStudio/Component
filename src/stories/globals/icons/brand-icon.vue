<template>
  <dp-icon :type="type" :category="category" :display="display"></dp-icon>
</template>

<script>
const brandCategoryMode = {
  'Compare': 'compare',
  'Discount': 'discount',
  'Document': 'document',
  'Promotion': 'promotion',
  'Reward': 'reward',
  'Unbiased': 'unbiased'
}

const displayMode = {
  '': '',
  'dp-icon--xs-only': 'dp-icon--xs-only',
  'dp-icon--sm-only': 'dp-icon--sm-only',
  'dp-icon--md-only': 'dp-icon--md-only',
  'dp-icon--lg-only': 'dp-icon--lg-only',
  'dp-icon--sm-md': 'dp-icon--sm-md',
  'dp-icon--sm-lg': 'dp-icon--sm-lg',
  'dp-icon--md-lg': 'dp-icon--md-lg'
}

function categoryfunc() {
  return brandCategoryMode
}

export default {
  data () {
    return {
      type: select('Type', {'Brand': 'brand'}, 'brand'),
      category: select('Category', categoryfunc(), 'compare'),
      display: select('Display', displayMode, '')
    }
  }
}
</script>
