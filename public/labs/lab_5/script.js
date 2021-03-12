/*function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

  const marker = L.marker([51.5, -0.09]).addTo(mymap);
  const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

const polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
]).addTo(mymap);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

const popup = L.popup()
.setLatLng([51.5, -0.09])
.setContent("I am a standalone popup.")
.openOn(mymap);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
  return map;
}
*/
async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  sync function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    return data
  }
  const resturants = []; 
  getData().then(data => resturants.push(...data));
  
  function findMatches(matchWord, resturants) {
    return resturants.filter(resturant => {
        const regex = new RegExp(matchWord, 'gi');
        return resturant.zip.match(regex);
    });
  }
  
  function displayMatches() {
    const matchArray = findMatches(this.value, resturants)
    const html = matchArray.map(resturant => {
        return `
        <div class="block">
        <ul>
        <li class="results">
            <span class="name"> ${resturant.name} </span><br />
            <span class="category"> ${resturant.category} </span> <br /> 
        <address class="alpha">
            <span class="address"> ${resturant.address_line_1} </span> <br />
            <span class="city"> ${resturant.city}</span> <br />
            <span class="zip">${resturant.zip}</span> 
        </address>
        </li>
        </ul>
        </div>
        `;
    }).join('');
    suggestions.innerHTML = html;
  }
  
  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.suggestions')
  
  searchInput.addEventListener('change', displayMatches)
  searchInput.addEventListener('keyup', displayMatches)
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;


