<template>
  <div>
    <dp-filter-header
      :edit-label="editLabel"
      :filter-label="filterLabel"
      :status="status"
      :sticky="sticky"
      :current-filters="currentFilters"
      :search-detail="searchDetail">
    </dp-filter-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editLabel: text('Edit Search Label', 'Edit'),
      filterLabel: text('Filter Label', 'Filter'),
      status: text('Status', '23 travel plans'),
      sticky: boolean('Is Sticky', false),
      currentFilters: number('Current Filters', 10),
      searchDetail: text('Label (leave it empty to turn it off)', 'Single Trip | 4 persons | to Australia | From 15 Jun to 17 Jun')
    }
  }
}
</script>
