<template>
  <main class="content">
    <menu v-for="(options, filter) in filters"
          class="filters"
          v-show="menus[filter]"
          ref="menu"
          :key="filter">
      <li v-for="(active, option) in filters.countries"
          class="filters__item"
          :class="{ 'filters__item--active': active }"
          :key="option"
          @click="setFilter(filter, option)">
        {{ option }}
      </li>
    </menu>
    <dp-shuffle-transition tag="ul">
      <li class="company"
          v-for="company in list"
          :key="company.id">
        <div class="company__info">
          <h2 class="company__name">{{ company.name }}</h2>
          <blockquote class="company__slogan">{{ company.slogan }}</blockquote>
        </div>
        <ul class="company__details">
          <li class="company__data">
            <label class="company__label">Country</label>
            <p class="company__country"
               @click="clearFilter('countries', company.country)">
              {{ company.country }}
            </p>
          </li>
        </ul>
      </li>
    </dp-shuffle-transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      filters: { countries: {} },
      menus: { countries: true }
    }
  },
  computed: {
    list() {
      let { countries } = this.activeFilters
      return this.companies.filter(({ country }) => {
        if (countries.length && !~countries.indexOf(country)) return false
        return true
      })
    },
    activeFilters() {
      let { countries } = this.filters
      return {
        countries: Object.keys(countries).filter(c => countries[c])
      }
    }
  },
  methods: {
    setFilter(filter, option) {
      this.filters[filter][option] = !this.filters[filter][option]
    },
    clearFilter(filter, except, active) {
      Object.keys(this.filters[filter]).forEach(option => {
        this.filters[filter][option] = except === option && !active
      })
    }
  },
  beforeMount() {
    fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/450744/mock-data.json')
      .then(response => response.json())
      .then(companies => {
        this.companies = companies
        companies.forEach(({ country }) => {
          this.$set(this.filters.countries, country, false)
        })
      })
  }
}
</script>

<style lang="scss">
@import '~assets/css/settings/style';

.content {
  position: relative;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
  color: #3d5358;
  max-width: 780px;
  margin: 0 auto;
  overflow: auto;

  &__list {
    position: relative;
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    backface-visibility: hidden;
  }
}

.company {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 0 1px #c5d0d1;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;

  @media (min-width: 800px) {
    width: calc(100% / 3 - 1rem);
  }

  &__data {
    line-height: 1.3;
  }
  &__label {
    font-size: 0.8rem;
  }
  &__info {
    padding: 0 0.75rem;
    text-align: center;
  }
  &__name {
    height: 2.5rem;
    margin: 0.75rem 0;
    font-size: 1.3rem;
    font-weight: 200;
    text-align: center;
  }
  &__slogan {
    height: 2rem;
    text-align: center;
    font-weight: 400;
    text-transform: capitalize;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 0.5rem 0.75rem;
    background-color: rgba(#c5d0d1, 0.1);
    border-top: 1px solid #c5d0d1;
  }
  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.filters {
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__item {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #c5d0d1;
    border-radius: 6px;
    font-size: 0.8rem;
    line-height: 1.35;
    cursor: pointer;
    transition: all 275ms;

    &:hover {
      border-color: #379a93;
    }

    &--active {
      color: white;
      border-color: #379a93;
      background-color: #379a93;
    }
  }
}
</style>
