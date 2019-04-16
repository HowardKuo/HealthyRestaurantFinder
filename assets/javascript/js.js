// make sure ajax call is parent of this function
//Google Maps==============================================================================================
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
// AJAX call for Unsplash api
// var queryURL = "https://api.pexels.com/v1/search?query="+ accessKy +"example+query&per_page=15&page=1"
// var accessKy = "563492ad6f9170000100000107c1b4a50d344f558eb65b51b2756c56"
var foodCategories = ['vegetarian', 'vegan', 'gluten-free', 'family']
// for (var i = 0; i < foodCategories.length; i++) {
//     replaceFoodCategoryPhoto(foodCategories[i])
// }
// foodCategories.forEach(function(foodCategory) {
//     replaceFoodCategoryPhoto(foodCategory)
// })
foodCategories.map(function (foodCategory) {
    replaceFoodCategoryPhoto(foodCategory)
})

function replaceFoodCategoryPhoto(category) {
    var searchTerm = getSearchTerm(category)
    // var typeVegan = 'vegan+dishes'
    // var typeVegie = 'vegetarian+dishes'
    // var typeGluton = 'gluton+free+dish'
    // var typeFamily = 'family+food'

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.pexels.com/v1/search?query=" + searchTerm + "&per_page=15&page=1%0A",
        "method": "GET",
        "headers": {
            "Authorization": "563492ad6f9170000100000107c1b4a50d344f558eb65b51b2756c56",
        }
    }

    $.ajax(settings)
        .then(function (response) {
            console.log(response)
            var imgUrl = response.photos[8].src.small   
            var imageEl = $('img.' + category)
            imageEl.attr("src", imgUrl)
        })
}

function getSearchTerm(category) {
    switch (category) {
        case 'vegetarian':
            return 'vegetarian+food'
        case 'vegan':
            return 'vegan+meals'
        case 'gluten-free':
            return 'gluten+meals'
        case 'family':
            return 'food+meals'

        // TODO: finish this
        default:
            return ''
    }
}


// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     console.log(response.data[0].url);
//     var img = $('<img>');
//     var test = img.attr('src',response.data[0].images.downsized_large.url);
//     $('body').append(test);


//   });
$("#searchButton").click(function () {
    event.preventDefault()
    var search = $("#input").val()
    console.log(search);
})

// This is the function that runs when the onclick of the four food images is clicked.
function vegetarianFunction() {
    document.getElementById("results").innerHTML = "Vegetarian";
};

function veganFunction() {
    document.getElementById("results").innerHTML = "Vegen";
};

function glutenFreeFunction() {
    document.getElementById("results").innerHTML = "Gluten-free";
};

function familyFunction() {
    document.getElementById("results").innerHTML = "Family";
};


