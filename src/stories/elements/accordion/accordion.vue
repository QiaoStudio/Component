<template>
  <dp-accordion :icon-position="iconPosition">
    <span slot="header">{{ title }}</span>
    {{ body }}
  </dp-accordion>
</template>

<script>
const iconPositionOptions = ['left', 'right']

export default {
  data () {
    return {
      title: text('title', 'What is Travel Insurance?'),
      body: text('body', 'It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top-5 most searched for features/benefits of a product relative to those of other insurance products of, and from, other providers. In order to derive this information, GoBear gathers all available market/public data on all products available in the market. We then include this data in our database and derive the minimum, maximum and median of the said top-5 features and benefits and set “from-to” ranges from 0-5 points – checking for even spreads during and at the end of the process.'),
      iconPosition: select('Icon Position', iconPositionOptions, 'left')
    }
  }
}
</script>

