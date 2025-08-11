<template>
  <canvas id="live2d" class="live2d"></canvas>
</template>
<script>
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { toRefs, unref, onMounted, watch } from "vue";

window.PIXI = PIXI;
export default {
  props: {
    modelPath: String,
    width: Number,
    height: Number,
  },
  setup(props) {
    const { width, height, modelPath } = toRefs(props);
    const initLive2DModel = async () => {
      // 引入模型
      const model = await Live2DModel.from(unref(modelPath));
      // 创建模型对象
      const app = new PIXI.Application({
        // 配置模型舞台
        view: document.getElementById("live2d"),
        // 背景是否透明
        transparent: true,
        autoDensity: true,
        autoResize: true,
        antialias: true,
        // 高度
        height: unref(height),
        // 宽度
        width: unref(width),
      });

      app.stage.addChild(model);
      // 计算合适的缩放比例
      const scale = Math.min(
        unref(width) / model.internalModel.width,
        unref(height) / model.internalModel.height
      );
      // 应用缩放和居中
      model.scale.set(scale);
      model.x = unref(width) / 2 - (model.internalModel.width * scale) / 2;
    };

    // 监听尺寸变化
    watch([width, height, modelPath], () => {
      initLive2DModel();
    });

    onMounted(() => {
      initLive2DModel();
    });
  },
};
</script>