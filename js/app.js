$(document).ready(function() {

  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var bayarea = new google.maps.LatLng(37.5, -122.5469157);

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 8,
      center: bayarea
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    //var startaddr = (document.getElementById('start-txt'));
    //var destinationaddr = (document.getElementById('destination-txt'));
    //var searchbtn = (document.getElementById('search-btn'));
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(startaddr);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationaddr);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchbtn);

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.getDirections());
    });

    calcRoute();
  }

  function calcRoute() {
    var start = document.getElementById('start-txt').value;
    var destination = document.getElementById('destination-txt').value;
    var mode = "DRIVING";

    var request = 
    {
        origin: start,
        destination: destination,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[mode]
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
  }

  $('#start-txt').keydown(function(event){
    var enter = 13;

    if (event.keyCode === enter) {
      calcRoute();
    }
  });  

  $('#destination-txt').keydown(function(event){
    var enter = 13;

    if (event.keyCode === enter) {
      calcRoute();
    }
  });  

  $('#search-btn').click(calcRoute);

  google.maps.event.addDomListener(window, 'load', initialize);
});