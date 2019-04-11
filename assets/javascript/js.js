
// make sure ajax call is parent of this function
$(document).ready(function () {
    $("#searchButton").click(function () {
        event.preventDefault()
        var search = $("#input").val()
        console.log(search);

    })
})


