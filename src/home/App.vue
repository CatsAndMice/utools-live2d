<template>
  <div class="h-screen w-screen overflow-hidden" style="background: #f5f5f5">
    <simple-model-render>
      <template #default="{ isLoading }">
        <!-- 右上角固定图标 -->
        <div
          v-show="!isLoading"
          class="absolute top-4 right-4 flex bg-white px-3 py-1 rounded-full"
        >
          <a-space>
            <a-tooltip content="常驻桌面">
              <a-button shape="circle" style="--color-secondary: #fff">
                <icon-pushpin class="!w-5 !h-5" />
              </a-button>
            </a-tooltip>
            <select-model />
          </a-space>
        </div>
      </template>
    </simple-model-render>
  </div>
</template>

<script>
import SelectModel from "@components/select-model";
import { IconPushpin } from "@arco-design/web-vue/es/icon";
export default {
  components: {
    SelectModel,
    IconPushpin,
  },
  setup() {},
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

.me-drawer .arco-drawer-body {
  background-color: #f5f5f5;
}
</style>
