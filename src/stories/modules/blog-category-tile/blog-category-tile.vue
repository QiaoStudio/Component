<template>
  <div style="padding: 20px;" :style="widthAndHeight">
    <dp-blog-category-tile :link="link" :target="target">
      <template slot="img">
        <img class="dp-blog-category-tile__img-wrap__img" :src="imgSource" alt="Personal Finance"/>
      </template>
      <template slot="title">
        <h2 class="dp-blog-category-tile__content-title">Personal Finance</h2>
      </template>
      <template slot="description">
        <p>Stay up to date with the latest regulations and car insurance deals!</p>
      </template>
    </dp-blog-category-tile>
  </div>
</template>
<script>
import imageFile from './62.jpeg'

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
      imgSource: imageFile,
      link: text('Link url', 'https://google.com'),
      target: select('Target type', targetTypes, null),
      containerWidth: text('Set theme container max-width', '500')
    }
  },
  computed: {
    widthAndHeight() {
      return `max-width: ${this.containerWidth}px;`
    }
  }
}
</script>
