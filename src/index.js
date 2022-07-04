const { app, BrowserWindow, ipcMain, Notification  } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

const createWindow = () => {
  // Create the browser window.
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      nodeIntegration: true,
      contextIsolation: false      
    },
  }); 
  ipcMain.handle('input_licenseKey', (event, ...args) => {
    const notification = {
        title: 'Licese Key Sent to',
        body: `Added: ${args[0]}`
    }    
   
    new Notification(notification).show()
    
});

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/pages/index.html')); 

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

function createChildWindow() {
  childWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    modal: true,
    show: false,
    parent: mainWindow, // Make sure to add parent window here
  
    // Make sure to add webPreferences with below configuration
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  
  // Child window loads settings.html file
  childWindow.loadFile(path.join(__dirname,"/pages/inputDetails.html"));
  
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
}
 ipcMain.on('input_licenseKey',(event, ...args) => { 
    createChildWindow();
});



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()  
  
}


app.whenReady().then(createWindow)




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    window.onload();
  }
 
 
  
});



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
