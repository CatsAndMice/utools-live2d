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
        return
    }


    // 窗口可拖动
    if (data == 'resizable') {
        if (window.pushpinWindow) {
            try {
                window.pushpinWindow.setResizable(!window.pushpinWindow.isResizable());
            } catch (err) {
                console.warn('设置窗口拖动失败', err);
            }
        }
        return
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
        resizable: false,
        backgroundColor: "#00000000",
        movable: true,
        hasShadow: false,
        webPreferences: {
            preload: "./preload.js",
            nodeIntegration: true,
            contextIsolation: false,
            ...(window.utools.isDev() && { openDevTools: true })
        }
    })
    window.utools.isDev() && pushpinWindow.webContents.openDevTools()

    window.pushpinWindow = pushpinWindow
}


// 增加一个直接打开挂件的命令
window.utools.onPluginEnter(({ code }) => {
    if (code === "live2d-pendants") {
        setTimeout(() => {
            window.utools.hideMainWindow();
            createPushpinBrowserWindow();
        }, 200);
    }
});


window.service = {
    createPushpinBrowserWindow
}