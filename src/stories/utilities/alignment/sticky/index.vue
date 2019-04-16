<template>
  <div class="wrapper">
    <main class="main">
      <div class="sidebar" v-sticky-position>
        <ul>
          <li v-for="i in 10" :key="i">{{ i }}</li>
        </ul>
      </div>
      <div class="content">
        <h1>Scroll it down</h1>
        <template v-for="i in 30">
          <h3 :key="'a-' + i">Long description {{ i }}</h3>
          <p :key="'b-' + i">
            A long description is a way to provide long alternative text for non-text elements, such as images. Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it less descriptive or meaningful, should have a long description. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images.
            Like alternative text, long description should be descriptive and meaningful. It should also include all text that is incorporated into the image. A long description should provide visually-impaired users with as much information as sighted users would understand from the image.
          </p>
        </template>
      </div>
    </main>
    <footer>
      Footer
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/css/settings/style";

.wrapper {
  display: flex;
  max-height: 500px;
  overflow: scroll;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
  .main {
    flex: 1 0 auto;
    display: flex;
    .sidebar {
      background-color: #d8d8d8;
      flex: 0 0 300px;
      padding: 10px;
      margin-top: 30px;
      margin-right: 15px;
      height: 600px;
      ul {
        list-style: none;
        li {
          height: 50px;
          background: $color-background-gray-2;
          margin: 5px 0;
        }
      }
    }
    .content {
      background-color: #d8d8d8;
      padding: 10px;
      flex: 1;
    }
  }
  footer {
    flex-shrink: 0;
    background-color: #d8d8d8;
    margin-top: 10px;
  }
}
</style>
