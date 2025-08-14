import createApp from '@utils/createApp';
import App from './App.vue';
import Trigger from "@arco-design/web-vue/es/trigger";
import List from "@arco-design/web-vue/es/list";
import ToolBar from "@components/ToolBar";
import '@arco-design/web-vue/dist/arco.css';
import mitt from 'mitt';
const emitter = mitt()

createApp(App, {
    components: [Trigger, ToolBar, List],
    globalProperties: {
        '$emitter': emitter
    }
})

