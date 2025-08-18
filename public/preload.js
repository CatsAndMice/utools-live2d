const { ipcRenderer } = require("electron");
ipcRenderer.on("ping", (event, data) => {
    if (data === 'reload') {
        window.location.reload();
    }
});



window.service = {
    timerService,
    onClose() {
        utools.sendToParent("ping", "close"); // 版本：>= 6.1.0
    }
}