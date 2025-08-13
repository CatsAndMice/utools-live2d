window.exports = {
    live2d: {
        mode: "none",
        args: {
            // 插件执行入口
            enter: () => {
                const win = utools.createBrowserWindow("./index.html", {
                    height: 350,
                    width: 350,
                    "alwaysOnTop": true,
                    "transparent": true,
                    "frame": false,
                    "resizable": true,
                    "backgroundColor": "#00000000",
                    movable: true,
                    hasShadow: false,
                    webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false,
                        // devTools: true
                    }
                })
                // win.webContents.openDevTools()
                utools.outPlugin();
            },
        },
    },
};