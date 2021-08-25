const DateTime = luxon.DateTime

//API Key
const openWeatherapi = '166a433c57516f51dfab1f7edaed8413'
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
const uvIndexURL = 'https://api.openweathermap.org/data/2.5/onecall?'


/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for Open Weather API based on form inputs
 */
function buildCurrentWeatherURL(cityHistorySearch) {

    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = {
        'appid': openWeatherapi,
        'q': cityHistorySearch,
        'units': 'imperial',
    }
    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + currentWeatherURL + "\n---------------")
    console.log(currentWeatherURL + $.param(queryParams))
    return currentWeatherURL + $.param(queryParams)
}

function buildUVindexURL(lat, lon) {
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = {
        'appid': openWeatherapi,
        'lat': lat,
        'lon': lon,
        'units': 'imperial',
    }
    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + uvIndexURL + "\n---------------")
    console.log(uvIndexURL + $.param(queryParams))
    return uvIndexURL + $.param(queryParams)

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

    // Build the query URL for the ajax request to the API
    let queryURL = buildCurrentWeatherURL(searchValue)

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(updateCurrentWeather)

})
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} weatherData - object containing Yelp Fusion API data
 */
function updateCurrentWeather(weatherData) {

    // Log the weatherData to console, where it will show up as an object
    console.log(weatherData)
    console.log("------------------------------------")
    $("#city").text(`${weatherData.name} ${weatherData.dt}`)
    $("#temperature").html(`Temperature: ${weatherData.main.temp} &deg;F`)
    $("#humidity").html(`Humidity: ${weatherData.main.humidity} %`)
    $("#wind_speed").html(`Wind Speed: ${weatherData.wind.speed} MPH`)

    // Build the query URL for the ajax request to the API
    let uvIndexURL = buildUVindexURL(weatherData.coord.lat, weatherData.coord.lon)

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: uvIndexURL,
        method: "GET",
    }).then(updateUVindex)


}
/**
* takes API data (JSON/object) and turns it into elements on the page
* @param {object} weatherData - object containing API data
*/
function updateUVindex(weatherData) {

    // Log the weatherData to console, where it will show up as an object
    console.log(weatherData)
    console.log("------------------------------------")
    $("#uv_index").html(`UV Index: ${weatherData.current.uvi}`)
    for (let i = 1; i <= 5; i++) {
        updateForecast(i, weatherData.daily[i])
    }
}
function updateForecast(i, forecast) {
    let date = DateTime.fromSeconds(forecast.dt).toLocaleString(DateTime.DATE_SHORT)
    $(`#date${i}`).text(date)


}

function addHistory(cityHistorySearch) {
    // Log the cityHistorySearch to console, where it will show up as an object
    console.log(cityHistorySearch)
    console.log("------------------------------------")

    // Create the  list group to contain the cities and add the city search results content for each
    let $cityHistoryEle = $("<div>")
    $cityHistoryEle.addClass("history")
    $cityHistoryEle.text(cityHistorySearch)

    // Add the newly created element to the DOM
    $("#history").prepend($cityHistoryEle)

}

