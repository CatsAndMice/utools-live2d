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
    let app = null,
      model = null;
    const createApp = () => {
      return new Promise((resolve) => {
        app = new PIXI.Application({
          view: document.getElementById("live2d"),
          transparent: true,
          autoDensity: true,
          autoResize: true,
          antialias: true,
          // 高度
          height: unref(height),
          // 宽度
          width: unref(width),
        });
        resolve();
      });
    };

    const { width, height, modelPath } = toRefs(props);
    const setModelPosition = (model) => {
      // 计算合适的缩放比例
      const scale = Math.min(
        unref(width) / model.internalModel.width,
        unref(height) / model.internalModel.height
      );
      // 应用缩放和居中
      model.scale.set(scale);
      model.x = unref(width) / 2 - (model.internalModel.width * scale) / 2;
    };

    const bindModelEvent = (model) => {
      let currentMotionIndex = 0;
      model.on("pointerdown", () => {
        try {
          const availableMotions =
            model.internalModel.motionManager.motionGroups;
          const motionNames = Object.keys(availableMotions);
          if (motionNames.length > 0) {
            if (currentMotionIndex > motionNames.length - 1) {
              currentMotionIndex = 0;
            }
            const randomMotion = motionNames[currentMotionIndex];
            model.motion(randomMotion);
            currentMotionIndex++;
          } else {
            console.warn("No available motions found");
          }
        } catch (e) {
          console.error("Failed to get motions:", e);
        }
      });
    };

    const initLive2DModel = async () => {
      if (model) {
        model.destroy();
        model = null;
      }
      // 引入模型
      model = await Live2DModel.from(unref(modelPath));
      // 创建模型对象
      app.stage.addChild(model);
      setModelPosition(model);
      bindModelEvent(model);
    };

    // 监听尺寸变化
    watch(modelPath, () => {
      if (app) {
        initLive2DModel();
      }
    });

    // 监听尺寸变化
    watch([width, height], () => {
      if (app) {
        app.renderer.resize(unref(width), unref(height));

        // console.log(app.renderer,unref(width));

        if (model) {
          setModelPosition(model);
        }
      }
    });

    onMounted(() => {
      createApp().then(initLive2DModel);
    });
  },
};
</script>