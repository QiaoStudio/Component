<template>
  <dp-panel
    :panel-linked="panelLinked"
    :panel-target="panelTarget"
    :panel-title="panelTitle"
    :panel-title-align="panelTitleAlign"
    :panel-icon="panelIcon"
    :panel-icon-align="panelIconAlign"
    :panel-image="panelImage"
    :is-image-full-width="isImageFullWidth"
    :panel-subtitle="panelSubtitle"
    :panel-subtitle-align="panelSubtitleAlign"
    :panel-maintitle="panelMaintitle"
    :panel-maintitle-align="panelMaintitleAlign"
    :announcement-align="announcementAlign"
    :announcement-label-text="announcementLabelText"
    :announcement-label-color="announcementLabelColor"
    :announcement-label-size="announcementLabelSize"
    :announcement-content="announcementContent"
    :announcement-linked="announcementLinked"
    :announcement-target="announcementTarget"
    :panel-body="panelBody"
    :button-linked="buttonLinked"
    :button-target="buttonTarget"
    :button-text="buttonText"
    :button-type="buttonType"
    :button-size="buttonSize"
    :is-button-block="isButtonBlock"
    :is-button-disabled="isButtonDisabled"
    :is-multiple-button="isMultipleButton"
    :is-announcement-enabled="isAnnouncementEnabled">
  </dp-panel>
</template>
<script>
const alignMode = {
  'Center': 'center',
  'Left': 'left',
  'Right': 'right'
}

const labelColorMode = {
  'Green': '',
  'Red': 'dp-label--red',
  'Orange': 'dp-label--orange',
  'Gray': 'dp-label--gray'
}

const labelSizeMode = {
  'Small': '',
  'Medium': 'dp-label--md',
  'Large': 'dp-label--lg'
}

const typeMode = {
  'Default': '',
  'Ghost (Primary)': 'dp-button--ghost-primary',
  'Ghost (Secondary)': 'dp-button--ghost-secondary'
}

const sizeMode = {
  'Default': '',
  'Small': 'dp-button--sm'
}
export default {
  data() {
    return {
      panelLinked: text('Panel link', 'https://google.com'),
      panelTarget: boolean('Panel - Open in new tab?', true),
      panelTitle: text('Panel title', 'Panel title'),
      panelTitleAlign: select('Panel title alignment', alignMode, 'center'),
      panelIcon: text('Panel icon', 'https://picsum.photos/g/40/40'),
      panelIconAlign: select('Panel icon alignment', alignMode, 'center'),
      isImageFullWidth: boolean('Panel image full width?', true),
      panelImage: text('Panel image', 'https://picsum.photos/696/400'),
      panelSubtitle: text('Panel subtitle', 'Subtitle'),
      panelSubtitleAlign: select('Panel subtitle alignment', alignMode, 'center'),
      panelMaintitle: text('Panel main title', 'Main title'),
      panelMaintitleAlign: select('Panel main title alignment', alignMode, 'center'),
      isAnnouncementEnabled: boolean('Announcement enabled?', true),
      announcementAlign: select('Announcement alignment', alignMode, 'center'),
      announcementLabelText: text('Announcement label text', 'New'),
      announcementLabelColor: select('Announcement label color', labelColorMode, ''),
      announcementLabelSize: select('Announcement label size', labelSizeMode, ''),
      announcementContent: text('Announcement content', 'Get an awesome Thai Milk Tea!'),
      announcementLinked: text('Announcement linked', 'http://google.com'),
      announcementTarget: boolean('Announcement - Open in new tab?', true),
      panelBody: text('Panel body', '<p>Swag letterpress dreamcatcher, lomo ennui chicharrones mumblecore pork belly slow-carb four loko hot chicken subway tile put a bird on it. Sustainable health goth readymade lomo knausgaard art party. Humblebrag skateboard cronut chillwave 3 wolf moon.</p>'),
      buttonLinked: text('Button link', 'https://google.com'),
      buttonTarget: boolean('Button - Open in new tab?', true),
      buttonText: text('Button text', 'Select'),
      buttonType: select('Button type', typeMode, 'dp-button--ghost-secondary'),
      buttonSize: select('Button size', sizeMode, 'dp-button--sm'),
      isButtonBlock: boolean('Button as block?', true),
      isButtonDisabled: boolean('Button disabled?', false),
      isMultipleButton: boolean('Multiple button?', false)
    }
  }
}
</script>
