

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
        const productIngredients=request.productIngredients;
        //Lets say we have finished analyizing it We can send it back to script
        const analysisResult="Pretend I am some other finished analyized result";
        //Code below to send back result
        //sendResponce({result: analysisResult})
        chrome.runtime.sendMessage({ type: "FINISH_ANALYSIS", productIngredients: productIngredients, analysisResult:analysisResult });
    }
});
