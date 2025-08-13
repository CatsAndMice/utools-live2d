<template>
  <div class="h-screen w-screen overflow-hidden" style="background: #f5f5f5">
    <!-- 右上角固定图标 -->
    <div class="absolute top-4 right-4 flex bg-white px-3 py-1 rounded-full">
      <a-space>
        <a-tooltip content="常驻桌面">
          <a-button shape="circle" style="--color-secondary: #fff">
            <icon-pushpin class="!w-5 !h-5" />
          </a-button>
        </a-tooltip>
        <a-tooltip content="设置">
          <a-button shape="circle" style="--color-secondary: #fff">
            <icon-settings class="!w-5 !h-5" />
          </a-button>
        </a-tooltip>
      </a-space>
    </div>
    <simple-model-render />

    <!-- <div class="h-full grow border-l border-solid">
      <select-model />
    </div> -->
  </div>
</template>

<script>
import { IconSettings, IconPushpin } from "@arco-design/web-vue/es/icon";
// import SelectModel from "@components/select-model";
export default {
  name: "App",
  components: {
    IconSettings,
    IconPushpin,
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
