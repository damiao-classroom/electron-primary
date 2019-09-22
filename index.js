const electron = require('electron')
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');

let win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        width: 800, height: 600
    });
    win.loadURL(url.format({
        pathname: path.resolve(__dirname,'./html/main.html'),
        protocol: 'file:',
        slashes: true
    }));
});