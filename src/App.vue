<template>
  <a-trigger
    trigger="contextMenu"
    align-point
    :popup-visible="visible"
    @popup-visible-change="handleVisibleChange"
  >
    <model-render />
    <template #content>
      <div
        @click="visible = false"
        class="bg-white cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        <tool-bar />
      </div>
    </template>
  </a-trigger>
</template>
<script>
import { debounce } from "lodash-es";
import { onMounted, onUnmounted, provide, ref } from "vue";
export default {
  name: "App",
  setup() {
    const getCavSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
    const visible = ref(false);
    const cavSize = ref(getCavSize());
    provide("cavSize", cavSize);
    const handleResize = debounce(() => {
      cavSize.value = getCavSize();
    }, 1000);

    const handleVisibleChange = (val) => {
      visible.value = val;
    };

    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      visible,
      handleVisibleChange,
    };
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
