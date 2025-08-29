<template>
    <a-button shape="circle" @click="handleClick" style="--color-secondary: #fff">
        <icon-settings class="!w-5 !h-5" />
    </a-button>

    <a-modal v-model:visible="visible" title-align="start" modal-class="right-4 !absolute" :modal-style="{
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    }" unmount-on-close :esc-to-close="false" :mask="false" :align-center="false" :top="60" @ok="handleOk"
        @cancel="handleCancel">
        <template #title>
            偏好设置
        </template>
        <div>
            <div>
                <p class="text-center text-lg ">{{ percent }}分钟</p>
                <a-slider class="slider" :show-tooltip="false" v-model="percent" :min="1" :max="60" :step="1" :marks="{
                    1: '1分钟',
                    60: '60分钟'
                }" />
            </div>
            <div>
                <p class="text-center">{{ percent }}分钟</p>
                <a-slider class="slider" :show-tooltip="false" v-model="percent" :min="1" :max="60" :step="1" :marks="{
                    1: '1分钟',
                    60: '60分钟'
                }" />
            </div>
        </div>
    </a-modal>
</template>
<script>
import { IconSettings } from "@arco-design/web-vue/es/icon";
import { shallowRef } from "vue";
export default {
    name: "time-setting",
    install(Vue) {
        Vue.component(this.name, this);
    },
    components: {
        IconSettings,
    },
    setup() {
        const percent = shallowRef(1)
        const visible = shallowRef(false)
        const handleClick = () => {
            visible.value = true;
        };
        return {
            visible,
            percent,
            handleClick
        }
    },
}
</script>
<style lang="css">
.slider .arco-slider-mark {
    white-space: nowrap;
}

.slider .arco-slider-track::before {
    height: 4px;
}

.slider .arco-slider-bar {
    height: 4px;
}

.slider .arco-slider-dot {
    height: 10px !important;
    width: 10px !important;
}
</style>