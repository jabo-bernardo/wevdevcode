const editor =  CodeMirror.fromTextArea(document.getElementById("code-editor-main"), {
    lineNumbers: true,
    mode: "javascript",
    theme: localStorage.getItem("defaultTheme") || "default"
});

Split([".file-selector", ".editor"], {
    minSize: [200, 500]
})

// Title Bar
// const { Titlebar, Color } = require("custom-electron-titlebar");
// let titleBar = new Titlebar({
//     backgroundColor: Color.fromHex("#DDD"),
//     menuPosition: "left"
// })

// titleBar.updateTitle("Web Dev Code");

function changeTheme(theme) {
    localStorage.setItem("defaultTheme", theme);
    editor.setOption("theme", theme);
}

function changeExtension(ext) {
    editor.setOption("mode", ext);
}

const { remote } = require("electron");
const { Menu, MenuItem, dialog } = remote;
const fs = require("fs");
let themes = fs.readdirSync("./public/themes");
let languages = fs.readdirSync("./public/modes");

function buildMenu() {
    const menu = new Menu();
    const menuTemplate = [
        {
            label: "Change Theme",
            submenu: themes.map(v => { 
                return { 
                    label: removeExtension(capitalizeAll(v), "css"),
                    click() {
                        changeTheme(removeExtension(v, "css"));
                    }
                } 
            })
        },
        {
            label: "Change Language",
            submenu: languages.map(v => { 
                return { 
                    label: removeExtension(capitalizeAll(v), "js"),
                    click() {
                        changeExtension(removeExtension(v, "js"));
                    }
                } 
            })
        },
        {
            label: "Developer",
            submenu: [
                {
                    label: "Tools",
                    role: "toggledevtools"
                }
            ]
        },
        {
            label: "Reload",
            role: "reload"
        }
    ]
    buildMenuItems(menu, menuTemplate);

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menu.popup({ window: remote.getCurrentWindow() })
    }, false)
}

function buildMenuItems(menu, items) {
    items.forEach(item => {
        menu.append(new MenuItem(item))
    })
}

buildMenu();

function capitalizeAll(str) {
    return str.split("-").map(v => v[0].toUpperCase() + v.slice(1)).join(" ");
}

function removeExtension(str, ext) {
    return str.replace(`.${ext}`, "");
}