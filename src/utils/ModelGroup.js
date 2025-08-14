import useModelStore from "@store/model";
const { models } = useModelStore()
export const getModelGroup = () => {
    const modelGroupMap = {}
    models.forEach(model => {
        const modelPaths = model.split('/')
        const modelName = modelPaths[modelPaths.length - 1]
        const modelGroup = modelPaths[modelPaths.length - 2]
        const name = modelName.replace('.model.json', '').replace('.model3.json', '')

        const modelInfo = {
            modelPath: model,
            name,
            modelGroup
        }
        if (modelGroupMap[modelGroup]) {
            modelGroupMap[modelGroup].push(modelInfo)
            return
        }
        modelGroupMap[modelGroup] = [modelInfo]
    })
    return Object.keys(modelGroupMap).map(key => {
        return {
            group: key,
            children: modelGroupMap[key]
        }
    })
}

export const getModelList = () => {
    const modelList = models.map(model => {
        const modelPaths = model.split('/')
        const modelFile = modelPaths[modelPaths.length - 1] || ''
        const name = modelFile.replace('.model.json', '').replace('.model3.json', '')
        return {
            modelPath: model,
            name
        }

    })
    return modelList
}

export const getModelName = (model) => {
    const modelPaths = model.split('/')
    const modelFile = modelPaths[modelPaths.length - 1] || ''
    const name = modelFile.replace('.model.json', '').replace('.model3.json', '')
    return name
}