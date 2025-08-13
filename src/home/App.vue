<template>
  <div class="h-screen w-screen overflow-hidden flex">
    <simple-model-render />
    <div class="h-full grow border-l border-solid"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
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
