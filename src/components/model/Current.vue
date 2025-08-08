<template>
    <div class="live2d" ref="live2dRef" :key="Date.now()"></div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'

const parseModelPath = (p) => {
    const paths = p.split('/')
    paths.pop()

    const modelName = paths.pop()
    const basePath = paths.join('/')

    return {
        basePath,
        modelName,
    }
}

export default defineComponent({
    name: 'CurrentRender',
    props: {
        modelPath: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const live2dRef = ref(null)

        const initLive2d = () => {
            const { basePath, modelName } = parseModelPath(props.modelPath)
            new window.l2dViewer({
                el: live2dRef.value,
                basePath,
                modelName,
                width: props.width,
                height: props.height,
                autoMotion: true,
            })
        }

        watch(
            () => [props.modelPath, props.width, props.height],
            () => initLive2d()
        )

        onMounted(() => {
            initLive2d()
        })

        return {
            live2dRef
        }
    }
})
</script>