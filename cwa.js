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
    updatePage($("#search-value").val().trim())
    
})
function updatePage(cityHistorySearch) {

    // Log the cityHistorySearch to console, where it will show up as an object
    console.log(cityHistorySearch);
    console.log("------------------------------------")

    // Create the  list group to contain the businesses and add the business content for each
    let $cityHistoryEle = $("<div>")
    $cityHistoryEle.addClass("history")
    $cityHistoryEle.text(cityHistorySearch)

    // Add the newly created element to the DOM
    $("#history").prepend($cityHistoryEle)

}