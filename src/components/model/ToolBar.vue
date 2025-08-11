<template>
  <div
    class="h-screen flex flex-col justify-center w-12 text-gray-400 opacity-0 absolute right-0 top-1/2 transform -translate-y-1/2 transition-opacity duration-1000 hover:opacity-100"
  >
    <span
      v-for="item in toolList"
      :key="item.name"
      class="block text-center !leading-8 transition-colors duration-300 cursor-pointer text-gray-600 hover:text-yellow-500"
      :class="`fa fa-lg fa-${item.icon}`"
      @click.stop.prevent="item.call"
    />
    <!-- <span
      class="fa fa-lg fa-arrows block text-center leading-8 cursor-pointer"
      style="-webkit-app-region: drag"
    /> -->
  </div>
</template>

<script>
import { unref } from "vue";
import useModelStore from "../../store/model";
export default {
  props: {
    onShowMessage: Function,
    isResizable: Boolean,
  },
  emits: ["resize"],
  setup(props, { emit }) {
    const { nextModel } = useModelStore();
    // const store = useStore()

    // const modelPath = computed(() => store.state.config.modelPath)
    // const resizable = computed(() => store.state.win.resizable)

    const showMessage = (text, timeout, priority) => {
      props.onShowMessage({ text, priority, timeout });
    };

    const showHitokoto = () => {
      fetch("https://v1.hitokoto.cn")
        .then((response) => response.json())
        .then((result) => {
          const text = `${result.hitokoto}`;
          showMessage(text, 6000, 10);
        });
    };

    const loadOtherModel = () => {
      nextModel();
    };

    const setResizable = () => {
      const isResizable = unref(props.isResizable);
      emit("resize", !isResizable);
    };

    const showInfo = () => {
      showMessage("", 8000, 11);
    };

    return {
      toolList: [
        { name: "comment", icon: "comment", call: showHitokoto },
        { name: "user", icon: "user-circle", call: loadOtherModel },
        { name: "square", icon: "square-o", call: setResizable },
        { name: "info", icon: "info-circle", call: showInfo },
      ],
      showMessage,
      showHitokoto,
      loadOtherModel,
      setResizable,
      showInfo,
    };
  },
};
</script>