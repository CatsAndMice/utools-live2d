import { createApp } from 'vue';
import ModelRender from "@components/model";
import SimpleModelRender from "@components/simple-model";
import '../main.css'

export default (App, { components = [], globalProperties = {} }) => {
    const app = createApp(App);
    app.use(ModelRender)
        .use(SimpleModelRender);
    components.forEach((component) => {
        app.use(component);
    })
    Object.keys(globalProperties).forEach((key) => {
        app.config.globalProperties[key] = globalProperties[key];
    })
    app.mount('#app');
}