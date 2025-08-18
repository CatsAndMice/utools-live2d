import createApp from '@utils/createApp';
import App from './App.vue';
import Trigger from "@arco-design/web-vue/es/trigger";
import List from "@arco-design/web-vue/es/list";
import ToolBar from "@components/ToolBar";
import '@arco-design/web-vue/dist/arco.css';
import mitt from 'mitt';
import ModelRender from "@components/model";
const emitter = mitt()
window.emitter = emitter
createApp(App, {
    components: [Trigger,ModelRender, ToolBar, List],
    globalProperties: {
        '$emitter': emitter
    }
})

