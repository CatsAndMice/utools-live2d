<template>
  <div class="h-screen w-screen overflow-hidden" style="background: #f5f5f5">
    <!-- 右上角固定图标 -->
    <div class="absolute top-4 right-4 flex bg-white rounded-md px-4 py-1">
      <a-space>
        <a-button shape="circle" class="bg-white" title="设置">
          <icon-settings class="!w-5 !h-5" />
        </a-button>
        <a-button shape="circle" class="bg-white" title="常驻桌面">
          <icon-pushpin class="!w-5 !h-5" />
        </a-button>
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
