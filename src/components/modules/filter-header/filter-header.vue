<template>
  <div class="dp-filter-header">
    <div class="dp-filter-header__container"
         :class="{ 'dp-filter-header--sticky': sticky }">
      <template v-if="sticky">
        <com-button class="dp-button--home-secondary dp-filter-header__button__edit"
                    @click="onEditClick">
          <i class="dp-button__icon--left fa fa-edit"></i>
          {{ editLabel }}
        </com-button>
        <com-button class="dp-button--home-secondary dp-filter-header__button__filter"
                    @click="onFilterClick">
          <i class="dp-button__icon--left fa fa-filter"></i>
          {{ filterLabel }}
          <span class="dp-button__icon--right">
            <com-badge :max="maxFilters"
                       :value="currentFilters" />
          </span>
        </com-button>
      </template>
      <template v-else>
        <span class="dp-filter-header__status">{{ status }}</span>
        <span class="dp-filter-header__button">
          <com-button class="dp-button--text dp-button--sm dp-filter-header__button__edit"
                      @click="onEditClick">
            <i class="dp-button__icon--left fa fa-edit"></i>
            {{ editLabel }}
          </com-button>
          <com-button class="dp-button--text dp-button--sm dp-filter-header__button__filter"
                      @click="onFilterClick">
            <i class="dp-button__icon--left fa fa-filter"></i>
            {{ filterLabel }}
            <span class="dp-button__icon--right">
              <com-badge :max="maxFilters"
                         :value="currentFilters" />
            </span>
          </com-button>
        </span>
      </template>
    </div>
    <p v-if="shouldRenderLabel"
       class="dp-filter-header__label"
       v-text="searchDetail">
    </p>
  </div>
</template>

<script>
import ComBadge from 'elements/badge/index.js'
import ComButton from 'elements/button/index.js'

export default {
  name: 'dp-filter-header',
  components: {
    ComBadge,
    ComButton
  },
  data() {
    return {
      maxFilters: 9
    }
  },
  props: {
    sticky: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    },
    currentFilters: {
      type: Number,
      default: 0
    },
    editLabel: {
      type: String
    },
    filterLabel: {
      type: String
    },
    searchDetail: {
      type: String
    }
  },
  computed: {
    shouldRenderLabel() {
      return !this.sticky && this.searchDetail && this.searchDetail.trim()
    }
  },
  methods: {
    onEditClick() {
      this.$emit('open-search')
    },
    onFilterClick() {
      this.$emit('open-filter')
    }
  }
}
</script>

<style lang="scss">
@import "~assets/css/modules/filter-header";
</style>
