const electron = require('electron')
const { app, BrowserWindow, Menu } = electron;
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

    // 定义菜单
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// 顶部菜单 模板
const menuTemplate = [
    // 文件菜单项
    {
        // 顶部菜单的名称
        label: '文件',
        // 顶部菜单下面的子菜单列表
        submenu: [
            { label: '新增信息' },
            { label: '清空信息' },
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