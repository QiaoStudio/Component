import SearchBar from './search-bar.vue'

SearchBar.install = function (Vue) {
  Vue.component(SearchBar.name, SearchBar)
}

export default SearchBar
