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
        <select-model /> 
      </a-space>
    </div>

    <simple-model-render />

    <a-drawer
      :width="350"
      :visible="visible"
      :unmount-on-close="true"
      @ok="handleOk"
      class="me-drawer"
      style="--color-neutral-3: transparent"
      @cancel="handleCancel"
    >
      <template #title> 设置 </template>
      <p class="text-left mb-2 text-lg font-medium">Live2D模型</p>
      <div
        class="bg-white rounded-md px-4 py-3 mt-3 flex items-center justify-between"
      >
        <div class="text-left">
          <h2 class="font-medium text-base h-6">选择模型</h2>
        </div>
        <select-model v-model:model-path="modelSetting.modelPath" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { IconPushpin } from "@arco-design/web-vue/es/icon";
// import { shallowRef, reactive, toRaw, unref } from "vue";
import SelectModel from "@components/select-model";
// import useModelStore from "@store/model";
// import { setStorageItem } from "@utils/dbStorage.js";

export default {
  name: "App",
  components: {
    // IconSettings,
    IconPushpin,
    SelectModel,
  },
  setup() {
    // const visible = shallowRef(false);
    // const { modelPath } = useModelStore();
    // const modelSetting = reactive({ modelPath: unref(modelPath) });
    // const onClickSettings = () => {
    //   visible.value = true;
    // };

    // const handleCancel = () => {
    //   visible.value = false;
    // };

    // // 保存设置
    // const handleOk = () => {
    //   setStorageItem("modelSetting", toRaw(modelSetting));
    //   handleCancel();
    //   modelPath.value = modelSetting.modelPath;
    // };
    return {
      // visible,
      // handleOk,
      // onClickSettings,
      // handleCancel,
      // modelSetting,
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

.me-drawer .arco-drawer-body {
  background-color: #f5f5f5;
}
</style>
