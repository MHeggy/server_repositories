/* Author: Miles Hegeduis
 * Date: 09/28/2023
 * Name: main.js
 * Description: this is the javascript file for handling client-side scripting.
 */

/******************************************************************************
 * Handle key press event.
 * This function makes asynchronous HTTP request using the XMLHttpRequest object.
 * It passes a name to population.php for processing.
 *****************************************************************************/
function handlekeyup(e) {
    //retrieve user input from the text box
    let name = trim(document.getElementById('name').value);
    if(name === "") {
        error("");
        return;
    }
	
    //add your code here to process ajax requests and handle server's responses

    //creating new XMLHttpRequest() object.
    let xhr = new XMLHttpRequest();

    //opening asynchronous request.
    xhr.open("GET", "population.php?name=" + name, true);

    //handle the server's responses.
    xhr.onload = function() {
        let population = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        //checking to see if population contains the name of the user input.
        if (population.hasOwnProperty('metadata')) {
            display(population);
        }
        else {
            //error handling.
            error("Name not found.");
            clear();
        }
    }//end of xhr.onload anonymous function.
    //sending the AJAX request.
    xhr.send(null);
}

/*
 * This function accepts a JSON object containing population information
 * and display it in an HTML table. This function get invoked by the handlekeyup function
 * when the country/region name is found in the database.
 * 
 */
function display(population) {
    //temporary debugging code.
    console.log("Display function called");
    console.log(population);
    //initializing empty string "HTMLDiv" to append div and population information to.
    let HTMLDiv = "";
    //Access the country name from the metadata:
    let countryName = population.metadata.name;
    //add your code here to retrieve data from an JSON object and then display them
    for(let year in population) {
        const popData = population[year];
        if (year !== "metadata") {
        HTMLDiv += "<div class='row'>";
        HTMLDiv += "<div>" + year + "</div>";
        HTMLDiv += "<div>" + popData[countryName] + "</div>";
        HTMLDiv += "<div>" + popData["World"] + "</div>";
        HTMLDiv += "</div>";
        }//end of if statement.
    }//end of for in loop.
    //set the innerHTML of population results with the HTMLDiv element that I created.
    document.getElementById("population-results").innerHTML = HTMLDiv;
    //set the innerHTML of country span tag in the index.php.
    document.getElementById("country").innerHTML = population.metadata.name;
    //set the innerHTML of country code span tag in index.php.
    document.getElementById("code").innerHTML = population.metadata.code;
}//end of display() function.

/*
 * This function clears the population. The function is invoked by the handlekeyup function if
 * the country name a user has entered is not found in the database.
 */
function clear() {
    //add your code here to clear the population data.
        //clear the population-results div.
        document.getElementById("population-results").innerHTML = "";
        //clear the country code div.
        document.getElementById("code").innerHTML = "";
        //clear the country name div.
        document.getElementById("country").innerHTML = "";
}

//This function displays an error message in the div block with the id of "message".
function error(message) {
    //add your code here to display an error message.
    document.getElementById('message').innerHTML = message;
}

/*
* A home-made trim function that removes leading and
 * trailing whitespace characters from a string
 */
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/*
* A home-made function that displays a number with commas as thousands separators
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}