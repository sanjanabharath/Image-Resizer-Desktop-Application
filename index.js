const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: 500,
        height: 600
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: "About Image Resizer",
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

app.whenReady().then(()=>{
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
    
});

//Menu template
const menu = [
    ...(isMac ? [{ label: app.name, submenu: [
        {label: 'About', click: createAboutWindow}
    ]}] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: 'CmdOrCtrl+W'
            }
        ]
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
]

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})