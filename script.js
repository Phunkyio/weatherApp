var aKey = "add1fc36558991059f322461f50b0cbd";
var loc = document.getElementById("location");
var temp = document.getElementById("temperature");
var locData = {};

function getLocation() {
    $.getJSON("http://ip-api.com/json", function(e) {
        locData = e;
        loc.innerHTML =
            locData.city + ", " + locData.region + ", " + locData.countryCode;
    });

    /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      loc.innerHTML = "Error";
    }
    */
}

function getTemperature() {
    var tempAPIURL =
        "http://api.openweathermap.org/data/2.5/weather?APPID=" +
        aKey +
        "&zip=" +
        locData.zip +
        "," +
        locData.countryCode +
        "&units=imperial";

    $.getJSON(tempAPIURL, function(e) {
        temp.innerHTML = e.main.temp;
    }).fail(function(e) {
        temp.innerHTML = "??";
        getTemperature();
    });
}

/* Decremented, switching from https to http
function showPosition(position) {
  geolat = position.coords.latitude;
  geolong = position.coords.longitude;
  var geourl =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    geolat +
    "," +
    geolong +
    "&sensor=true";

  var georequest = $.getJSON(geourl, function(e) {
    displayLoc(e);
  });
}
*/

document.getElementById("location").onclick = function() {
    getLocation();
    getTemperature();
};

window.onload = function() {
    getLocation();
    getTemperature();
};

/*
#ip-api json sample
{"as":"AS7018 AT\u0026T Services, Inc.","city":"Fairfield","country":"United States","countryCode":"US","isp":"AT\u0026T U-verse","lat":38.2832,"lon":-122.0085,"org":"AT\u0026T U-verse","query":"75.53.183.129","region":"CA","regionName":"California","status":"success","timezone":"America/Los_Angeles","zip":"94533"}
*/
