<template>
  <div style="perspective: 1000px">
    <div v-if="currentPage < contentLength" class="dp-tips-card" :class="classObject">
      <div class="dp-tips-card__body">
        <div class="dp-tips-card__img">
          <img :src="imageUrl" :alt="alternateText">
        </div>
        <div class="dp-tips-card__text">
          <h2 class="dp-tips-card__text-title">{{ title }}</h2>
          <p class="dp-tips-card__text-content">{{ tipsContent }}</p>
          <dp-tips-card-footer class="tips-card-footer-desktop"
                               @goToPreviousPage="goToPreviousPage"
                               @goToNextPage="goToNextPage"
                               :content-length="contentLength"
                               :current-page="currentPage"
                               :previous-text="previousText"
                               :next-text="nextButtonText">
          </dp-tips-card-footer>
        </div>
      </div>
      <dp-tips-card-footer class="tips-card-footer-mobile"
                           @goToPreviousPage="goToPreviousPage"
                           @goToNextPage="goToNextPage"
                           :content-length="contentLength"
                           :current-page="currentPage"
                           :previous-text="previousText"
                           :next-text="nextButtonText">
      </dp-tips-card-footer>
    </div>
  </div>
</template>
<script>
import Footer from './tips-card-footer.vue'

const NEXT = 'next'
const PREVIOUS = 'previous'
export default {
  name: 'dp-tips-card',
  resetDuration: 200,
  components: {
    [Footer.name]: Footer
  },
  props: {
    title: { type: String, default: 'GoBear Tips' },
    content: { type: [String, Array], required: true },
    imageUrl: { type: String, required: true },
    alternateText: { type: String, default: 'Gobear Tip' },
    nextText: { type: String, default: 'Next' },
    previousText: { type: String, default: 'Previous' },
    lastStepText: { type: String, default: 'Okie Dokie' },
    singleTipText: { type: String, default: 'Ok, got it' }
  },
  data() {
    return {
      currentPage: 0,
      action: '',
      isSingleTip: !Array.isArray(this.content)
    }
  },
  methods: {
    goToNextPage() {
      this.changePage(NEXT, 1)
    },
    goToPreviousPage() {
      this.changePage(PREVIOUS, -1)
    },
    changePage(action, deltaPage) {
      const continuePageIndex = this.currentPage + deltaPage
      const actions = {
        current: () => {
          if (continuePageIndex < this.contentLength) {
            this.action = action
          }
        },
        future: [
          {
            action: () => {
              this.currentPage = continuePageIndex
            },
            time: this.$options.resetDuration / 2
          },
          {
            action: () => {
              this.action = ''
            },
            time: this.$options.resetDuration
          }
        ]
      }
      this.runActions(actions)
    },
    runActions(options) {
      const { current, future } = options
      future.forEach(actionItem => {
        setTimeout(actionItem.action, actionItem.time)
      })
      current()
    }
  },
  computed: {
    tipsContent() {
      if (this.isSingleTip) {
        return this.content
      }
      return this.content[this.currentPage]
    },
    contentLength() {
      if (this.isSingleTip) {
        return 1
      }
      return this.content.length
    },
    nextButtonText() {
      if (this.isSingleTip) {
        return this.singleTipText
      }
      return this.currentPage < this.contentLength - 1 ? this.nextText : this.lastStepText
    },
    classObject() {
      if (this.action) {
        return this.action === NEXT ? { 'dp-flip-next': true } : { 'dp-flip-previous': true }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/modules/tips-card';
</style>
