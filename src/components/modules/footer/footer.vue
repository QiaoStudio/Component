<template>
  <footer class="dp-footer">
    <div class="container">
      <div class="row">
        <template v-for="(link, index) in links">
          <div :key="index"
               :class="link.columnClass">
            <span class="col-sm-12 dp-footer__title"
                  v-html="link.title" />
            <ul v-if="link.items">
              <template v-for="(item, index) in link.items">
                <li :key="index"
                    :class="item.columnClass"
                    v-if="item.url && item.title">
                  <a class="dp-link"
                     :href="item.url"
                     v-html="item.title" />
                </li>
              </template>
            </ul>
          </div>
        </template>
        <div class="col-xs-12 col-lg-4 dp-footer__social"
             v-if="socialMedia">
          <span class="col-lg-12 dp-footer__title"
                v-html="socialMedia.title" />
          <ul>
            <template v-for="(item, index) in socialMedia.items">
              <li :key="index">
                <a :href="item.url">
                  <i :class="`fa fa-${item.icon}`" aria-hidden="true"></i>
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-lg-4 col-lg-offset-0 dp-footer__country">
          <ul v-if="countries">
            <template v-for="(country, index) in countries">
              <li :key="index"
                  v-if="country.url && country.name">
                <a :href="country.url">
                  <span :class="`dp-icon dp-icon__country dp-icon__country--${country.name}`" />
                </a>
              </li>
            </template>
          </ul>
        </div>
        <div class="col-xs-12 col-lg-4 dp-footer__copyright">
          <span class="dp-footer__copyright"
                v-if="copyright"
                v-html="copyright" />
        </div>
        <div class="col-xs-12 col-lg-4 dp-footer__policy">
          <ul v-if="policyLinks">
            <template v-for="(link, index) in policyLinks">
              <li :key="index"
                  v-if="link.url && link.title">
                <a class="dp-link"
                   :href="link.url"
                   v-html="link.title" />
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import '~assets/css/modules/footer';
</style>

<script>
export default {
  name: 'dp-footer',
  props: {
    links: {
      type: Array,
      required: true
    },
    socialMedia: {
      type: Object,
      required: true
    },
    countries: {
      type: Array,
      required: true
    },
    copyright: {
      type: String,
      required: true
    },
    policyLinks: {
      type: Array,
      required: true
    }
  }
}
</script>
