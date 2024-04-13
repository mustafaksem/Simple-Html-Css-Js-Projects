const container= document.querySelector('.container');
const search= document.querySelector('.search-box button');
const weatherBox= document.querySelector('.weather-box');
const weatherDetails= document.querySelector('.weather-details');
const error= document.querySelector('.not-found');

search.addEventListener('click', ()=> {

    const APIKey ='62c7dbc185114f1f971233843240604';
    const city =document.querySelector('.search-box input').value;

    if(city=='')
        return;
    fetch(`http://api.weatherapi.com/v1/current.json?key=62c7dbc185114f1f971233843240604&q=${city}&aqi=no`).then(Response=>Response.json()).then(json=>{
            
            if (json.error && json.error.code === 1006) {
                // Hata durumunda
                container.style.height='400px';
                document.querySelectorAll('.weather-box, .weather-details').forEach(element => {
                    element.style.visibility = 'hidden';
                });
                document.querySelector('.not-found').style.visibility = 'visible';  
                document.querySelector('.container-bg-video').style.visibility = 'hidden';
                
            } else {
                // Hata olmadığında
                container.style.height='555px';
                document.querySelectorAll('.weather-box, .weather-details').forEach(element => {
                    element.style.visibility = 'visible';
                });
                document.querySelector('.not-found').style.visibility = 'hidden';
                document.querySelector('.container-bg-video').style.opacity = '0.9';
                document.querySelector('.container-bg-video').style.visibility = 'visible'; 
            }
            

            const image =document.querySelector('.weather-box img');
            const video = document.querySelector('.container video');
            const tempature =document.querySelector('.weather-box .tempature');
            const description =document.querySelector('.weather-box .description');
            const humidity =document.querySelector('.weather-details .humidity span');
            const wind =document.querySelector('.weather-details .wind span');            
       
               switch (json.current.condition.text) {
                   case 'Clear':
                    case 'Sunny':
                       image.src='images/clear.png';
                       video.src='images/sunny.mp4';
                       break;
                   case 'Rain':
                   case 'Patchy rain possible':
                   case 'Patchy sleet possible':
                    case 'Thundery outbreaks possible':
                    case 'Moderate or heavy showers of ice pellets':
                    case 'Patchy freezing drizzle possible':
                    case 'Patchy light drizzle':
                    case 'Light drizzle':
                    case 'Freezing drizzle':
                    case 'Heavy freezing drizzle':
                    case 'Patchy light rain':
                    case 'Light rain':
                    case 'Moderate rain at times':
                    case 'Moderate rain':
                    case 'Heavy rain at times': 
                    case 'Heavy rain':
                    case 'Light freezing rain ':
                    case 'Moderate or heavy freezing rain':
                    case 'Light sleet':    
                    case 'Moderate or heavy sleet':
                       image.src='images/rain.png';
                       video.src='images/rainy.mp4';
                       break;
                   case 'Snow':
                   case 'Patchy snow possible':
                    case 'Moderate or heavy snow with thunder':
                    case 'Patchy light snow with thunder':
                    case 'Blowing snow':
                    case 'Patchy light snow':
                    case 'Light snow':
                    case 'Patchy moderate snow':
                    case 'Moderate snow':
                    case 'Patchy heavy snow':
                    case 'Heavy snow':
                    case 'Ice pellets':
                    case 'Light rain shower':
                    case 'Moderate or heavy rain shower':
                    case 'Moderate or heavy sleet showers':
                    case 'Light snow showers':
                    case 'Moderate or heavy snow showers':
                    case 'Light showers of ice pellets':
                    case 'Moderate or heavy showers of ice pellets':
                       image.src='images/snow.png';
                       video.src='images/snowy.mp4';
                       break;
                   case 'Overcast':
                   case 'Partly cloudy':
                   case 'Cloudy':
                        image.src='images/cloud.png';
                        video.src='images/cloudy.mp4';
                        break;
                   case 'Mist':
                   case 'Haze':
                    case 'Fog':
                    case 'Freezing fog':
                       image.src='images/mist.png';
                       video.src='images/misty.mp4';
                       break;                              
                   default:
                       image.src='images/cloud.png';
                       video.src='images/cloudy.mp4';                                               
               }
                tempature.innerHTML = `${Math.round(json.current.temp_c)}<span>°C</span>`;
                description.innerHTML = json.current.condition.text;
                humidity.innerHTML = `${json.current.humidity}%`;
                wind.innerHTML = `${Math.round(json.current.wind_kph)}Km/h`;
            

    });
});