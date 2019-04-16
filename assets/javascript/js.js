// make sure ajax call is parent of this function
//Google Maps==============================================================================================
//https://developers.google.com/maps/documentation/javascript/geolocation
var map, infoWindow, currentMarker, marker, currentPos, pos, queryURL, lat, lng;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude
            lng = position.coords.longitude
            currentPos = {
                lat: lat,
                lng: lng
            };
            infoWindow.setPosition(currentPos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(currentPos);

            //https://developers.google.com/maps/documentation/javascript/adding-a-google-map
            currentMarker = new google.maps.Marker({
                position: currentPos,
                map: map,
                title: 'You Are Here'
            });
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, currentPos) {
    infoWindow.setPosition(currentPos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

$("#searchButton").click(function () {
    // queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyD0fkNiqS5pR7EwGX8Ogau_XYce-hfD2K0"
    // console.log(queryURL);

    //https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceSearchRequest
    var request = {
        type: 'restaurant',
        location: currentPos,
        radius: 1609.34 * 10,
        keyword: '(gluten-free) AND (vegan) AND (vegetarian) AND (family)'
    };

    //https://code.luasoftware.com/tutorials/google-maps/google-places-javascript-api-query-for-places/
    var placeService = new google.maps.places.PlacesService(map);
    placeService.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(function (item) {
                // console.log(item);
                pos = {
                    lat: item.geometry.location.lat(),
                    lng: item.geometry.location.lng()
                };
                marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: item.name,
                    icon: 'assets/images/restaurantmarker.png'
                });
                //closed scope vs global
                let centerPos = pos;
                var row = $('<tr><td>' + item.name + '<br>' + item.vicinity + '<br><a href="https://www.google.com/maps/dir/' + lat + ',' + lng + '/' + item.vicinity + '" target="_blank">Get Directions</a></td></tr>');
                $('#results').append(row);
                row.click(function () {
                    map.setCenter(centerPos);
                });
            });
        }
    });
})

// function logPlaceDetails() {
//     var service = new google.maps.places.PlacesService(document.getElementById('map'));
//     service.getDetails({
//         placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
//     }, function (place, status) {
//         console.log('Place details:', place);
//     });
// }

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
            //console.log(response)
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


