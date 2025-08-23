<template>
  <!-- @mouseover="handleMouseOver" -->
  <div :class="{ 'border-2 border-dashed border-black': isResizable }" @click="handleClick"
    class="h-screen w-screen overflow-hidden cursor-pointer">
    <tips-render v-bind="tips" v-model="isShopTip" />
    <countdown-tip :is-loading="isLoading || isShopTip || isFail" />
    <div class="mt-5">
      <component :is="name" :model-path="modelPath" v-bind="cavSize" :loading="isLoading"
        @update:loading="isLoading = $event" :fail="isFail" @update:fail="isFail = $event" />
    </div>
    <nice-loading v-if="isLoading" />
    <nice-fail v-if="isFail" />
  </div>
</template>
<script>
import LiveDisplay from "./LiveDisplay.vue";
import TipsRender from "./Tips.vue";
import ToolBar from "./ToolBar.vue";
import zhTips from "./tips/zh.json";
import NiceLoading from "../NiceLoading.vue";
import NiceFail from "../NiceFail.vue";
import CountdownTip from "../CountdownTip.vue";
import {
  ref,
  computed,
  unref,
  inject,
  getCurrentInstance,
  onBeforeMount
} from "vue";
import useModelStore from "@store/model";
export default {
  name: "model-render",
  install(Vue) {
    Vue.component(this.name, this);
  },
  components: {
    LiveDisplay,
    TipsRender,
    ToolBar,
    NiceLoading,
    NiceFail,
    CountdownTip
  },
  setup() {
    const tipJSONs = zhTips;

    const tips = ref({
      text: "0",
      priority: -1,
      timeout: 0,
    });
    const isShopTip = ref(false);
    const { proxy } = getCurrentInstance();
    const emitter = proxy.$emitter;
    const isLoading = ref(true);
    const isFail = ref(false);
    const { modelPath } = useModelStore();
    const cavSize = inject("cavSize");
    const isResizable = inject("isResizable");
    const isMoc3 = computed(() => unref(modelPath).endsWith(".model3.json"));
    const name = computed(() => "LiveDisplay");
    const getRandomTip = (tips, event) => {
      if (!tips) return null;

      let text = Array.isArray(tips.text)
        ? tips.text[Math.floor(Math.random() * tips.text.length)]
        : tips.text;

      return {
        text: text.replace("{text}", event.target.innerText),
        timeout: 4000,
        priority: 8,
      };
    };

    const handleMouseOver = (event) => {
      if (unref(isMoc3)) return;
      const randomTip = getRandomTip(
        tipJSONs.mouseover.find((item) => event.target.matches(item.selector)),
        event
      );
      if (randomTip) {
        tips.value = randomTip;
      }
    };

    const handleClick = (event) => {
      if (unref(isMoc3)) return;
      const randomTip = getRandomTip(
        tipJSONs.click.find((item) => event.target.matches(item.selector)),
        event
      );
      if (randomTip) {
        tips.value = randomTip;
      }
    };

    const onShowMessage = (tipParams) => {
      if (tipParams) {
        tips.value = tipParams;
      }
    };

    onBeforeMount(() => {
      emitter.off("showMessage");
      emitter.on("showMessage", onShowMessage);
    });

    return {
      isShopTip,
      isFail,
      isLoading,
      isResizable,
      onShowMessage,
      name,
      cavSize,
      modelPath,
      tips,
      handleMouseOver,
      handleClick,
    };
  },
};
</script>