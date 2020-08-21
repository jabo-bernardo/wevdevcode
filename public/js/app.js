const editor =  CodeMirror.fromTextArea(document.getElementById("code-editor-main"), {
    lineNumbers: true,
    mode: "sass"
});

// Title Bar
const { Titlebar, Color } = require("custom-electron-titlebar");
let titleBar = new Titlebar({
    backgroundColor: Color.fromHex("#DDD"),
    menuPosition: "left"
})

titleBar.updateTitle("app.js - Web Dev Code");

const { ipcRenderer } = require("electron");
ipcRenderer.on("changeTheme", (evt, theme) => {
    editor.setOption("theme", theme);
})

// const { remote } = require("electron");
// const { Menu, MenuItem } = remote;

// const menu = new Menu();
// menu.append(new MenuItem({ label: "MenuItem1", click() { alert("Hello World!") } }));
// menu.append(new MenuItem({ type: "separator" }));
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
// window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     menu.popup({ window: remote.getCurrentWindow() })
// }, false)