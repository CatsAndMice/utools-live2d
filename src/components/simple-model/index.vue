<template>
  <div class="overflow-hidden h-full w-full">
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
      v-show="isLoading"
      :custom-style="{
        width: cavSize.width + 'px',
        height: cavSize.height + 'px',
      }"
    />
    <nice-fail v-if="isFail" />
  </div>
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
<script>
import LiveDisplay from "./LiveDisplay.vue";
import NiceLoading from "../NiceLoading.vue";
import NiceFail from "../NiceFail.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import useModelStore from "../../store/model";
import { debounce } from "lodash-es";
import { IconPushpin } from "@arco-design/web-vue/es/icon";
// import { shallowRef, reactive, toRaw, unref } from "vue";
import SelectModel from "@components/select-model";
export default {
  name: "simple-model-render",
  install(Vue) {
    Vue.component(this.name, this);
  },
  components: {
    LiveDisplay,
    NiceLoading,
    NiceFail,
    IconPushpin,
    SelectModel,
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