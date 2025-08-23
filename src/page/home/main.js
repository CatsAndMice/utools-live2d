import createApp from '@utils/createApp';
import App from './App.vue';
import SimpleModelRender from "@components/simple-model";
import Button from "@arco-design/web-vue/es/button";
import space from "@arco-design/web-vue/es/space";
import Drawer from "@arco-design/web-vue/es/drawer";
import tooltip from "@arco-design/web-vue/es/tooltip";
import Dropdown from "@arco-design/web-vue/es/dropdown";
import '@arco-design/web-vue/dist/arco.css';
import mitt from 'mitt';
const emitter = mitt();
window.emitter = emitter;
createApp(App, {
    components: [
        SimpleModelRender,
        Button,
        space,
        tooltip,
        Dropdown,
        Drawer
    ],
    globalProperties: {
        '$emitter': emitter
    }
})
