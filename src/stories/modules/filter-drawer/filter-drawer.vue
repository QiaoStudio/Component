<template>
  <div>
    <div><dp-button @click="open" class="dp-button--primary">Open</dp-button></div>
    <dp-filter-drawer :show-drawer.sync="openDrawer" :title="title">
      <p>Put Content Here</p>
    </dp-filter-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openDrawer: false,
      title: text('Title', '32 Plans')
    }
  },
  methods: {
    open() {
      this.openDrawer = true
    }
  }
}
</script>
