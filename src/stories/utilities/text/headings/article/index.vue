<template>
  <div class="dp-theme-article">
    <h1 class="dp-title">8 tips to save money every day</h1>
    <h2 class="dp-title">8 tips to save money every day</h2>
    <h2 class="dp-title dp-title--sub">CATEGORIES</h2>
    <div class="dp-author__byline">
      <span class="dp-span--sm" :class="{'dp-span-wrap': isSpanWrap}">
        <span class="dp-author-wrap">By<a>Walter White</a></span>
        <span class="dp-date-wrap">last updated 12 February 2018</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSpanWrap: boolean('Is Span SM Wrap', false)
    }
  }
}
</script>
