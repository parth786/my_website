///             create map options (object)
var myLatLng = {lat: 51.5, lng: -0.1};
            
var mapOptions = {
    center : myLatLng,
    zoom : 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
            
//             create a map object using constructor
            
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);


// create a DirectionService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();


// create a DirectionRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);
// define calcRoute function
function calcRoute() {
    
     // create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING,BTCYCLING, TRANSIT 
        unitSystem: google.maps.UnitSystem.IMPERIAL // METRIC = km
    };
    
        
    // pass the request to the route method
    
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // get distance and time
        
            $("#output").html("<div class='alert alert-info'>From: " + document.getElementById("from").value + " .<br />To: " + document.getElementById("to").value + ".<br />Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
                
        //display route
        
            directionsDisplay.setDirections(result);
            
        } else {
           // delete route from map
               
            directionsDisplay.setDirections({routes: []});
               
            // center map in London
               
            map.setCenter(myLatLng);
               
               // show error message
               
            $("#output").html("<div class='alert alert-danger'>Could not retrive driving distance.</div>");
        }
    });
}

//create autocomplete object for all inputs
var options = {
    types: ['(cities)']
};
    
// for first input field
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

// for second input field

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);