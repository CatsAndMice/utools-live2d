import createApp from '@utils/createApp';
import App from './App.vue';
import Button from "@arco-design/web-vue/es/button";
import space from "@arco-design/web-vue/es/space";
import '@arco-design/web-vue/dist/arco.css';
createApp(App, {
    components: [
        Button,
        space
    ]
})
