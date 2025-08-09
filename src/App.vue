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
html,
body {
  background: transparent;
  margin: 0;
  padding: 0;
  -webkit-app-region: drag;
}
</style>
