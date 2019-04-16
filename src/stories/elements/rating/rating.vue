<template>
  <div :class="[nationalType]">
    <dp-rating
      v-if="event"
      :href="href"
      :reviews-text="reviewText"
      @review-popup="callback"
      :rating="rating"
      :reviews="reviews"
    ></dp-rating>
    <dp-rating v-else :href="href" :reviews-text="reviewText" :rating="rating" :reviews="reviews"></dp-rating>
  </div>
</template>

<script>
import { action } from '@storybook/addon-actions'

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th'
}

export default {
  data() {
    return {
      nationalType: select('National Type', nationalMode, ''),
      rating: number('Rating', 4),
      reviews: number('Reviews', 0),
      reviewText: text('Review Text', 'Reviews'),
      href: text('Review Links', ''),
      event: boolean('Use callback', false)
    }
  },
  methods: {
    callback: action('Review clicked!')
  }
}
</script>
