<template>
  <div class="overflow-hidden h-full w-full">
    <countdown-tip :is-loading="isLoading || isShopTip || isFail" :is-run="false"/>
    <!-- <countdown-tip :is-loading="isLoading" /> -->
    <component :is="name" :model-path="modelPath" v-bind="cavSize" :loading="isLoading"
      @update:loading="isLoading = $event" :fail="isFail" @update:fail="isFail = $event" />
    <nice-loading v-show="isLoading" :custom-style="{
      width: cavSize.width + 'px',
      height: cavSize.height + 'px',
    }" />
    <nice-fail v-if="isFail" />
  </div>
  <slot name="default" :isLoading="isLoading"></slot>
</template>
<script>
import LiveDisplay from "./LiveDisplay.vue";
import NiceLoading from "../NiceLoading.vue";
import CountdownTip from "../CountdownTip.vue";
import NiceFail from "../NiceFail.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import useModelStore from "../../store/model";
import { debounce } from "lodash-es";

export default {
  name: "simple-model-render",
  install(Vue) {
    Vue.component(this.name, this);
  },
  components: {
    LiveDisplay,
    NiceLoading,
    NiceFail,
    CountdownTip
  },
  setup() {
    const getCavSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const isLoading = ref(true);
    const isFail = ref(false);
    const { modelPath } = useModelStore();
    const cavSize = ref({ width: 0, height: 0 });
    const name = computed(() => "LiveDisplay");

    const handleResize = debounce(() => {
      cavSize.value = getCavSize();
    }, 1000);

    onMounted(async () => {
      cavSize.value = getCavSize();
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      isFail,
      isLoading,
      name,
      cavSize,
      modelPath,
    };
  },
};
</script>