<template>
  <div :style="contWidth">
    <div style="margin-top:20px;" v-show="tileType==='large'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailLarge" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">Ask any local about the origins of all this cultivation</div></template>
        <template slot="author"><span class="dp-tile__author">By Jeremy</span></template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:20px;" v-show="tileType==='large'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailLarge" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">5 reasons why free travel insurance may not be sufficient</div></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:20px;" v-show="tileType==='large'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailLarge" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">5 reasons why free travel insurance may not be sufficient</div></template>
        <template slot="label">
          <span class="dp-tile__label dp-label dp-label--blue dp-label--bordered">
            <small>travel</small>
          </span>
        </template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:20px;" v-show="tileType==='small'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailLarge" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">Ask any local about the origins of all this cultivation</div></template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:20px;" v-show="tileType==='small'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailLarge" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">Ask any local about the origins of all this cultivation</div></template>
        <template slot="label">
          <span class="dp-tile__label dp-label dp-label--blue dp-label--white-bg">
            <small>travel</small>
          </span>
        </template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:16px;" v-show="tileType==='x-small'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailSmall" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">Ask any local about the origins of all this cultivation</div></template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:16px;" v-show="tileType==='x-small'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><img :src="thumbnailSmall" alt="" /></template>
        <template slot="title"><div class="dp-tile__title">Ask any local about the origins of all this cultivation</div></template>
        <template slot="label">
          <span class="dp-tile__label dp-label dp-label--blue dp-label--white-bg">
            <small>travel</small>
          </span>
        </template>
        <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
      </dp-article-tile>
    </div>
    <div style="margin-top:20px;" v-show="tileType==='full'">
      <dp-article-tile :url="url" :target="target" :type="tileType" :is-stacked="isStacked">
        <template slot="img"><div class="dp-tile__img" role="img" aria-label="article image" :style="{'background-image': 'url(' + thumbnailLarge + ')'}"></div></template>
        <template slot="title"><div class="dp-tile__title">8 Tips to Save Money Everyday very long title</div></template>
        <template slot="desc"><p class="dp-tile__desc">Vivamus venenatis urna non mi vulputate, lobortis blandit nunc ultricies.</p></template>
        <template slot="label">
          <span class="dp-tile__label dp-label dp-label--blue dp-label--white-bg">
            <small>credit cards</small>
          </span>
        </template>
      </dp-article-tile>
    </div>
  </div>
</template>
<script>
import thumbnailLarge from './images/article-tile_300.jpeg'
import thumbnailSmall from './images/article-tile_60x60.jpeg'
const tileMode = [
  'large',
  'small',
  'x-small',
  'full'
]
const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark'
}

const targetTypes = {
  '_blank': '_blank',
  '_self': '_self',
  '_parent': '_parent',
  '_top': '_top',
  '': null
}

export default {
  data() {
    return {
      tileType: select('TileType', tileMode, 'large'),
      isStacked: boolean('isStacked', false),
      url: text('Article Tile Url', null),
      target: select('Target type', targetTypes, null),
      themesType: select('ThemesType', themesMode, ''),
      thumbnailLarge: thumbnailLarge,
      thumbnailSmall: thumbnailSmall
    }
  },
  computed: {
    isDesktop() {
      return this.$screen.resize && this.$screen.desktop()
    },
    contWidth() {
      let style = ''
      if (this.tileType === 'large') {
        if (!this.isDesktop) {
          style = 'width:327px;max-width:100%;'
        } else {
          style = 'width:262px;max-width:100%;'
        }
      }
      if (this.tileType === 'small' || this.tileType === 'x-small') {
        style = 'width:380px;max-width:100%;'
      }
      if (this.tileType === 'full') {
        style = 'width:598px;max-width:100%;'
      }
      return style
    }
  },
  mounted() {
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
  },
  watch: {
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
