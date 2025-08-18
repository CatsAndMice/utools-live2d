const { ipcRenderer } = require("electron");
ipcRenderer.on("ping", (event, data) => {
    if (data === 'reload') {
        window.location.reload();
        return
    }

    // 休息结束
    if (data === 'relax-end') {
        window.emitter.emit('reset-timer')
        return

    }
});



window.service = {
    onClose() {
        utools.sendToParent("ping", "close"); // 版本：>= 6.1.0
    }
}