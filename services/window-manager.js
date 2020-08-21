const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {

    // Window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: "hidden",
        frame: false,
        transparent: true
    });
    win.loadURL("http://localhost:8517");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", e => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

app.on("activate", e => {
    if(BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});

module.exports = app;