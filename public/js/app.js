console.log('client-side javascript file is loaded!');

//  fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//         console.log(data);
//      });
//  });

//  const address = 'Valenzuela';
//  const geoUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWdtYXIyOCIsImEiOiJja2Y4MTh4cnYwN3VvMnNyMHJwb2pkcGIxIn0.3lwXLZh9dllvZeRp9JNkhQ&limit=1'
//  const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=14.86667&lon=-118.2439&appid=7c1e5c1c2bcc0f93d029be170e3e9667&units=metric'


//  fetch(geoUrl).then((response) => {
//      response.json().then((data) => {
//          const location = data.features[0].place_name
//          const latitude = data.features[0].center[1]
//          const longitude = data.features[0].center[0]
        
//          fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=7c1e5c1c2bcc0f93d029be170e3e9667&units=metric')
//             .then((response) => {
//                response.json().then((data) => {
//                   console.log('Location: ' + location);
//                   console.log('Forecast: ' + data.current.weather[0].description);
//             });
//          });
//      });
//   });


const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Location: ';

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const location = search.value
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = null;
   fetch('http://localhost:3000/weather?address='+location).then((response) => {
      response.json().then((data) => {
         if(data.error){
            messageOne.textContent = data.error
         } else {
            messageOne.textContent = 'Location: '+ data.location
            messageTwo.textContent = 'Forecast: '+ data.forecast   
         } 
      });
   });
});

