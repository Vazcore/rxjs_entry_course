/**
 * Global variables:
 *   L       - map api
 *   API_URL - earthquake API url
 *   map     - current map rendered on the page
 */

/**
 * Task 1 - Get and handle response from Earthquake API
*/

var quakes = Rx.DOM.jsonpRequest({
  url: API_URL,
  jsonpCallback: 'eqfeed_callback'
})

// 1.1 - Get an array of places (response.features) and map as Observable from array


// 1.2 - Get coordinates (geometry.coordinates) and magnitude size (properties.mag)


// 1.3 - Subscribe for this observable and when new element of array will be emitted -> 


// 1.4 - Display it as circle marker on the map (L.circle([lat, lng], size).addTo(map))


