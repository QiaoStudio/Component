<template>
  <div class="dp-panel"
       :class="{ 'dp-panel--linked': panelLinked !== '' }">
    <template v-if="panelLinked !== ''">
      <a class="dp-panel__wrapper"
         :href="panelLinked"
         :target="panelTarget ? '_blank' : '_self'">
        <div v-if="panelTitle !== ''"
             :class="'text-' + panelTitleAlign"
             class="dp-panel__title">
          <h3 class="dp-title">{{ panelTitle }}</h3>
        </div>
        <div v-if="panelIcon !== ''"
             :class="'text-' + panelIconAlign"
             class="dp-panel__icon">
          <img :src="panelIcon">
        </div>
        <div v-if="panelImage !== ''"
             class="dp-panel__image text-center"
             :class="{ 'dp-panel__image--full-width': isImageFullWidth }"
             :style="'background-image: url(' + panelImage + ')'">
        </div>
        <div v-if="panelSubtitle !== ''"
             :class="'text-' + panelSubtitleAlign"
             class="dp-panel__subtitle">
          <span>{{ panelSubtitle }}</span>
        </div>
        <div v-if="panelMaintitle !== ''"
             :class="'text-' + panelMaintitleAlign"
             class="dp-panel__maintitle">
          <h4 class="dp-title">{{ panelMaintitle }}</h4>
        </div>
        <div v-if="isAnnouncementEnabled"
             class="dp-panel__announcement"
             :class="'text-' + announcementAlign">
          <dp-announcement
            :label-text="announcementLabelText"
            :label-color="announcementLabelColor"
            :label-size="announcementLabelSize"
            :content="announcementContent"
            :is-linked="announcementLinked"
            :target="announcementTarget">
          </dp-announcement>
        </div>
        <div class="dp-panel__body" v-html="panelBody"></div>
        <div v-if="buttonLinked !== '' && buttonText !== ''" class="dp-panel__cta">
          <dp-button
            :class="[buttonSize, buttonType]"
            :href="isButtonDisabled ? '' : buttonLinked"
            :target="buttonTarget ? '_blank' : '_self'"
            :is-block="isButtonBlock"
            :is-disabled="isButtonDisabled">
            <span v-html="buttonText"></span>
          </dp-button>
          <dp-button
            v-if="isMultipleButton"
            :class="[buttonSize, buttonType]"
            :href="isButtonDisabled ? '' : buttonLinked"
            :target="buttonTarget ? '_blank' : '_self'"
            :is-block="isButtonBlock"
            :is-disabled="isButtonDisabled">
            <span v-html="buttonText"></span>
          </dp-button>
        </div>
      </a>
    </template>
    <template v-else>
      <div class="dp-panel__wrapper">
        <div v-if="panelTitle !== ''"
             :class="'text-' + panelTitleAlign"
             class="dp-panel__title">
          <h3 class="dp-title">{{ panelTitle }}</h3>
        </div>
        <div v-if="panelIcon !== ''"
             :class="'text-' + panelIconAlign"
             class="dp-panel__icon">
          <img :src="panelIcon">
        </div>
        <div v-if="panelImage !== ''"
             class="dp-panel__image text-center"
             :class="{ 'dp-panel__image--full-width': isImageFullWidth }"
             :style="'background-image: url(' + panelImage + ')'">
        </div>
        <div v-if="panelSubtitle !== ''"
             :class="'text-' + panelSubtitleAlign"
             class="dp-panel__subtitle">
          <span>{{ panelSubtitle }}</span>
        </div>
        <div v-if="panelMaintitle !== ''"
             :class="'text-' + panelMaintitleAlign"
             class="dp-panel__maintitle">
          <h4 class="dp-title">{{ panelMaintitle }}</h4>
        </div>
        <div v-if="isAnnouncementEnabled"
             class="dp-panel__announcement"
             :class="'text-' + announcementAlign">
          <dp-announcement
            :label-text="announcementLabelText"
            :label-color="announcementLabelColor"
            :label-size="announcementLabelSize"
            :content="announcementContent"
            :is-linked="announcementLinked"
            :target="announcementTarget">
          </dp-announcement>
        </div>
        <div class="dp-panel__body" v-html="panelBody"></div>
        <div v-if="buttonLinked !== '' && buttonText !== ''" class="dp-panel__cta">
          <dp-button
            :class="[buttonSize, buttonType]"
            :href="isButtonDisabled ? '' : buttonLinked"
            :target="buttonTarget ? '_blank' : '_self'"
            :is-block="isButtonBlock"
            :is-disabled="isButtonDisabled">
            <span v-html="buttonText"></span>
          </dp-button>
          <dp-button
            v-if="isMultipleButton"
            :class="[buttonSize, buttonType]"
            :href="isButtonDisabled ? '' : buttonLinked"
            :target="buttonTarget ? '_blank' : '_self'"
            :is-block="isButtonBlock"
            :is-disabled="isButtonDisabled">
            <span v-html="buttonText"></span>
          </dp-button>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss">
@import '~assets/css/modules/panel';
</style>
<script>
import ComButton from 'elements/button/index.js'
import ComAnnouncement from 'modules/announcement/index.js'

export default {
  name: 'dp-panel',
  components: {
    [ComButton.name]: ComButton,
    [ComAnnouncement.name]: ComAnnouncement
  },
  props: {
    panelLinked: { type: String, default: '' },
    panelTarget: { type: Boolean, default: false },
    panelTitle: { type: String, default: '' },
    panelTitleAlign: { type: String, default: 'center' },
    panelIcon: { type: String, default: '' },
    panelIconAlign: { type: String, default: 'center' },
    isImageFullWidth: { type: Boolean, default: false },
    panelImage: { type: String, default: '' },
    panelSubtitle: { type: String, default: '' },
    panelSubtitleAlign: { type: String, default: 'center' },
    panelMaintitle: { type: String, default: '' },
    panelMaintitleAlign: { type: String, default: 'center' },
    isAnnouncementEnabled: { type: Boolean, default: true },
    announcementAlign: { type: String, default: 'center' },
    announcementLabelText: { type: String, default: 'New' },
    announcementLabelColor: { type: String, default: 'dp-label--red' },
    announcementLabelSize: { type: String, default: '' },
    announcementContent: { type: String, default: '' },
    announcementLinked: { type: String, default: '' },
    announcementTarget: { type: Boolean, default: true },
    panelBody: { type: String, default: '' },
    buttonLinked: { type: String, default: '' },
    buttonTarget: { type: Boolean, default: true },
    buttonText: {
      type: String,
      default: '',
      validator(value) {
        let reg = /<(div|p|a|ul|ol|hr|h\d)+[^>]*>/i
        return !reg.test(value)
      }
    },
    buttonType: { type: String, default: '' },
    buttonSize: { type: String, default: '' },
    isButtonBlock: { type: Boolean, default: true },
    isButtonDisabled: { type: Boolean, default: false },
    isMultipleButton: { type: Boolean, default: false }
  }
}
</script>
