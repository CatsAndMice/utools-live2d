const { ipcRenderer } = require("electron");
ipcRenderer.on("ping", (event, data) => {
    if (data == 'close') {
        if (window.pushpinWindow) {
            try {
                window.pushpinWindow.destroy();
            } catch (err) {
                console.warn('关闭窗口失败', err);
            }
            window.pushpinWindow = null;
        }

    }
});

const createPushpinBrowserWindow = () => {
    if (window.pushpinWindow) {
        try {
            window.pushpinWindow.webContents.send("ping", "reload");
        } catch (err) {
            window.pushpinWindow = null;
            createPushpinBrowserWindow();
        }
        return;
    }
    const pushpinWindow = window.utools.createBrowserWindow('./index.html', {
        height: 350,
        width: 350,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        resizable: true,
        backgroundColor: "#00000000",
        movable: true,
        hasShadow: false,
        webPreferences: {
            preload: "./preload.js",
            nodeIntegration: true,
            contextIsolation: false,
            // openDevTools: true
        }
    })
    // pushpinWindow.webContents.openDevTools()
    window.pushpinWindow = pushpinWindow
}


window.service = {
    createPushpinBrowserWindow
}