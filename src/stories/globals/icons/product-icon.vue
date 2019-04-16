<template>
  <dp-icon :type="type" :category="category" :display="display"></dp-icon>
</template>

<script>
const productCategoryMode = {
  'Car insurance': 'car-insurance',
  'Credit card': 'credit-card',
  'Fixed deposit': 'fixed-deposit',
  'Health insurance': 'health-insurance',
  'Home insurance': 'home-insurance',
  'Home loan': 'home-loan',
  'Life insurance': 'life-insurance',
  'Personal loan': 'personal-loan',
  'Savings account': 'savings-account',
  'Travel insurance': 'travel-insurance'
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

export default {
  data () {
    return {
      type: select('Type', {'Product': 'product'}, 'product'),
      category: select('Category', productCategoryMode, 'car-insurance'),
      display: select('Display', displayMode, '')
    }
  }
}
</script>

