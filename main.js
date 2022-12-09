const { app, BrowserWindow, ipcMain, Menu, Notification } = require('electron');
const fetch = require('./src/fech')

function createWindow () {  // 브라우저 창을 생성
  let win = new BrowserWindow({
    width: 450,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  //브라우저창이 읽어 올 파일 위치
  win.loadFile('./src/views/index.html')  
}

global.gameList = require('./src/config/game.json')

app.on('ready', createWindow);
app.setAppUserModelId("MEARI")

//set menu hide
Menu.setApplicationMenu(null)

//data fetch
ipcMain.on('fetch', (event, args) => {

  //데이터 최신화
  if (args) {
    fetch()
  }

  //조회후 처리여부를 회신
  if(args){
    setTimeout(() => {
      event.reply('reply', gameList);  
    }, 5000);  
  }else{
    event.reply('reply', gameList);  
  }  
})

//notification message
ipcMain.on('noti', () => {
  new Notification({title:"[MEARI] 데이터 업데이트 알림", body: "모든 데이터가 업데이트 되었습니다." }).show()
})