<template>
  <a-list size="small" :max-height="cavSize.height" :bordered="false" hoverable>
    <a-list-item @click="showHitokoto"> 每日一言 </a-list-item>
    <a-list-item @click="prevModel"> 上一个模型 </a-list-item>
    <a-list-item @click="nextModel"> 下一个模型 </a-list-item>
    <a-list-item> 拖拽调整窗口 </a-list-item>
  </a-list>
</template>

<script>
import { unref, inject } from "vue";
import useModelStore from "@store/model";
export default {
  name: "tool-bar",
  install(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    onShowMessage: Function,
    isResizable: Boolean,
  },
  emits: ["resize"],
  setup(props, { emit }) {
    const { nextModel, prevModel } = useModelStore();
    const showMessage = (text, timeout, priority) => {
      props.onShowMessage({ text, priority, timeout });
    };
    const cavSize = inject("cavSize");
    const showHitokoto = () => {
      fetch("https://v1.hitokoto.cn")
        .then((response) => response.json())
        .then((result) => {
          const text = `${result.hitokoto}`;
          showMessage(text, 6000, 10);
        });
    };

    const setResizable = () => {
      const isResizable = unref(props.isResizable);
      emit("resize", !isResizable);
    };

    return {
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