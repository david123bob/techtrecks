
//This code listens to see if the user has clicked on the tab and if its amazon page it sends a mesasge to the script to run.
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
);

//This code listens to any messages that are send through the code
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(request.type=="ANALYZE_PRODUCT"){
        console.log("IAMRUN");
        const upcNumber=request.upcNumber;
        let url = "https://world.openfoodfacts.net/api/v2/product/"+upcNumber; // concatenate upc to the end
        let data = fetchAsync(url);
        data.then(function(result) {
        console.log(result);
        })
        //Lets say we have finished analyizing it We can send it back to script
        const analysisResult="Pretend I am some other finished analyized result";
        //Code below to send back result
        //sendResponce({result: analysisResult})
        chrome.runtime.sendMessage({ type: "FINISH_ANALYSIS", upcNumber: upcNumber, analysisResult:analysisResult });
    }
});
async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
}




