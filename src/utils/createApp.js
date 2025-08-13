import { createApp } from 'vue';
import ModelRender from "@components/model";
import SimpleModelRender from "@components/simple-model";
import '../main.css'

export default (App) => {
    createApp(App)
        .use(ModelRender)
        .use(SimpleModelRender)
        .mount('#app')
}