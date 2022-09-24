// 所有的写法都是node.js的写法
// package引入方式为commonjs
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 创建窗口
function createWindow() {
    // 创建窗口大小并设置窗口的具体宽高
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 这个窗口渲染什么文件
    window.loadFile('index.html')
    // 加载本地的vue项目
    // window.loadURL('http://localhost:8080/')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在app ready之后，调用创建窗口函数启动应用

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})