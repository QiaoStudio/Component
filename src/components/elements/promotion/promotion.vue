<template>
  <div class="dp-promotion">
    <span class="dp-promotion__icon">
      <i class="fa fa-megaphone"></i>
    </span>
    <span class="dp-promotion__text">
      {{ promotionSummary }}
    </span>
    <span class="dp-promotion__button"
          v-if="isButtonShow">
      <dp-button class="dp-button--sm dp-button--text">
        <span v-html="actionLabel"></span>
      </dp-button>
    </span>
    <dp-popover v-if="showPromotionPopover"
                class="dp-com-promotion-popup"
                :popover-class="popoverClasses"
                :title="popoverTitle"
                :content="promotionContents"
                :display="display"
                :flip-position="flipPosition"
                :prevent-overflow-option="computePreventOverflowOption"
                :offset-option="computeOffsetOption"
                :append-to-body = "true"
                :width="width"></dp-popover>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/promotion';
</style>
<script>
import DpComButton from 'elements/button'
import Popover from 'elements/popover/index.js'
import _ from 'lodash'

export default {
  name: 'dp-promotion',
  components: {
    [DpComButton.name]: DpComButton,
    [Popover.name]: Popover
  },
  props: {
    promotionSummary: {
      type: String
    },
    actionLabel: {
      type: String,
      default: 'More',
      validator(value) {
        let reg = /<(div|p|a|ul|ol|hr|h\d)+[^>]*>/i
        return !reg.test(value)
      }
    },
    popoverTitle: {
      type: String,
      default: ''
    },
    popoverContent: {
      type: Array,
      default: function () {
        return []
      }
    },
    flipPosition: {
      type: [Array, String],
      validator: value => {
        if (Array.isArray(value)) {
          return _.difference(value, ['top', 'right', 'bottom', 'left']).length === 0 && value.length !== 0
        } else if (typeof value === 'string') {
          return ['flip', 'clockwise', 'counterclockwise'].indexOf(value) >= 0
        }
      },
      default: 'flip'
    },
    popoverClass: {
      type: String
    },
    preventOverflowOption: {
      type: Object
    },
    offsetOption: {
      type: Object
    },
    isUseCustomOption: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      display: '<div></div>',
      isShowPromotionPopover: false,
      iconPosition: 0
    }
  },
  computed: {
    isButtonShow() {
      return !!this.actionLabel
    },
    promotionContents() {
      let dl = []
      for (let item in this.popoverContent) {
        let dd = []
        if (!this.popoverContent.hasOwnProperty(item)) {
          continue
        }
        let popoverItemTitle = _.trim(this.popoverContent[item].title)
        let popoverItemImage = _.trim(this.popoverContent[item].image)
        let popoverItemContent = _.trim(this.popoverContent[item].content)
        let popoverItemTime = _.trim(this.popoverContent[item].time)
        if (popoverItemImage || popoverItemContent || popoverItemTime) {
          dd.push('<dd>')
          popoverItemImage && dd.push(`<figure><img src="${this.popoverContent[item].image.href}" alt="${this.popoverContent[item].image.alt}"></figure>`)
          popoverItemContent && dd.push(`<p>${popoverItemContent}</p>`)
          popoverItemTime && dd.push(`<time>${popoverItemTime}</time>`)
          dd.push('</dd>')
        }
        if (popoverItemTitle || dd.length > 0) {
          dl.push('<dl>')
          popoverItemTitle && dl.push(`<dt><span class="dp-promotion__icon"><i class="fa fa-megaphone"></i></span>${popoverItemTitle}</dt>`)
          dd.length && dl.push(dd.join(''))
          dl.push('</dl>')
        }
      }
      return dl.join('')
    },
    isMobile() {
      return this.$screen.mobile()
    },
    showPromotionPopover() {
      return this.popoverTitle.trim() !== '' || this.promotionContents.trim() !== ''
    },
    popoverClasses() {
      return ['dp-popover__promotion', this.popoverClass].join(' ')
    },
    computeIconPosition() {
      return this.iconPosition + 22
    },
    computePreventOverflowOption() {
      if (this.isUseCustomOption) {
        if (this.preventOverflowOption) {
          return this.preventOverflowOption
        } else {
          return {}
        }
      } else {
        return {}
      }
    },
    computeOffsetOption() {
      if (this.isUseCustomOption) {
        if (this.offsetOption) {
          return this.offsetOption
        } else {
          return {}
        }
      } else {
        return {}
      }
    }
  },
  mounted() {
    this.preloadImage()
  },
  methods: {
    preloadImage() {
      for (let item in this.popoverContent) {
        if (!this.popoverContent.hasOwnProperty(item)) {
          continue
        }
        if (this.popoverContent[item].hasOwnProperty('image') && this.popoverContent[item].image.hasOwnProperty('href')) {
          let popoverItemImage = this.popoverContent[item].image.href
          let img = new Image()
          img.src = popoverItemImage
        }
      }
    }
  }
}
</script>
