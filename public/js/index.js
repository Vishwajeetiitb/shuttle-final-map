/* eslint-disable no-unused-vars, no-shadow-global */
/* globals google */

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#eceff1'
      }
    ]
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#cfd8dc'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#b0bec5'
      }
    ]
  }
];

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.979228, lng: 73.758438},
    zoom: 18
    // styles: mapStyle
  });
  var image = 'https://example.com/images/carnew.svg';
  var marker = new google.maps.Marker({
    position: {lat: 19.979228, lng: 73.758438},
    map: map
  });

  var pos;
  var lineCoords = [];
  const db = firebase.database();
  console.log;
  db.ref('e-shuttle-snapped-gps/E1').on('value', snapshot => {
    var pos = snapshot.val();
    console.log(pos);
    marker.setPosition({lat:pos.latitude, lng: pos.longitude});
    lineCoords.push(new google.maps.LatLng(pos.latitude, pos.longitude));

    var lineCoordinatesPath = new google.maps.Polyline({
      path: lineCoords,
      geodesic: true,
      strokeColor: '#2E10FF'
    });

    lineCoordinatesPath.setMap(map);
  });
}
