<template>
  <!-- <div class="ml-1"> -->
  <model-render />
  <!-- </div> -->
</template>

<script>
import ModelRender from "./components/model";

export default {
  name: "App",
  components: {
    ModelRender,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
