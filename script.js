


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

    //newDiv=document.getElementById("detailBullets_feature_div")
    //newDiv=newDiv.querySelector("#detailBulletsWrapper_feature_div")
    //newDiv=newDiv.querySelector("#detailBullets_feature_div")
    bulletList = document.querySelector(".a-unordered-list.a-nostyle.a-vertical.a-spacing-none.detail-bullet-list");
    listItems = bulletList.querySelectorAll("li");
    let upcNumber = null; // Initialize UPC variable
    listItems.forEach(item => {
        boldSpan = item.querySelector("span.a-text-bold");
        // Check if the bold span contains "UPC" and get the associated number
        if (boldSpan && boldSpan.textContent.includes("UPC")) {
            const upcNumberElement = boldSpan.nextElementSibling;
            if (upcNumberElement) {
                upcNumber = upcNumberElement.textContent.trim();
            }
        }
    });
    console.log("UPC Number:", upcNumber);

    //Sends the information to background.js
    if(upcNumber){
      chrome.runtime.sendMessage({type:"ANALYZE_PRODUCT", upcNumber:upcNumber})
    }
} 

})();

/*function for getting the url, call fetch from newAmazon()*/
let url_prefix = "https://world.openfoodfacts.net/api/v2/product/"; // concatenate upc to the end
{
    async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    let data = fetchAsync(url)

    data.then(function(result) {
        console.log(result);
    })
}
