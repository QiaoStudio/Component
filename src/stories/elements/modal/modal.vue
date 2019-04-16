<template>
  <div>
    <div>
      <dp-button @click="open" class="dp-button--primary">open</dp-button>
    </div>
    <dp-modal
      :key="key"
      :is-vetically="isVetically"
      :enable-close="enableClose"
      :is-sticky="isSticky"
      :windowed-modal="windowedModal"
      :use-hash="useHash"
      :is-content-scroll="isContentScroll"
      ref="modal"
      :open-popup.sync="openPopup"
      :open-direction="openDirection"
      :is-full-screen="isFullScreen"
      @after-close="afterClose"
    >
      <h2 slot="title" class="dp-title" :style="titleStyle" v-show="isTitleShow">Searching travel
        <span class="dp-title--highlight">insurance</span>
      </h2>
      <div v-show="isContentShow" style="padding: 24px 40px 24px 40px ">
        <dp-checkbox-group :value="currentValue">
          <div :key="index" v-for="(option, index) in options">
            <dp-checkbox :label="option.key">{{ option.text }}</dp-checkbox>
          </div>
        </dp-checkbox-group>
        <dp-select
          :label="selectLabel"
          :disabled="false"
          :items="selectitems"
          :value="innerSelectValue"
        ></dp-select>
        <dp-checkbox-group :value="currentValue">
          <div :key="index" v-for="(option, index) in options">
            <dp-checkbox :label="option.key">{{ option.text }}</dp-checkbox>
          </div>
        </dp-checkbox-group>
        <dp-select
          :label="selectLabel"
          :disabled="false"
          :items="selectitems"
          :value="innerSelectValue"
        ></dp-select>
        <dp-select
          :label="selectLabel"
          :disabled="false"
          :items="selectitems"
          :value="innerSelectValue"
        ></dp-select>
        <dp-checkbox-group :value="currentValue">
          <div :key="index" v-for="(option, index) in options">
            <dp-checkbox :label="option.key">{{ option.text }}</dp-checkbox>
          </div>
        </dp-checkbox-group>
        <dp-select
          :label="selectLabel"
          :disabled="false"
          :items="selectitems"
          :value="innerSelectValue"
        ></dp-select>
      </div>
      <div slot="footer" v-if="isFooterShow" style="margin:20px;">
        <div v-if="!enableClose">
          <a href @click.prevent="close">close from outside</a>
        </div>Modal Footer
      </div>
    </dp-modal>
  </div>
</template>

<script>
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

export default {
  data() {
    return {
      key: Math.random(),
      openPopup: false,
      themesType: select('ThemesType', themesMode, ''),
      isVetically: boolean('Is vertically?', false),
      isTitleShow: boolean('is title show?', true),
      isContentShow: boolean('is content show?', true),
      isBackgroundShow: boolean('is background show?', true),
      isFooterShow: boolean('is footer show', true),
      isSticky: boolean('is footer stikcy', true),
      useHash: boolean('is browser back close modal ?', true),
      currentValue: [1],
      windowedModal: boolean('windowedModal(Mobile only) ?', true),
      isContentScroll: boolean('isContentScroll ?', true),
      enableClose: boolean('is close button show ?', true),
      innerSelectValue: '1',
      selectLabel: 'select a month you want',
      selectitems: [{ key: '1', text: '' }, { key: '2', text: '1 month' }, { key: '3', text: '2 month' }, { key: '4', text: '3 month' }],
      options: [
        { key: 1, text: 'Checkbox A' },
        { key: 2, text: 'Checkbox B' },
        { key: 3, text: 'Checkbox C' }
      ],
      openDirection: text('Open direction', ''),
      isFullScreen: boolean('Is full screen', true)
    }
  },
  methods: {
    open() {
      this.openPopup = true
    },
    close() {
      this.$refs.modal.isVisible = true
      this.$refs.modal.innerClose()
    },
    afterClose() {
      this.key = Math.random()
    }
  },
  computed: {
    titleStyle() {
      return {
        'padding-left': '40px'
      }
    }
  },
  beforeMount() {
    let Modal = document.querySelector('.dp-modal')
    if (Modal) {
      Modal.remove()
    }
  },
  mounted() {
    if (this.isBackgroundShow) {
      document.querySelector('.dp-modal__header').style.cssText = 'background:#fff url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535016240075&di=572ab2538498fac8195d6001a883156c&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fu%2F00%2F02%2F82%2F06%2F561c95213aaa4.jpg) no-repeat top right;background-size:cover'
    } else {
      document.querySelector('.dp-modal__header').style.cssText = ''
    }
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
    isBackgroundShow(val) {
      if (val) {
        document.querySelector('.dp-modal__header').style.cssText = 'background:#fff url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535016240075&di=572ab2538498fac8195d6001a883156c&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fu%2F00%2F02%2F82%2F06%2F561c95213aaa4.jpg) no-repeat top right;background-size:cover'
      } else {
        document.querySelector('.dp-modal__header').style.cssText = ''
      }
    },
    themesType(val) {
      if (val === 'dp-theme-dark') {
        document.querySelector('body').classList.add('dp-theme-dark')
      } else {
        document.querySelector('body').classList.remove('dp-theme-dark')
      }
    }
  }
}
</script>
