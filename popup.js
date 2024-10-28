chrome.runtime.onMessage.addListener(async function(message,sender,sendResponse) {
    console.log("Message: ",message)
    document.getElementById("output").innerText = "Page message: " + message;
});


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tab = tabs[0];
    document.getElementById("title").innerText = tab.title;
  });