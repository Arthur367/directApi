// const  ipcRenderer  = require('electron');

// let list = document.getElementById("list");
// let newTask = document.getElementById("newTask");
const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

  

const NOTIFICATION_TITLE = 'Service'
const NOTIFICATION_BODY = 'ESD Service Selected'
const CLICK_MESSAGE = 'ESD'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => document.getElementById("esd").innerText = CLICK_MESSAGE
