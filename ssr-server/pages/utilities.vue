<template>
  <div class="components-container">
    <h2 class="title">
      Utilities
    </h2>

    <div class="wrap">
      <p class="brief brief-margin">Com Shuffle Transition</p>
      <shuffle-transition/>
    </div>

    <div class="wrap">
      <p class="brief brief-margin">Com Sticky Position</p>
      <sticky-position/>
    </div>

  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name:'utilities-page',
  beforeCreate() {
    const ShuffleTransition = require('src/stories/utilities/animation/shuffle').default
    this.$options.components['shuffle-transition'] = ShuffleTransition
    const StickyPosition = require('src/stories/utilities/alignment/sticky').default
    this.$options.components['sticky-position'] = StickyPosition
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
