import { createApp } from 'vue';
import '../main.css'

export default (App, { components = [], globalProperties = {} }) => {
    const app = createApp(App);
    components.forEach((component) => {
        app.use(component);
    })
    Object.keys(globalProperties).forEach((key) => {
        app.config.globalProperties[key] = globalProperties[key];
    })
    app.mount('#app');
}