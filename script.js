//Mabye we want to use API that fetchs amazon information on current screen. Then using that info we write some code that process the info
//With the info it might use another API to get information about the product like ingeridents etc.
//Taking the ingredients list then it might use finally another API to get info on these ingredeints and if they are hamrful it will let user know
//We can also use calory tracker, if its organic etc. 

console.log("intialized script")
let pageTitle = document.querySelector('title').innerText;

chrome.runtime.sendMessage({pageTitle: pageTitle})