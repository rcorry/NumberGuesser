//creates score object
var total = {
    "attempts" : 0,
    "success" : 0
};

//gets filled with pass/fail prompts from json
var prompts = {};

//queries all variables
var heading1 = document.querySelector("#my-heading");
var numField = document.querySelector("#my-num-field");
var button = document.querySelector("#my-button");
var myTotal = document.querySelector("#my-total");
var myList = document.querySelector("#my-list");
var result = document.querySelector("#my-result");
var low = document.querySelector("#low-num");
var high = document.querySelector("#high-num");

//on button click does stuff
button.onclick = function() {
    //increases the attempts by one and generates the random number
    total["attempts"] += 1;
    var randNum = getRand(low.value, high.value);

    //creates new list element
    var myNum = numField.value;
    var newListItem = document.createElement("li");
    newListItem.innerHTML = "Your Guess: " + myNum + " Actual Number: " + randNum;

    //turns text green for correct guess, red for incorrect, adds +1 to success if correct
    //Changes h1 "pick a number"
    if (randNum == myNum){
        heading1.innerHTML = prompts["good-prompts"][getRand(0,prompts["good-prompts"].length-1)];
        heading1.style.color = "#61bd4f";
        newListItem.style.color = "#61bd4f";
        total["success"] += 1;
    } else {
        heading1.innerHTML = prompts["bad-prompts"][getRand(0,prompts["bad-prompts"].length-1)];
        heading1.style.color = "#FF0000";
        newListItem.style.color = "#FF0000";
    };

    //appends newlist item, and updates score
    myList.appendChild(newListItem);
    result.innerHTML = "The Number was " + randNum;
    myTotal.innerHTML = total["success"] + "/" + total["attempts"] + " = " + Math.round(total["success"]/total["attempts"] * 100) + "%";

};

//generates a random number
function getRand (min, max) {
    return parseInt(Math.floor(Math.random() * (max-min+1))) + parseInt(min);
}

//fetches data for pass/fail prompts
fetch("https://api.jsonbin.io/b/5f4fc7fb514ec5112d14c4a6/2").then(function (response) {
    //when server responds
    response.json().then(function (data) {
        //data is now available
        //saves data from server into "prompts" variable
        prompts = data;
    });
});


