<template>
    <canvas id="live2d" class="live2d" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
    name: 'LegacyRender',

    props: {
        modelPath: String,
        width: Number,
        height: Number
    },

    setup(props) {
        const isMountRef = ref(false)

        // 监听 modelPath 变化
        watch(
          () => props.modelPath,
          (newPath) => {
            if (newPath) {
              try {
                window.loadlive2d('live2d', newPath);
              } catch (error) {
                console.error('Failed to load live2d model:', error);
              }
            }
          }
        )

        // 监听尺寸变化 
        watch([() => props.height, () => props.width], () => {
            if (isMountRef.value) {
                window.location.reload()
            } else {
                isMountRef.value = true
            }
        })

        // 初始加载
        onMounted(() => {
            window.loadlive2d('live2d', props.modelPath)
        })

        return {}
    }
}
</script>

<style scoped>
.live2d {
    /* 如果需要添加样式可以在这里添加 */
}
</style>