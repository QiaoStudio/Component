<template>
  <div class="components-container">
    <h2 class="title">
      Modules
    </h2>

    <div class="wrap">
      <p class="brief brief-margin">Com announcement</p>
      <announcement />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Panel</p>
      <panel />
    </div>

    <div class="wrap">
      <p class="brief">Com Article Tile</p>
      <article-tile />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Article Tile With Snippet</p>
      <article-tile-with-snippet />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Selection Block</p>
      <selection-block />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Author Byline</p>
      <author-byline />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Author Profile</p>
      <author-profile />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Modal confirmation</p>
      <modal-confirmation />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Tips Card</p>
      <tips-card />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Navbar</p>
      <navbar />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Filter Drawer</p>
      <filter-drawer />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Filter Header</p>
      <filter-header />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Mobile Dual Key Value Tile</p>
      <mobile-dual-key-value-tile />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Blog Category Tile</p>
      <blog-category-tile />
    </div>
    <div class="wrap">
      <p class="brief brief-margin">Com Article Header</p>
      <article-header />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com CTA Tile</p>
      <cta-tile />
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Image With Caption</p>
      <image-with-caption/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Footer</p>
      <dp-footer />
	  </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Mobile Menu</p>
      <mobile-menu />
	  </div>
  </div>
</template>
<script>
export default {
  name:'modules-page',
  beforeCreate() {
    const Announcement = require('src/stories/modules/announcement/announcement').default
    this.$options.components.Announcement = Announcement
    const ArticleTile = require('src/stories/modules/article-tile/article-tile').default
    this.$options.components.ArticleTile = ArticleTile
    const ArticleTileWithSnippet = require('src/stories/modules/article-tile-with-snippet/article-tile-with-snippet').default
    this.$options.components.ArticleTileWithSnippet = ArticleTileWithSnippet
    const AuthorByline = require('src/stories/modules/author-byline/author-byline').default
    this.$options.components.AuthorByline = AuthorByline
    const AuthorProfile = require('src/stories/modules/author-profile/author-profile').default
    this.$options.components.AuthorProfile = AuthorProfile
    const BlogCategoryTile = require('src/stories/modules/blog-category-tile/blog-category-tile').default
    this.$options.components.BlogCategoryTile = BlogCategoryTile
    const FilterDrawer = require('src/stories/modules/filter-drawer/filter-drawer').default
    this.$options.components.FilterDrawer = FilterDrawer
    const FilterHeader = require('src/stories/modules/filter-header/filter-header').default
    this.$options.components.FilterHeader = FilterHeader
    const FormfieldLauncher = require('src/stories/modules/formfield-launcher/formfield-launcher').default
    this.$options.components.FormfieldLauncher = FormfieldLauncher
    const ImageWithCaption = require('src/stories/modules/image-with-caption/image-with-caption').default
    this.$options.components.ImageWithCaption = ImageWithCaption
    const MobileDualKeyValueTile = require('src/stories/modules/mobile-dual-key-value-tile/mobile-dual-key-value-tile').default
    this.$options.components.MobileDualKeyValueTile = MobileDualKeyValueTile
    const ModalConfirmation = require('src/stories/modules/modal-confirmation/modal-confirmation').default
    this.$options.components.ModalConfirmation = ModalConfirmation
    const Navbar = require('src/stories/modules/navbar/navbar').default
    this.$options.components.Navbar = Navbar
    const Panel = require('src/stories/modules/panel/panel').default
    this.$options.components.Panel = Panel
    const SelectionBlock = require('src/stories/modules/selection-block/selection-block').default
    this.$options.components.SelectionBlock = SelectionBlock
    const TipsCard = require('src/stories/modules/tips-card/tips-card').default
    this.$options.components.TipsCard = TipsCard
    const CtaTile = require('src/stories/modules/cta-tile/cta-tile').default
    this.$options.components.CtaTile = CtaTile
    const ArticleHeader = require('src/stories/modules/article-header/article-header').default
    this.$options.components.ArticleHeader = ArticleHeader
    const DpFooter = require('src/stories/modules/footer/footer').default
    this.$options.components.DpFooter = DpFooter
    const MobileMenu = require('src/stories/modules/mobile-menu/mobile-menu').default
    this.$options.components.MobileMenu = MobileMenu
  }
}
</script>
<style>
.wrap {
  padding: 20px;
  border-bottom: 1px dotted #ccc;
}

p.brief {
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 0;
}

p.brief-margin {
  margin-bottom: 15px;
}

.subtitle,
.brief {
  font-weight: 300;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.components-container {
  text-align: left;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}
</style>
