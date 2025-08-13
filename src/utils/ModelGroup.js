import models from "@model/models.json";

export const getModelGroup = () => {
    const modelGroupMap = {}
    models.forEach(model => {
        const modelPaths = model.split('/')
        const modelName = modelPaths[modelPaths.length - 1]
        const modelGroup = modelPaths[modelPaths.length - 2]
        const modelInfo = {
            modelPath: model,
            modelName,
            modelGroup
        }
        if (modelGroupMap[modelGroup]) {
            modelGroupMap[modelGroup].push(modelInfo)
            return
        }
        modelGroupMap[modelGroup] = [modelInfo]
    })
    console.log(modelGroupMap);
}