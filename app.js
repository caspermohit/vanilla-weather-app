window.addEventListener('load',()=>{
let long;
let lat;


let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");
let apparentSection = document.querySelector(".apparent");
let humiditySection = document.querySelector(".humid");
let ozoneSection = document.querySelector(".ozone");
let cloudSection = document.querySelector(".cloud");
let pressureSection = document.querySelector(".pressure");
let uvSection =document.querySelector(".uv-index");
let visibilitySection = document.querySelector(".visibility");
let windSection = document.querySelector(".windspeed");
let dewSection = document.querySelector(".dew");
let summarySection = document.querySelector(".summary");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
long = position.coords.longitude;
lat = position.coords.latitude;
           const proxy ="https://cors-anywhere.herokuapp.com/"
            const  api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
            .then(response =>{
                 return response.json();

            })
            .then(data =>{
               console.log(data);
                const {temperature,summary,icon,apparentTemperature,humidity,ozone,cloudCover,dewPoint,pressure,uvIndex,visibility,windSpeed} = data.currently;
                
                // set dom elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                apparentSection.textContent = apparentTemperature;
                humiditySection.textContent = humidity;
                ozoneSection.textContent = ozone;
                cloudSection.textContent = cloudCover;
                pressureSection.textContent =  pressure;
                uvSection.textContent = uvIndex;
                visibilitySection.textContent = visibility;
                windSection.textContent = windSpeed;
                dewSection.textContent = dewPoint;
                locationTimezone.textContent = data.timezone;
                summarySection.textContent = data.daily.summary;

                setIcons(icon,document.querySelector(".icon"));
                setIcons(icon,document.querySelector(".sicon"));
                setIcons(data.daily.icon,document.querySelector(".dicon"));
                // formula for celsius
                let celsius =(temperature-32)*(5/9);
                // change temperature
                temperatureSection.addEventListener("click",()=>{
                if(temperatureSpan.textContent ==="°F"){
                    temperatureSpan.textContent ="°C";
                    temperatureDegree.textContent =Math.floor(celsius);
                } else{
                    temperatureSpan.textContent ="°F";
                    temperatureDegree.textContent =temperature;
                }
                });
                


            });
            
    });
}
function setIcons(icon,iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
}
});