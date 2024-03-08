const{ app, BrowserWindow } = require('electron');

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 900,
        height: 700,
        title: 'entradaSalida',
        resizable: false,
        webPreferences:{
            preload:`${app.getAppPath()}/preload.js`
        }
    });

app.on('ready', createWindow);

app.on('window-all-close', () => app.quit());



    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.on('closed', () => {
        appWin = null;
    })
}