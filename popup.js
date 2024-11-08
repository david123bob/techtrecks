//This prints the title of the Amazon Stuff
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tab = tabs[0];
    document.getElementById("title").innerText = tab.title;
  });


//Loads the data from the storage if avalible if not do nothing
document.addEventListener("DOMContentLoaded", function() {
    const storedAnalysisResult = localStorage.getItem("analysisResult");
    const storedupcNumber = localStorage.getItem("upcNumber");
    //Only load if sucefull
    if (storedAnalysisResult && storedupcNumber) {
        document.getElementById("ingredientList").textContent = upcNumber;
        document.getElementById("result").textContent = storedAnalysisResult;
    }
});


  //This gets request that should be send from background and gets all the info and updates the popuphtml. THis part is for when the first website is opened
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //If we finished analyizing results
    if (request.type === "FINISH_ANALYSIS") {
        // Do something with the analysis result, e.g., display it in the popup
        analysisResult=request.analysisResult;
        upcNumber=request.upcNumber;
        //Saves the new results/Data into the local host
        localStorage.setItem("analysisResult", analysisResult);
        localStorage.setItem("upcNumber", upcNumber);

        //We change the html
        document.getElementById("ingredientList").textContent = upcNumber; // assuming you have an element to show the result
        document.getElementById("result").textContent=analysisResult;
    }
});

