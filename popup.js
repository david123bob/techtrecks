//This prints the title of the Amazon Stuff
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tab = tabs[0];
  });


//Loads the data from the storage if avalible if not do nothing

/*
document.addEventListener("DOMContentLoaded", function() {
    const storedAnalysisResult = localStorage.getItem("analysisResult");
    const storedupcNumber = localStorage.getItem("upcNumber");
    //Only load if successfull
    if (storedAnalysisResult && storedupcNumber) {
        document.getElementById("ingredientList").textContent = storedupcNumber;
        document.getElementById("result").textContent = storedAnalysisResult;
    }
});
*/


  //This gets request that should be send from background and gets all the info and updates the popuphtml. THis part is for when the first website is opened
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //If we finished analyizing results
    if (request.type === "FINISH_ANALYSIS") {
        // Do something with the analysis result, e.g., display it in the popup
        //analysisResult is a JSON originating from background.js
        analysisResult=request.analysisResult;
        upcNumber=request.upcNumber;
        //Saves the new results/Data into the local host
        localStorage.setItem("analysisResult", analysisResult);
        localStorage.setItem("upcNumber", upcNumber);

        allergens = analysisResult.allergens;
        nova = analysisResult.nova;

        //We change the html
        //document.getElementById("allergen_info").append(format_allergens(allergens));
        //document.getElementById("process_info").append(nova);
    }
});


function format_allergens(allergens_arr) {
    let str = "";
    for(const s of allergens_arr) {
        str+=s + " ";
    } 
    return str; 
}
