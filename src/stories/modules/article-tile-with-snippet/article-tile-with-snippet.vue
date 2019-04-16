<template>
  <div style="max-width: 754px;">
    <dp-article-tile-with-snippet
      :link="link"
      :target="target"
      :is-stacked="isStacked"
      :snippet-position="snippetPosition">
      <template slot="img"><img :src="imgThumbnail"/></template>
      <template slot="label">
        <span class="dp-label dp-label--white-bg dp-label--blue">
          <small>TRAVEL</small>
        </span>
      </template>
      <template slot="title"><span class="dp-tile__title">Best car rental comparison sites for your next road trip (2018)</span></template>
      <template slot="snippet"><span class="dp-tile__snippet">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, dui eu euismod tempor, nisi eros pellentesque leo, vita </span></template>
      <template slot="author"><span class="dp-tile__author">By Author</span></template>
      <template slot="date"><span class="dp-tile__date">Nov 20, 2017</span></template>
    </dp-article-tile-with-snippet>
  </div>
</template>
<script>
import imgThumbnail from './images/article-thumbnail@250.jpeg'
const snippetPositionMode = {
  'right': 'right',
  'bottom': 'bottom'
}
const targetTypes = {
  '_blank': '_blank',
  '_self': '_self',
  '_parent': '_parent',
  '_top': '_top',
  '': null
}

export default {
  data () {
    return {
      link: text('Link url', 'https://google.com'),
      target: select('Target type', targetTypes, null),
      snippetPosition: select('value of snippetPosition', snippetPositionMode, 'right'),
      isStacked: boolean('is stacked ?', false),
      imgThumbnail: imgThumbnail
    }
  }
}
</script>
