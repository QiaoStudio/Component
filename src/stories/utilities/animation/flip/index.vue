<template>
  <div class="scene">
    <div class="card" :class="classObject" @click="isFlipped = !isFlipped"/>
    Click on the card to flip it
  </div>
</template>

<script>

export default {
  data() {
    return {
      isFlipped: false
    }
  },
  computed: {
    classObject() {
      return this.isFlipped ? { 'dp-flip-next': true } : { 'dp-flip-previous': true }
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  width: 200px;
  height: 260px;
  border: 1px solid #CCC;
  font-size: 16px;
  perspective: 1000px;
  text-align: center;
  display: flex;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
