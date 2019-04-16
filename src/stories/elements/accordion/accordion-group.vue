<template>
  <dp-accordion-group :title-border="titleBorder">
    <h4 slot="title" class="dp-title">{{ groupTitle }}</h4>
    <dp-accordion
      slot="accordion"
      :key="index"
      :icon-position="iconPosition"
      v-for="(item, index) in items">
      <span slot="header">{{ item.title }}</span>
      {{ item.body }}
    </dp-accordion>
  </dp-accordion-group>
</template>

<script>
const iconPositionOptions = ['left', 'right']
export default {
  data () {
    return {
      titleBorder: boolean('Title Border', false),
      iconPosition: select('Icon Position', iconPositionOptions, 'left'),
      groupTitle: text('groupTitle', 'Product isRelated'),
      items: [
        {
          title: 'What are the different types of travel insurance?',
          body: 'It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top.'
        },
        {
          title: 'What is GoBear?',
          body: 'It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top.'
        },
        {
          title: 'What do I have to take into consideration before choosing a specific travel insurance plan?',
          body: 'It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top. It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top. Next.'
        },
        {
          title: 'Decoding the travel insurance lingo',
          body: 'It is important to understand that the coverage score is not a subjective score on how “good” a product is. The coverage score is a purely mathematically generated score (which GoBear has no manual input into) of a financial services product calculated and generated via an algorithm based on the coverage amounts of each of the top.'
        }
      ]
    }
  }
}
</script>

