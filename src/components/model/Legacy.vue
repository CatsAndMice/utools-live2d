<template>
  <canvas id="live2d" class="live2d" :width="width" :height="height"></canvas>
</template>

<script>
import { onMounted, watch } from "vue";

// 覆盖 hitTestSimpleCustom 方法
window.Live2D.hitTestSimpleCustom = function () {
  return { hit: false }; // 返回一个默认值，避免访问未定义的数组项
};
export default {
  name: "LegacyRender",

  props: {
    modelPath: String,
    width: Number,
    height: Number,
  },

  setup(props) {
    const loadModel = (path) => {
      if (!path) return;
      window.loadlive2d("live2d", path, {
        autoMotion: true,
        motionInterval: 1000,
        x: "center", // 水平居中
        y: "center", // 垂直居中
        onError: console.error,
        onLoad: () => console.log("Model loaded successfully"),
      });
    };

    // 初始加载
    onMounted(() => loadModel(props.modelPath));

    // 监听路径变化
    watch(() => props.modelPath, loadModel);

    // 监听尺寸变化
    watch([() => props.height, () => props.width], () =>
      loadModel(props.modelPath)
    );

    return {};
  },
};
</script>

<style scoped>
.live2d {
  background: transparent !important;
  /* 如果需要添加样式可以在这里添加 */
}
</style>