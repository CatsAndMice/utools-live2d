import createApp from '@utils/createApp';
import App from './App.vue';
import SimpleModelRender from "@components/simple-model";
import TimeSetting from "@components/TimeSetting.vue";
import Button from "@arco-design/web-vue/es/button";
import Space from "@arco-design/web-vue/es/space";
import Drawer from "@arco-design/web-vue/es/drawer";
import Tooltip from "@arco-design/web-vue/es/tooltip";
import Dropdown from "@arco-design/web-vue/es/dropdown";
import Modal from "@arco-design/web-vue/es/modal";
import Slider from "@arco-design/web-vue/es/slider";
import '@arco-design/web-vue/dist/arco.css';

import mitt from 'mitt';
const emitter = mitt();
window.emitter = emitter;
createApp(App, {
    components: [
        SimpleModelRender,
        TimeSetting,
        Button,
        Space,
        Tooltip,
        Dropdown,
        Drawer,
        Modal,
        Slider
    ],
    globalProperties: {
        '$emitter': emitter
    }
})
