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
              <a-button
                shape="circle"
                style="--color-secondary: #fff"
                @click="onCreatePushpinBrowserWindow"
              >
                <icon-pushpin class="!w-5 !h-5" />
              </a-button>
            </a-tooltip>
            <select-model />
            <time-setting @load="onReloadChildBrowser" />
          </a-space>
        </div>
      </template>
    </simple-model-render>
  </div>
</template>

<script>
import SelectModel from "@components/select-model";
import { IconPushpin } from "@arco-design/web-vue/es/icon";
import { setStorageItem } from "@utils/dbStorage";
import useModelStore from "@store/model";
import { onBeforeMount, unref, getCurrentInstance } from "vue";
import { Message } from "@arco-design/web-vue";

export default {
  components: {
    SelectModel,
    IconPushpin,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const emitter = proxy.$emitter;
    const { modelPath } = useModelStore();
    const onCreatePushpinBrowserWindow = () => {
      if (window.utools && window.utools.sendToParent) {
        window.utools.hideMainWindow();
        setStorageItem("modelPath", unref(modelPath));
        window.service.createPushpinBrowserWindow();
        return;
      }

      Message.error("请确保 uTools 版本为 6.1.0 或以上");
    };

    const onReloadChildBrowser = () => {
      if (window.pushpinWindow) {
        try {
          window.pushpinWindow.webContents.send("ping", "reload");
        } catch (err) {
          window.pushpinWindow = null;
        }
        return;
      }
    };

    onBeforeMount(() => {
      emitter.off("create-pushpin");
      emitter.on("create-pushpin", onCreatePushpinBrowserWindow);
    });

    return {
      onCreatePushpinBrowserWindow,
      onReloadChildBrowser
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
  /* -webkit-app-region: drag; */
}

.me-drawer .arco-drawer-body {
  background-color: #f5f5f5;
}
</style>
