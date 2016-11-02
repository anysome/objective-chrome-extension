var myStroe = window.localStorage || window.sessionStorage;

function setupRefreshTimer() {
  var refreshMins = myStroe.getItem('refresh_interval');
  refreshMins = refreshMins ? parseInt(refreshMins) : 30;
  chrome.alarms.create('removeTodolistCache', {delayInMinutes: refreshMins, periodInMinutes: refreshMins});
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'removeTodolistCache') {
    myStroe.removeItem('todolist');
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if (message === 'updateInterval') {
    setupRefreshTimer();
  }
  sendResponse('event[' + message + '] received.');
});

setupRefreshTimer();
