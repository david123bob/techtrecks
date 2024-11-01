//Mabye we want to use API that fetchs amazon information on current screen. Then using that info we write some code that process the info
//With the info it might use another API to get information about the product like ingeridents etc.
//Taking the ingredients list then it might use finally another API to get info on these ingredeints and if they are hamrful it will let user know
//We can also use calory tracker, if its organic etc. 
console.log("Content script loaded");
(()=> {
let currentAmazon=""
chrome.runtime.onMessage.addListener((obj, sender, response)=> {
    const{type, value, amazonID}=obj;
    if(type=="NEW"){
        currentAmazon=amazonID;
        newAmazon();
    }
});

//If the tab was open what code do we run
const newAmazon=()=>{
    //gets the ingredient list
    const myDiv = document.getElementById("nic-ingredients-content");
    const spanElement = myDiv.querySelector("span");
    console.log(spanElement);
    console.log(spanElement.textContent);

    //gets the name of product


    //Sends the information to background.js
    if(spanElement){
        const productIngredients=spanElement.textContent;
        chrome.runtime.sendMessage({type:"ANALYZE_PRODUCT", productIngredients:productIngredients})
    }

    
} 

})();
