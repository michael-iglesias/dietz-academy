google.maps.event.addDomListener(window, 'load', init);

var map;

function init() {

	var mapOptions = {
		center: new google.maps.LatLng(30.4347342,-84.2796577),
		zoom: 15,
		zoomControl: true,
		disableDoubleClickZoom: false,
		mapTypeControl: false,
		scaleControl: true,
		scrollwheel: false,
		streetViewControl: false,
		draggable : false,
		overviewMapControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	}

	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var locations = [
		['Tallahassee', 30.4347342,-84.2796577]
	];

	infowindow = new google.maps.InfoWindow({
		content: "<div style='width: 130px; height: 60px'><b></b><br/>918 Railroad Ave<br/> Tallahassee, FL</div>"  //add your address
	});
	
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			icon: '',
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
		});
	}

	google.maps.event.addListener(marker, "click", function () {
		infowindow.open(map, marker);
	});

	infowindow.open(map, marker);

}

google.maps.event.addDomListener(window, 'load', init);