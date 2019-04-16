<template>
  <div>
    <dp-cta-tile
      :title="title"
      :caption="caption"
      :link="link"
      :open-new-tab="openNewTab">
      <i slot="iconTitle" class="fa fa-arrow-right"></i>
      <span slot="iconDesktop" class="dp-icon dp-icon--lg-only dp-icon__brand--compare"></span>
      <span slot="iconMobile" class="dp-icon dp-icon__brand--compare dp-icon--md-only"></span>
    </dp-cta-tile>
  </div>
</template>
<script>

export default {
  data () {
    return {
      title: text('Title', 'Compare the best shopping and grocery credit cards on GoBear'),
      caption: text('Caption', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus vehicula ante in dignissim.'),
      link: text('Link url', 'https://www.xxxxxx.com'),
      openNewTab: boolean('Open in new tab?', false)
    }
  }
}
</script>
