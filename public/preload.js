const { ipcRenderer } = require("electron");
ipcRenderer.on("ping", (event, data) => {
    if (data === 'reload') {
        window.location.reload();
    }
});


// 监听页面关闭事件，关闭后清理子窗口实例对象
window.addEventListener('beforeunload', () => {
   window.pushpinWindow = null
});