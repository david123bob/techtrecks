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
    upcNumber=bulletList.children[1].textContent.trim()
    console.log(bulletList)
    console.log(upcNumber)


    //gets the name of product

    //Sends the information to background.js
    if(upcNumber){
      chrome.runtime.sendMessage({type:"ANALYZE_PRODUCT", upcNumber:upcNumber})
    }
} 

})();
