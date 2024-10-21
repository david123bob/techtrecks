chrome.runtime.onMessage.addListener(async function(message,sender,sendResponse) {
    console.log("Message: ",message)
    document.getElementById("output").innerText = "Page message: " + message;
});
