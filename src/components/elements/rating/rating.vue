<template>
  <component :is="tag"
             class="dp-rating"
             :href="href ? href : null"
             @click="$emit('review-popup')"
             :type="tag === 'button' ? 'button' : null">
    <span class="dp-rating__star">
      <span aria-hidden="true"
            v-for="(i, key) in stars"
            :key="key"
            class="fa"
            :class="{ 'fa-star-o' : i === 0, 'fa-star' : i === 1 }"></span>
    </span>
    <span v-if="reviewsText" class="dp-rating__label">
      {{ label }}
    </span>
  </component>
</template>
<style lang="scss">
@import '~assets/css/elements/rating';
</style>
<script>
export default {
  name: 'dp-rating',
  props: {
    rating: {
      type: Number,
      required: false,
      default: 0
    },
    reviews: {
      type: Number,
      required: false,
      default: 0
    },
    reviewsText: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false
    }
  },
  computed: {
    tag: function () {
      if (this.href) {
        return 'a'
      }
      if (typeof this.$listeners['review-popup'] === 'function') {
        return 'button'
      }
      return 'span'
    },
    label: function() {
      return `${this.reviews} ${this.reviewsText}`
    },
    stars: function() {
      let stars = []
      let starAmount = 5
      for (let index = 0; index < starAmount; index++) {
        if (index <= this.rating - 1) {
          stars.push(1)
        } else {
          stars.push(0)
        }
      }
      return stars
    }
  }
}
</script>
