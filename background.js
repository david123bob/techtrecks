
chrome.tabs.onUpdated.addListener((tabID,changeInfo,tab)=>{
   if(tab.url&&changeInfo.status=="complete"&& tab.url.includes("amazon.com")){
        const queryParameters= tab.url.split("amazon.com/")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        console.log(urlParameters);
        chrome.tabs.sendMessage(tabID,{
            type:"NEW",
            amazonID:urlParameters.get("v"),
        });
        }
   }
)