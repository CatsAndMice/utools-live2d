<template>
  <a-list size="small" :max-height="cavSize.height" :bordered="false" hoverable>
    <a-list-item @click="showHitokoto" class="!px-3 !py-2">
      <div class="flex items-center">
        <icon-message size="16" class="mr-2" />
        每日一言
      </div>
    </a-list-item>
    <a-list-item @click="nextModel" class="!px-3 !py-2">
      <div class="flex items-center">
        <icon-common size="16" class="mr-2" />更改模型
      </div>
    </a-list-item>
    <a-list-item class="!px-3 !py-2" @click="setResizable">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-4 h-4 mr-2"
        >
          <path
            d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"
          /></svg
        >{{ isResizable ? "取消设置窗口宽高" : "设置窗口宽高" }}
      </div>
    </a-list-item>

    <a-list-item class="!px-3 !py-2" @click="onClose">
      <div class="flex items-center">
        <icon-close-circle size="16" class="mr-2" />关闭
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
import { unref, inject, getCurrentInstance } from "vue";
import useModelStore from "@store/model";
import {
  IconMessage,
  IconCloseCircle,
  IconCommon,
} from "@arco-design/web-vue/es/icon";
export default {
  name: "tool-bar",
  install(Vue) {
    Vue.component(this.name, this);
  },
  components: {
    IconCommon,
    IconMessage,
    IconCloseCircle,
  },
  emits: ["resize"],
  setup(props, { emit }) {
    const { nextModel, prevModel } = useModelStore();
    const { proxy } = getCurrentInstance();
    const emitter = proxy.$emitter;
    const showMessage = (text, timeout, priority) => {
      emitter.emit("showMessage", { text, priority, timeout });
    };
    const cavSize = inject("cavSize");
    const isResizable = inject("isResizable");
    const showHitokoto = () => {
      fetch("https://v1.hitokoto.cn")
        .then((response) => response.json())
        .then((result) => {
          const text = `${result.hitokoto}`;
          showMessage(text, 6000, 10);
        });
    };

    const setResizable = () => {
      emit("resize", !unref(isResizable));
    };

    const onClose = () => {
      window.service.onClose();
    };

    return {
      onClose,
      isResizable,
      showMessage,
      showHitokoto,
      nextModel,
      prevModel,
      cavSize,
      setResizable,
    };
  },
};
</script>