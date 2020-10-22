/* eslint-disable no-unused-vars */
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("background >>>");

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle");
  });
});

console.log("background >>>", chrome.extension.getURL("popup.html"));

// 接收iframe传来的信息，转发给content.js
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === "ajaxInterceptor" && msg.to === "background") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { ...msg, to: "content" });
    });
  }
});
