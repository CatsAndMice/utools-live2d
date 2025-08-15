<template>
  <canvas id="live2d" class="live2d"></canvas>
</template>
<script>
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { toRefs, unref, onMounted, watch } from "vue";
import { to } from "await-to-js";
import { eq } from "lodash-es";
import { setStorageItem, getStorageItem } from "../../utils/dbStorage";

window.PIXI = PIXI;
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    fail: {
      type: Boolean,
      default: false,
    },
    modelPath: String,
    width: Number,
    height: Number,
  },
  emits: ["update:loading", "update:fail"],
  setup(props, { emit }) {
    let app = null,
      model = null,
      maxRetryCount = 3,
      retryCount = 0;
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
      const startTime = Date.now();
      emit("update:fail", false);
      emit("update:loading", true);
      if (!eq(unref(modelPath), getStorageItem("modelPath"))) {
        setStorageItem("modelPath", unref(modelPath));
      }

      // 引入模型
      const [err, beforeModel] = await to(Live2DModel.from(unref(modelPath)));

      // 重试三次
      if (err) {
        if (retryCount < maxRetryCount) {
          retryCount++;
          await initLive2DModel();
          return;
        }
        emit("update:loading", false);
        emit("update:fail", true);
        return;
      }
      model = beforeModel;
      // 创建模型对象
      app.stage.addChild(model);
      setModelPosition(model);
      bindModelEvent(model);
      const endTime = Date.now();
      if (endTime - startTime < 300) {
        setTimeout(() => {
          emit("update:loading", false);
        }, 1500);
        return;
      }
      emit("update:loading", false);
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