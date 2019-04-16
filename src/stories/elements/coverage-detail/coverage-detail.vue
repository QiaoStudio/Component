<template>
  <div :class="[nationalType]">
    <dp-coverage-detail :coverage="coverage" :view-type="viewType"></dp-coverage-detail>
  </div>
</template>

<script>
const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

const coverage = [{
  'content': '$300,000 / adult $60,000 / elderly',
  'title': 'Personal accident payment'
}, {
  'content': '$500,000 / adult $100,000 / elderly',
  'title': 'Medical expenses(overseas)'
}, {
  'content': 'Up to $500 per item, pair or set of items',
  'title': 'Lost bags & belongings'
}, {
  'content': '$10,000',
  'title': 'Cancelled trip'
}, {
  'content': 'Unlimited',
  'title': 'Emergency medical evacuation'
}]
export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      coverage: coverage,
      viewType: select('The type of view', ['grid', 'list'], 'grid')
    }
  }
}
</script>

