<template>
  <div :class="['dp-modal',
                isUseWindowedModal && 'dp-modal--windowed',
                openDirection && `dp-modal--${openDirection}`]"
       v-show="openPopup">
    <div class="dp-modal__wrap dp-modal--fade"
         :class="{
           'right': isMobile,
           'dp-modal--in': isVisible,
           'dp-modal--vertical-align-helper': isVetically || isUseWindowedModal,
           'dp-modal--full-screen': isFullScreen
         }"
         @keyup.esc="close(modalUid)"
         @click.self="close(modalUid)"
         :style="wrapPadding"
         ref="modal"
         key="modal"
         tabindex="-1"
         role="dialog"
         style="display:block;">
      <a class="dp__close dp-modal__close dp-modal__close--outer"
         data-dismiss="modal"
         aria-label="Close"
         @click.stop="close(modalUid)"
         v-if="isShowOuterClose"></a>
      <div class="dp-modal__dialog"
           :style="{'height': dialogHeight}"
           :class="{'dp-modal--vertical-align-center': isVetically || isUseWindowedModal}"
           role="document">
        <a class="dp__close dp-modal__close dp-modal__close--inward"
           data-dismiss="modal"
           aria-label="Close"
           @click.stop="close(modalUid)"
           v-if="isShowInwardClose"></a>
        <div class="dp-modal__content"
             :style="{'max-height': contentMaxHeight}">
          <div ref="modalHeader" class="dp-modal__header">
            <div class="dp-modal__title">
              <slot name="title">
              </slot>
            </div>
          </div>
          <div class="dp-modal__body"
               :style="contentBodyStyle">
            <slot></slot>
          </div>
          <div ref="modalFooter" class="dp-modal__footer"
               v-show="$slots.footer"
               :class="{'dp-modal__footer-sticky': isSticky && !isUseWindowedModal}"
          >
            <slot name="footer"/>
          </div>
        </div>
        <div class="dp-modal__close-bottom">
          <slot name="modal-close-bottom"></slot>
        </div>
      </div>
    </div>
    <div class="dp-modal__backdrop dp-modal__backdrop-fade dp-modal__backdrop-in"></div>
  </div>
</template>

<style lang="scss">
  @import '~assets/css/elements/modal';
</style>

<script>

export default {
  name: 'dp-modal',
  props: {
    openPopup: {
      type: Boolean,
      default: false
    },
    enableClose: {
      type: Boolean,
      default: false
    },
    isVetically: {
      type: Boolean,
      default: false
    },
    isSticky: {
      type: Boolean,
      default: true
    },
    useHash: {
      type: Boolean,
      default: true
    },
    windowedModal: {
      type: Boolean,
      default: false
    },
    isContentScroll: {
      type: Boolean,
      default: true
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
    openDirection: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isVisible: false,
      contentMaxHeight: '',
      wrapPadding: '',
      contentBodyStyle: {},
      dialogHeight: 'auto',
      modalUid: ''
    }
  },
  created() {
    this.modalUid = Math.random().toString().substr(2)
  },
  computed: {
    isMobile() {
      return this.$screen.mobile()
    },
    isUseWindowedModal() {
      return this.isMobile && this.windowedModal
    },
    isShowInwardClose() {
      if (this.enableClose) {
        if (!this.windowedModal && this.isMobile) {
          return true
        }
      }
    },
    isShowOuterClose() {
      if (this.enableClose) {
        if (this.windowedModal || !this.isMobile) {
          return true
        }
      }
    }
  },
  mounted() {
    if (this.openPopup || this.uidExistInHash(this.modalUid)) {
      this.open(this.modalUid)
    }
    if (this.useHash) {
      this.bindHashChange()
    }
  },
  beforeDestroy() {
    if (this.useHash) {
      this.removeBinding()
    }
  },
  methods: {
    innerClose(id) {
      if (!this.isVisible) return
      if (!!id && id !== this.modalUid) return
      this.contentMaxHeight = ''
      this.wrapPadding = ''
      this.contentBodyStyle = {}
      this.dialogHeight = 'auto'
      this.$emit('before-close')
      this.$emit('update:openPopup', false)
      this.removeIdFromHash(id)
      document.querySelector('body').classList.remove('dp-modal-open')
      this.isVisible = false
      this.removeFromDom()
      this.$emit('after-close')
    },
    close(id) {
      if (this.enableClose) {
        this.innerClose(id)
      }
    },
    open(id) {
      if (this.isVisible) return
      if (!!id && id !== this.modalUid) return
      this.$emit('before-open')
      this.$emit('update:openPopup', true)
      this.addIdFromHash(id)
      document.body.appendChild(this.$el)
      document.querySelector('body').classList.add('dp-modal-open')
      this.$nextTick(() => {
        this.setContentSize()
        this.setDialogSize()
        this.$refs.modal.focus()
        this.isVisible = true
        this.$emit('after-shown')
      })
    },
    hashChangeHandler() {
      if (!this.uidExistInHash(this.modalUid)) {
        if (this.useHash) {
          this.close(this.modalUid)
        }
      } else {
        this.open(this.modalUid)
      }
    },
    setContentSize() {
      const { modalHeader, modalFooter } = this.$refs
      this.clientHeight = document.documentElement.clientHeight

      if (this.isFullScreen) {
        const bodyHeight = this.clientHeight - modalHeader.clientHeight - modalFooter.clientHeight
        this.contentBodyStyle = { minHeight: `${bodyHeight}px` }
      } else if (this.isUseWindowedModal && this.isContentScroll) {
        this.contentMaxHeight = this.clientHeight - 84
        let headerHeight = modalHeader.clientHeight || 0
        let footerHeight = modalFooter.clientHeight || 0
        this.contentBodyStyle = { maxHeight: (this.contentMaxHeight - headerHeight - footerHeight) + 'px' }
      }
    },
    setDialogSize() {
      if (this.isUseWindowedModal) {
        let contentHeight = document.querySelector('.dp-modal__content').clientHeight || 0
        let isLarger = contentHeight >= this.clientHeight - 168
        this.wrapPadding = isLarger ? {'padding-top': '64px', 'padding-bottom': '20px'} : {}

        this.dialogHeight = isLarger ? this.isContentScroll ? '100%' : 'auto' : 'auto'
      }
    },
    removeFromDom() {
      let el = this.$el
      try {
        el.parentNode.removeChild(el)
      } catch (e) {}
    },
    removeBinding() {
      window.removeEventListener('hashchange', this.hashChangeHandler)
    },
    bindHashChange() {
      window.addEventListener('hashchange', this.hashChangeHandler)
    },
    addIdFromHash(id) {
      if (!this.uidExistInHash(id)) {
        location.hash = location.hash + '&modal-uid=' + id
      }
    },
    removeIdFromHash(id) {
      location.hash = location.hash.replace(new RegExp('&modal-uid=' + id, 'g'), '')
    },
    getIdsFromHash() {
      return location.hash.replace('#', '').split('&modal-uid=').filter(item => item !== '')
    },
    uidExistInHash(id) {
      let uids = this.getIdsFromHash()
      return uids.includes(id)
    }
  },
  watch: {
    openPopup: {
      handler(val) {
        if (val) {
          this.open(this.modalUid)
        } else {
          this.innerClose(this.modalUid)
        }
      }
    }
  }
}
</script>
