<template>
  <div class="components-container">
    <h2 class="title">
      Elements
    </h2>

    <div class="wrap">
      <p class="brief brief-margin">Com Autocomplete</p>
      <auto-complete/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Accordion</p>
      <accordion/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com AccordionGroup</p>
      <accordion-group/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Attachment</p>
      <attachment/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Badge</p>
      <badge/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Brand</p>
      <brand/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Breadcrumbs</p>
      <breadcrumbs/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Button</p>
      <dp-button/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Checkbox</p>
      <checkbox/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Checkbox Group</p>
      <checkbox-group/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Coverage Detail</p>
      <coverage-detail/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Coverage Score</p>
      <coverage-score/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Currency Input</p>
      <currency-input/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Date Picker</p>
      <date-picker/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Exclusive</p>
      <exclusive/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com ExpandableText</p>
      <expandable-text/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com KeyValueWithLabel</p>
      <key-value-with-label/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Label</p>
      <dp-label/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Loader</p>
      <loader/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Logo</p>
      <logo/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com LogoWithText</p>
      <logo-with-text/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com LogoTitle</p>
      <logo-title/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Megamenu</p>
      <megamenu/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Message</p>
      <message/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Modal</p>
      <modal/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Popover</p>
      <popover/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Premium</p>
      <premium/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com ProgressBar</p>
      <progress-bar/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Promotion</p>
      <promotion/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Quote</p>
      <quote/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Radio</p>
      <radio/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Radio Group</p>
      <radio-group/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Rating</p>
      <rating/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Searchbar</p>
      <search-bar/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Select</p>
      <dp-select/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Slider</p>
      <slider/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Table</p>
      <dp-table/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Tabs</p>
      <tabs/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com TextInput</p>
      <text-input/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com TextArea</p>
      <text-area/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com UpdateInfo</p>
      <update-info/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Hero</p>
      <dp-hero/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Hero With Fixed Header</p>
      <dp-hero-with-fixed-header/>
    </div>
  </div>
</template>
<script>
export default {
  name:'elements-page',
  beforeCreate() {
    const AutoComplete = require('src/stories/elements/autocomplete/autocomplete').default
    this.$options.components['auto-complete'] = AutoComplete
    const Accordion = require('src/stories/elements/accordion/accordion').default
    this.$options.components['accordion'] = Accordion
    const AccordionGroup = require('src/stories/elements/accordion/accordion-group').default
    this.$options.components['accordion-group'] = AccordionGroup
    const Attachment = require('src/stories/elements/attachment/attachment').default
    this.$options.components['attachment'] = Attachment
    const Badge = require('src/stories/elements/badge/badge').default
    this.$options.components['badge'] = Badge
    const Brand = require('src/stories/elements/brand/brand').default
    this.$options.components['brand'] = Brand
    const Breadcrumbs = require('src/stories/elements/breadcrumbs/breadcrumbs').default
    this.$options.components['breadcrumbs'] = Breadcrumbs
    const Button = require('src/stories/elements/button/button').default
    this.$options.components['dp-button'] = Button
    const Checkbox = require('src/stories/elements/checkbox/checkbox').default
    this.$options.components['checkbox'] = Checkbox
    const CheckboxGroup = require('src/stories/elements/checkbox/checkbox-group').default
    this.$options.components['checkbox-group'] = CheckboxGroup
    const CoverageDetail = require('src/stories/elements/coverage-detail/coverage-detail').default
    this.$options.components['coverage-detail'] = CoverageDetail
    const CoverageScore = require('src/stories/elements/coverage-score/coverage-score').default
    this.$options.components['coverage-score'] = CoverageScore
    const CurrencyInput = require('src/stories/elements/currency-input/currency-input').default
    this.$options.components['currency-input'] = CurrencyInput
    const DatePicker = require('src/stories/elements/date-picker/date-picker').default
    this.$options.components['date-picker'] = DatePicker
    const Exclusive = require('src/stories/elements/exclusive/exclusive').default
    this.$options.components['exclusive'] = Exclusive
    const ExpandableText = require('src/stories/elements/expandable-text/expandable-text').default
    this.$options.components['expandable-text'] = ExpandableText
    const KeyValueWithLabel = require('src/stories/elements/key-value-with-label/key-value-with-label').default
    this.$options.components['key-value-with-label'] = KeyValueWithLabel
    const DpLabel = require('src/stories/elements/label/label-solid').default
    this.$options.components['dp-label'] = DpLabel
    const Loader = require('src/stories/elements/loader/loader').default
    this.$options.components['loader'] = Loader
    const Logo = require('src/stories/elements/logo/logo').default
    this.$options.components['logo'] = Logo
    const LogoWithText = require('src/stories/elements/logo/logo-with-text').default
    this.$options.components['logo-with-text'] = LogoWithText
    const LogoTitle = require('src/stories/elements/logo-title/logo-title').default
    this.$options.components['logo-title'] = LogoTitle
    const Megamenu = require('src/stories/elements/megamenu/megamenu').default
    this.$options.components['megamenu'] = Megamenu
    const Message = require('src/stories/elements/message/message').default
    this.$options.components['message'] = Message
    const Modal = require('src/stories/elements/modal/modal').default
    this.$options.components['modal'] = Modal
    const Popover = require('src/stories/elements/popover/popover').default
    this.$options.components['popover'] = Popover
    const Premium = require('src/stories/elements/premium/premium').default
    this.$options.components['premium'] = Premium
    const ProgressBar = require('src/stories/elements/progress-bar/progress-bar').default
    this.$options.components['progress-bar'] = ProgressBar
    const Promotion = require('src/stories/elements/promotion/promotion').default
    this.$options.components['promotion'] = Promotion
    const Quote = require('src/stories/elements/quote/quote').default
    this.$options.components['quote'] = Quote
    const Radio = require('src/stories/elements/radio/radio').default
    this.$options.components['radio'] = Radio
    const RadioGroup = require('src/stories/elements/radio/radio-group').default
    this.$options.components['radio-group'] = RadioGroup
    const Rating = require('src/stories/elements/rating/rating').default
    this.$options.components['rating'] = Rating
    const SearchBar = require('src/stories/elements/search-bar/search-bar').default
    this.$options.components['search-bar'] = SearchBar
    const DpSelect = require('src/stories/elements/select/select').default
    this.$options.components['dp-select'] = DpSelect
    const Slider = require('src/stories/elements/slider/slider').default
    this.$options.components['slider'] = Slider
    const DpTable = require('src/stories/elements/table/table').default
    this.$options.components['dp-table'] = DpTable
    const Tabs = require('src/stories/elements/tabs/tabs').default
    this.$options.components['tabs'] = Tabs
    const TextInput = require('src/stories/elements/text-input/text-input').default
    this.$options.components['text-input'] = TextInput
    const TextArea = require('src/stories/elements/textarea/text-area').default
    this.$options.components['text-area'] = TextArea
    const UpdateInfo = require('src/stories/elements/update-info/update-info').default
    this.$options.components['update-info'] = UpdateInfo
    const DpHero = require('src/stories/elements/hero/hero').default
    this.$options.components['dp-hero'] = DpHero
    const DpHeroWithFixeedHeader = require('src/stories/elements/hero/with-fixed-header').default
    this.$options.components['dp-hero-with-fixed-header'] = DpHeroWithFixeedHeader
  }
}
</script>

<style>
.wrap {
  padding: 20px;
  border-bottom: 1px dotted #ccc;
  position: relative;
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
