const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');

let win = null;
let addWin = null;
app.on('ready', () => {
    win = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.resolve(__dirname,'./html/main.html'),
        protocol: 'file:',
        slashes: true
    }));

    // 定义菜单
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // 点击主窗口的关闭按钮
    win.on('closed', () => {
        app.quit();
    });
});

// 顶部菜单 模板
const menuTemplate = [
    // 文件菜单项
    {
        // 顶部菜单的名称
        label: '文件',
        // 顶部菜单下面的子菜单列表
        submenu: [
            { 
                label: '新增信息', 
                click: () => {
                    createAddWindow()
                }
            },
            { 
                label: '清空信息',
                click: () => {
                    win.webContents.send('info:clear');
                } 
            },
            { label: '退出', 
            accelerator: process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
            click: () => {
                // 退出
                app.quit();
            } 
            }
        ]
    }
];

// 创建一个新的窗口
const createAddWindow = () => {
    addWin = new BrowserWindow({
        width: 600, height: 300, webPreferences: {
            nodeIntegration: true
        }
    });
    addWin.loadURL(url.format({
        pathname: path.resolve(__dirname,'./html/add.html'),
        protocol: 'file:',
        slashes: true
    }));
}

// 检测当前环境
const checkEnv = () => {
    let env = process.env.NODE_ENV;
    // 开发者工具菜单项
    let devConfig =  {
        label: '开发者工具',
        submenu: [
            { 
                label: '打开/关闭',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', 
                click: (item, focusedWindow) => {
                    focusedWindow.toggleDevTools();
                }
            },
            { label: '刷新一下', 
              role: 'reload', 
              accelerator: process.platform == 'darwin' ? 'Command+F5' : 'Ctrl+F5' 
            }
        ]
    };
    // console.log(env)
    // 开发的环境
    if(env !== 'production'){
        menuTemplate.push(devConfig);
    }
}
checkEnv();


// 事件监听: 监听事件信息的传递
const eventListen = () => {

    // 监听新增窗口传递过来的 信息项
    ipcMain.on('info:add',(e, val) => {
        win.webContents.send('info:add', val);
        addWin.close();
    })

};
eventListen();