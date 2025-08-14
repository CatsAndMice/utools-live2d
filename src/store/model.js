import { shallowRef } from "vue";
import { getStorageItem } from "../utils/dbStorage";
import oldModels from "../model/models.json";
// github 代理   https://ghproxy.link/
const models = oldModels.map((item = '') => {
    return `https://ghfast.top/${item}`
})

const counts = models.length
const modelPath = shallowRef(getStorageItem('modelPath') || models[Math.floor(Math.random() * counts)])
export default () => {
    const nextModel = () => {
        const index = models.findIndex((item) => item === modelPath.value)
        if (index === counts - 1) {
            modelPath.value = models[0].path
        } else {
            modelPath.value = models[index + 1]
        }
    }
    const prevModel = () => {
        const index = models.findIndex((item) => item === modelPath.value)
        if (index === 0) {
            modelPath.value = models[models.length - 1].path
        } else {
            modelPath.value = models[index - 1]
        }
    }
    return {
        modelPath,
        models,
        nextModel,
        prevModel
    }
}