<template>
  <div class="components-container">
    <h2 class="title">
      Globals
    </h2>

    <div class="wrap">
      <p class="brief brief-margin">Com Icon</p>
      <brand-icon/>
    </div>

  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name:'globals-page',
  beforeCreate() {
    const DpIcon = require('src/stories/globals/icons/brand-icon').default
    this.$options.components['brand-icon'] = DpIcon
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
