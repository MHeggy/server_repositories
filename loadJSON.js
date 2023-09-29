/* 
 * The function defined in this file loads a local JSON file
 * and returns the string representation of the JSON object defined in the document.
 */

function loadJSON(file) {
    //create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");

    //define an synchronous request
    xhr.open("GET", file, false);

    //send the request
    xhr.send();

    //return the response
    return xhr.responseText;
}