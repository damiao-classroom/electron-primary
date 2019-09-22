const electron = require('electron')
const { app, BrowserWindow } = electron;

let win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        width: 800, height: 600
    });
    win.loadURL("https://www.baidu.com")
})