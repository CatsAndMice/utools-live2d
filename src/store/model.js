import { shallowRef } from "vue"
import oldModels from "../model/models.json"
// github 代理   https://ghproxy.link/
const models = oldModels.map((item = '') => {
    return `https://ghfast.top/${item}`
})
const counts = models.length
const modelPath = shallowRef(models[Math.floor(Math.random() * counts)])
export default () => {
    const nextModel = () => {
        const index = models.findIndex((item) => item === modelPath.value)
        if (index === counts - 1) {
            modelPath.value = models[0].path
        } else {
            modelPath.value = models[index + 1]
        }
    }
    return {
        modelPath,
        nextModel
    }
}