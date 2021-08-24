//API Key
const openWeatherapi = '166a433c57516f51dfab1f7edaed8413'
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?'


/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for Open Weather API based on form inputs
 */
function buildCurrentWeatherURL(cityHistorySearch) {
    // currentWeatherURL is the url we'll use to query the API



    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = {
        'appid': openWeatherapi,
        'q': cityHistorySearch,
    }
    // Grab text the user typed into the search input, add to the queryParams object
    /*
    queryParams.term = $("#search-term")
        .val()
        .trim()

    queryParams.location = $("#search-location")
        .val()
        .trim()
        */

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + currentWeatherURL + "\n---------------")
    console.log(currentWeatherURL + $.param(queryParams))
    return currentWeatherURL + $.param(queryParams)
}

/* 
<div style="background: ghostwhite; 
font-size: 20px; 
padding: 10px; 
border: 1px solid lightgray; 
margin: 0px;">
City History 1
</div>
*/
// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
    let searchValue = $("#search-value").val().trim()
    addHistory(searchValue)
    buildCurrentWeatherURL(searchValue)

})


function addHistory(cityHistorySearch) {

    // Log the cityHistorySearch to console, where it will show up as an object
    console.log(cityHistorySearch)
    console.log("------------------------------------")

    // Create the  list group to contain the businesses and add the business content for each
    let $cityHistoryEle = $("<div>")
    $cityHistoryEle.addClass("history")
    $cityHistoryEle.text(cityHistorySearch)

    // Add the newly created element to the DOM
    $("#history").prepend($cityHistoryEle)

}