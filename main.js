/*
/ Author: Miles Hegeduis
/ Date: 09/20/2023
/ File: main.js
/ Description: This file contains javascript code that displays a list of countries of a selected continent.
/*


/* Handle window onload event. It creates a selection list of seven continents.
*/
window.onload = function () {
    // load continents from an external json file
    let continents = JSON.parse(loadJSON("continents.json"));
    //Grabbing the DOM of the selection named "continents" and setting it to variable continentSelect.
    let continentSelect = document.getElementById("continents");

    //create the dropdown list for the continents
    let _html_select = "<option selected='selected' disabled='disabled'>Select a Continent </option>";
    for (let continent in continents) {
        _html_select += "<option value='" + continent + "'>" + continents[continent] + "</option>";
    }
    continentSelect.innerHTML = _html_select;



    //load countries data from an external json file.
    let countries = JSON.parse(loadJSON("countries.json"));


    //Now getting the value from that continentSelect dropdown.
    let continentValue = continentSelect.value;
    //handle change event of the dropdown list and call the display method.
    continentSelect.onchange = function () {
        //updating the continent value that is selected by user.
        continentValue = continentSelect.value;
        //calling the display method when the user changes the selection of the continent.
        display(countries, continentValue);
    }
}


/* This function takes a json object of countries and a continent as the parameters.
*  It filters the json document with a continent then appends a row to
*  the div block for each country.
*/
    function display(countries, continentValue) {
        //Establishing _html_div variable to empty string to append my divs to.
        let _html_div = "";
        //start of for...in loop.
        for (let countryKey in countries) {
            //establishing country variable as a constant.
            const country = countries[countryKey];
            //need an if statement for the proper countries to display based upon the continent selection.
            if (country.continent === continentValue) {
                //appending the div class row to the first _html_div | initial div.
                _html_div += "<div class='row'>";
                _html_div += "<div>" + country.name + "</div>";
                _html_div += "<div>" + country.capital + "</div>";
                _html_div += "<div>" + country.currency.join(", ") + "</div>";
                _html_div += "<div>" + country.languages.join(", ") + "</div>";
                _html_div += "<div>" + country.phone.join(", ") + "</div>";
            }//end of if statement

            _html_div += "</div>"; //closing off the initial div.
            document.getElementById("countries").innerHTML = _html_div;
        }//end of for...in loop
    }//end of display function