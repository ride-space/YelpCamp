mapboxgl.accessToken = mapToken ;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
// center: campground.geometry.coordinates, // starting position [lng, lat]
center: [139.6922,35.6897], // starting position [lng, lat]
zoom: 8, // starting zoom
projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});

const marker1 = new mapboxgl.Marker()
// .setLngLat(campground.geometry.coordinates)
.setLngLat([139.6922,35.6897])
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>Title</h4><p>location</p>`))
.addTo(map);
