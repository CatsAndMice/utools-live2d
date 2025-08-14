<template>
  <a-dropdown @select="handleSelect" position="br">
    <a-tooltip content="预览 Live2D 模型" position="left">
      <a-button shape="circle" style="--color-secondary: #fff">
        <icon-common class="!w-5 !h-5" />
      </a-button>
    </a-tooltip>
    <template #content>
      <a-doption
        v-for="model in models"
        :key="model.name"
        :value="model.modelPath"
        class="flex-row-reverse justify-between"
      >
        <template #icon>
          <icon-check
            v-show="model.name === selectedModelName"
            size="16px"
            style="color: #426cf6"
          />
        </template>
        <span class="mr-2"> {{ model.name }} </span>
      </a-doption>
    </template>
  </a-dropdown>
</template>
<script>
import { getModelList, getModelName } from "@utils/modelGroup.js";
import { IconCheck, IconCommon } from "@arco-design/web-vue/es/icon";
import { shallowRef, unref } from "vue";
import useModelStore from "@store/model";
export default {
  name: "select-model",
  components: {
    IconCheck,
    IconCommon,
  },
  emits: ["update:model-path"],
  setup() {
    const { modelPath } = useModelStore();
    const selectedModelName = shallowRef(getModelName(unref(modelPath)));
    const models = getModelList();
    const handleSelect = (path) => {
      selectedModelName.value = getModelName(path);
      modelPath.value = path;
    };
    return {
      models,
      selectedModelName,
      handleSelect,
    };
  },
};
</script>
<style scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
<style>
.arco-dropdown-option-icon {
  margin: 0 !important;
}
</style>