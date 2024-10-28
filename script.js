//Mabye we want to use API that fetchs amazon information on current screen. Then using that info we write some code that process the info
//With the info it might use another API to get information about the product like ingeridents etc.
//Taking the ingredients list then it might use finally another API to get info on these ingredeints and if they are hamrful it will let user know
//We can also use calory tracker, if its organic etc. 
console.log("Content script loaded");
(()=> {
let currentAmazon=""
chrome.runtime.onMessage.addListener((obj, sender, response)=> {
    const{type, value, amazonID}=obj;
    console.log("NotNew");
    if(type=="NEW"){
        currentAmazon=amazonID;
        console.log("Working");
        newAmazon();
    }
});

const newAmazon=()=>{
    const amazonBtnExists=document.getElementsByClassName("amazon-btn")[0];

    console.log(amazonBtnExists);

} 

})();