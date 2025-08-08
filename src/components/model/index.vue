<template>
    <div class="mt-5">
        <component :is="name" :model-path="modelPath" v-bind="cavSize" />
    </div>
</template>
<script>
import LegacyRender from './Legacy.vue'
import CurrentRender from './Current.vue'
import { ref, shallowRef,computed, unref } from 'vue'
export default {
    name: 'ModelRender',
    components: {
        LegacyRender,
        CurrentRender
    },
    setup() {
        const getCavSize = () => ({ width: window.innerWidth, height: window.innerHeight - 20 })
        const modelPath = shallowRef('https://raw.githubusercontent.com/zenghongtu/live2d-model-assets/master/assets/moc/22.2017.newyear/22.2017.summer.normal.1.model.json') // Replace with your actual model path
        const cavSize = ref(getCavSize())
        const isMoc3 = computed(() => unref(modelPath).endsWith('.model3.json'))
        const name = computed(() => isMoc3.value ? 'CurrentRender' : 'LegacyRender')

        return {
            name,
            cavSize,
            modelPath
        }
    },
}
</script>