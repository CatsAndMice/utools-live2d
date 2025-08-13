<template>
  <div class="overflow-hidden h-full w-4/6" ref="dom">
    <component
      :is="name"
      :model-path="modelPath"
      v-bind="cavSize"
      :loading="isLoading"
      @update:loading="isLoading = $event"
      :fail="isFail"
      @update:fail="isFail = $event"
    />
    <nice-loading
      v-if="isLoading"
      :custom-style="{
        width: cavSize.width + 'px',
        height: cavSize.height + 'px',
      }"
    />
    <nice-fail v-if="isFail" />
  </div>
</template>
<script>
import LiveDisplay from "./LiveDisplay.vue";
import NiceLoading from "../NiceLoading.vue";
import NiceFail from "../NiceFail.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import useModelStore from "../../store/model";
import { debounce } from "lodash-es";
import { templateRef } from "@vueuse/core";
export default {
  name: "simple-model-render",
  install(Vue) {
    Vue.component(this.name, this);
  },
  components: {
    LiveDisplay,
    NiceLoading,
    NiceFail,
  },
  setup() {
    const getCavSize = (dom) => ({
      width: dom.clientWidth || dom.offsetWidth,
      height: dom.clientHeight || dom.offsetHeight,
    });
    const dom = templateRef("dom");
    const isLoading = ref(true);
    const isFail = ref(false);
    const { modelPath } = useModelStore();
    const cavSize = ref({ width: 0, height: 0 });
    const name = computed(() => "LiveDisplay");

    const handleResize = debounce(() => {
      cavSize.value = getCavSize(dom.value);
    }, 1000);

    onMounted(async () => {
      cavSize.value = getCavSize(dom.value);
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