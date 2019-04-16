<template>
  <div class="dp-megamenu">
    <div v-for="column in columns"
         :key="column.title">
      <span>{{ column.title }}</span>
      <div v-if="column.type === 'article'">
        <div v-for="(item, index) in column.items"
             :key="index"
             v-if="item.url && item.title"
             class="dp-megamenu__article">
          <a :href="item.url"
             :target="!item.target ? '_self' : item.target">
            <div v-if="item.imgUrl"
                 class="dp-megamenu__article-img">
              <img :src="item.imgUrl" :alt="item.title"/>
            </div>
            <div v-if="item.title || item.description">
              <span v-if="item.title"
                    class="dp-megamenu__article-title"
                    v-html="item.title">
              </span>
              <p v-if="item.description"
                 class="dp-megamenu__article-desc"
                 v-html="item.description">
              </p>
            </div>
          </a>
        </div>
      </div>
      <ul v-else
          :class="{ 'dp-megamenu__link--two-column': column.layout === 'two-column' }">
        <li v-for="(item, index) in column.items"
            :key="index"
            v-if="item.url && item.label"
            class="dp-megamenu__link">
          <a :href="item.url"
             :target="!item.target ? '_self' : item.target">
            <dp-icon
              v-if="item.iconType && item.iconCategory && item.iconDisplay"
              :type="item.iconType"
              :category="item.iconCategory"
              :display="item.iconDisplay">
            </dp-icon>
            <span class="dp-megamenu__link-label"
                  v-html="item.label">
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
@import '~assets/css/elements/megamenu';
</style>
<script>
import DpIcon from 'components/globals/icons'
export default {
  name: 'dp-megamenu',
  components: {
    [DpIcon.name]: DpIcon
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
}
</script>
