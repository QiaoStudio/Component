<template>
  <div>
    <div class="visible-xs-flex">
      <p class="text-for-xs">Visible - Flex <span>(Extra Small)</span></p>
    </div>
    <div class="visible-xs-block">
      <p class="text-for-xs">Visible - Block <span>(Extra Small)</span></p>
    </div>
    <div class="visible-xs-inline">
      <p class="text-for-xs">Visible - Inline <span>(Extra Small)</span></p>
    </div>
    <div class="visible-xs-inline-block">
      <p class="text-for-xs">Visible - Inline-Block <span>(Extra Small)</span></p>
    </div>
    <div class="visible-sm-flex">
      <p class="text-for-sm">Visible - Flex <span>(Small)</span></p>
    </div>
    <div class="visible-sm-block">
      <p class="text-for-sm">Visible - Block <span>(Small)</span></p>
    </div>
    <div class="visible-sm-inline">
      <p class="text-for-sm">Visible - Inline <span>(Small)</span></p>
    </div>
    <div class="visible-sm-inline-block">
      <p class="text-for-sm">Visible - Inline-Block <span>(Small)</span></p>
    </div>
    <div class="visible-md-flex">
      <p class="text-for-md">Visible - Flex <span>(Medium)</span></p>
    </div>
    <div class="visible-md-block">
      <p class="text-for-md">Visible - Block <span>(Medium)</span></p>
    </div>
    <div class="visible-md-inline">
      <p class="text-for-md">Visible - Inline <span>(Medium)</span></p>
    </div>
    <div class="visible-md-inline-block">
      <p class="text-for-md">Visible - Inline-Block <span>(Medium)</span></p>
    </div>
    <div class="visible-lg-flex">
      <p class="text-for-lg">Visible - Flex <span>(Large)</span></p>
    </div>
    <div class="visible-lg-block">
      <p class="text-for-lg">Visible - Block <span>(Large)</span></p>
    </div>
    <div class="visible-lg-inline">
      <p class="text-for-lg">Visible - Inline <span>(Large)</span></p>
    </div>
    <div class="visible-lg-inline-block">
      <p class="text-for-lg">Visible - Inline-Block <span>(Large)</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .text-for-lg,
  .text-for-md,
  .text-for-sm,
  .text-for-xs {
    padding: 1em;
    font-size: 1.8rem;

    span {
      font-weight: 700;
    }
  }
  .text-for-lg {

    span {
      color: #00b84b;
    }
  }
  .text-for-md {

    span {
      color: #227fed;
    }
  }
  .text-for-sm {

    span {
      color: #d58600;
    }
  }
  .text-for-xs {

    span {
      color: #93a4ac;
    }
  }
</style>
