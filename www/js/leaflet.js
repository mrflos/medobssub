
// verifier le type de connexion
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Inconnue';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.CELL]     = 'Cellulaire';
    states[Connection.NONE]     = 'Pas de connexion';

    return states[networkState];
}

// peut on utiliser la connexion ?
function hasConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Inconnue';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.CELL]     = 'Cellulaire';
    states[Connection.NONE]     = 'Pas de connexion';

    return states[networkState] !== 'Pas de connexion' && states[networkState] !== 'Cellulaire';
}

// activation de la carte
var map = L.map('leaflet-map', {scrollWheelZoom:true,
    zoomControl:false, attributionControl:false
}).setView([42.0300364, 6.9614337], 5);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var leafletmap = $('#leaflet-map');
leafletmap.hide();

var markers = new L.LayerGroup();
markers.addTo(map);

/* carte generale */
function initmap(where) {
	map.setView([42.0300364, 6.9614337], 5);
	if (hasConnection()) {
		leafletmap.appendTo(where).show();
		map.invalidateSize();
	} 
	else {
		alert('Pas de connexion réseau pour afficher la carte ;-( ...');
	}
}
