const { ipcRenderer } = require("electron");
const Say = require("say");

ipcRenderer.on("ping", (event, data) => {
    if (data === 'reload') {
        window.location.reload();
        return
    }

    // 休息结束 || 重置休息时间
    if (data === 'relax-end') {
        window.emitter.emit('reset-timer')
        window.relaxWindow && window.relaxWindow.destroy();
        return
    }
});


const createRelaxBrowserWindow = () => {
    if (window.relaxWindow) {
        try {
            window.relaxWindow.destroy();
        } catch (err) {
            window.relaxWindow = null;
        }
    }

    const relaxWindow = window.utools.createBrowserWindow('./page/relax/relax.html', {
        fullscreen: true,
        alwaysOnTop: true,
        frame: false,
        resizable: false,
        movable: false,
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // openDevTools: true
        }
    })
    // relaxWindow.webContents.openDevTools()
    window.relaxWindow = relaxWindow
}


window.service = {
    createRelaxBrowserWindow,
    onResizable() {
        utools.sendToParent("ping", "resizable"); // 版本：>= 6.1.0
    },
    onClose() {
        utools.sendToParent("ping", "close"); // 版本：>= 6.1.0
    },
    say(text) {
        Say.speak(text)
    }
}