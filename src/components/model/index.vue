<template>
  <div
    @mouseover="handleMouseOver"
    @click="handleClick"
    class="h-screen w-screen overflow-hidden"
  >
    <tips-render v-bind="tips" />
    <tool-bar :on-show-message="onShowMessage" />
    <div class="mt-5">
      <component :is="name" :model-path="modelPath" v-bind="cavSize" />
    </div>
  </div>
</template>
<script>
import LegacyRender from "./Legacy.vue";
import CurrentRender from "./Current.vue";
import TipsRender from "./Tips.vue";
import ToolBar from "./ToolBar.vue";
import zhTips from "./tips/zh.json";
import { ref, shallowRef, computed, unref } from "vue";

export default {
  name: "ModelRender",
  components: {
    LegacyRender,
    CurrentRender,
    TipsRender,
    ToolBar,
  },
  setup() {
    const tipJSONs = zhTips;
    const getCavSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
    const tips = ref({
      text: "0",
      priority: -1,
      timeout: 0,
    });
    const modelPath = shallowRef(
      "https://raw.githubusercontent.com/zenghongtu/live2d-model-assets/master/assets/moc/22.2017.school/22.2017.valley.model.json"
    ); // Replace with your actual model path
    const cavSize = ref(getCavSize());
    const isMoc3 = computed(() => unref(modelPath).endsWith(".model3.json"));
    const name = computed(() =>
      isMoc3.value ? "CurrentRender" : "LegacyRender"
    );

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

    return {
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