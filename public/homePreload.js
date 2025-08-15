
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
        }
    })
    window.pushpinWindow = pushpinWindow
}


window.service = {
    createPushpinBrowserWindow
}