const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

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
        titleBarStyle: "customButtonsOnHover",
        frame: false,
        transparent: true
    });
    win.loadFile(path.join(__dirname, "./dist/index.html"));
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