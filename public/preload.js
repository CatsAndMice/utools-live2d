window.exports = {
    markdown: {
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
                    "resizable": false,
                    "backgroundColor": "#00000000",
                    movable: true,
                    hasShadow: false
                })
                utools.outPlugin();
            },
        },
    },
};