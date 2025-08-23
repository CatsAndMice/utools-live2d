import createApp from '@utils/createApp';
import App from './App.vue';
import Button from "@arco-design/web-vue/es/button";
import '@arco-design/web-vue/dist/arco.css';

createApp(App, {
    components: [
        Button,
    ]
})
