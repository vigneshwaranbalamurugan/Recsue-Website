
const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 15
  });
};


      
 window.addEventListener("deviceorientation", handleOrientation, true);

var glb = 0;

function handleOrientation(event) {
   glb = Math.round(event.alpha);
  var icon = {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              strokeColor : '#3333FF',
              strokeWeight : 5,
              scale: 2.5,
              rotation:-glb
            };

    if (marker) {
     marker.setIcon(icon);
  }else{
    console.log("marker not created yet");
  }
  console.log('glb',glb);
}


     
const createMarker = ({ map, position }) => {
  
   myLocationMarker =  new google.maps.Marker({ map, position ,icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              strokeColor : '#3333FF',
              strokeWeight : 5,
              scale: 2.5,
              rotation:glb
              //rotation:event.alpha,

            },
        shadow : null,
        zIndex : 999});

   // Add circle overlay and bind to marker
var circle = new google.maps.Circle({
  map: map,
  radius: 1000,    // 10 miles in metres
  fillColor: '#108ee76e',
   strokeColor : '#108ee7',
});
circle.bindTo('center', myLocationMarker, 'position');

   

    return myLocationMarker;
};



const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};


const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}



var marker;
function init() {
  const initialPosition = { lat: 59.32, lng: 17.84 };
  const map = createMap(initialPosition);
  marker = createMarker({ map, position: initialPosition });
  const $info = document.getElementById('info');
  const $mess=document.getElementById('mess');
  const $loc=document.getElementById('loc');
  let watchId = trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      marker.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      $info.textContent = "Your Location- "+`Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
      $loc.innerHTML = `<a href="https://www.google.com/maps?q=${lat.toFixed(5)},${lng.toFixed(5)}">View on Google Maps</a>`;
      $mess.href = `sms:9345847062 ?body=https://www.google.com/maps?q=${lat.toFixed(5)},${lng.toFixed(5)}`;
      $info.classList.remove('error');
    },
    onError: err => {
      console.log($info);
      $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
      $info.classList.add('error');
    }
  });

// Store old reference
const appendChild = Element.prototype.appendChild;

// All services to catch
const urlCatchers = [
  "/AuthenticationService.Authenticate?",
  "/QuotaService.RecordEvent?"
];


Element.prototype.appendChild = function (element) {
  const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
  const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));

  if (!isGMapAccessScript) {
    return appendChild.call(this, element);
  }

 
  return element;
};

}
