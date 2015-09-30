// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var mapElement = document.querySelector(".duwamish");
var map = mapElement.map;
var points = Object.keys(mapElement.lookup).sort().map(k => mapElement.lookup[k]);

map.fitBounds([[47.1019, -122.412],[47.614,-121.262]]);

var index = -1;

var isMobile = () => window.matchMedia && window.matchMedia("(max-width: 480px)").matches;

var step = function(i) {
  var point = points[i];
  var popup = point.getPopup();
  popup.options.maxWidth = isMobile()? 200 : 300;
  console.log(popup.options);
  point.openPopup();
}

// step(index);

var onClickStep = function(e) {
  if (e.target.classList.contains("next")) {
    index++;
  } else {
    index--;
  }
  if (index > points.length - 1) index = points.length - 1;
  if (index < 0) index = 0;
  step(index);
};

[".next", ".previous"].forEach(s => document.querySelector(`.controls ${s}`).addEventListener("click", onClickStep));