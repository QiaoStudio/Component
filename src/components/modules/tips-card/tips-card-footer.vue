<template>
  <div class="dp-tips-card__footer">
    <div class="dp-tips-card__footer-left"
         v-if="contentLength > 1">
      <span class="dp-tips-card__footer--dot"
            v-for="pageNumber in contentLength"
            :key="pageNumber - 1"
            :class="{ active: pageNumber - 1 === currentPage }" />
    </div>
    <div class="dp-tips-card__footer-right">
      <dp-button
        class="dp-button--text dp-tips-card__button pad"
        v-if="currentPage > 0"
        @click="$emit('goToPreviousPage')">
        {{ previousText }}
      </dp-button>
      <dp-button
        class="dp-button--text dp-tips-card__button"
        @click="$emit('goToNextPage')">
        {{ nextText }}
      </dp-button>
    </div>
  </div>
</template>

<script>
import ComButton from 'elements/button/index.js'

export default {
  name: 'dp-tips-card-footer',
  components: {
    [ComButton.name]: ComButton
  },
  props: {
    contentLength: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    previousText: { type: String, required: true },
    nextText: { type: String, required: true }
  }
}
</script>
