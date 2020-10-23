const submitBtn = document.querySelector("#submit-btn");
const city = document.querySelector("#city");
const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");
const middleLayer = document.querySelector(".middle-layer");
const day = document.querySelector(".day");
const date = document.querySelector(".date");

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const getDate = () =>{
    const now = new Date();

    console.log(now.getTimezoneOffset());

    presentDay = days[now.getDay()];
    day.innerText = `${presentDay}`;
    
    presentDate = now.getDate();
    presentMonth = now.getMonth();
    date.innerText = `${presentDate} ${months[presentMonth]}`;
}

const submitInfo = async (e) => {
    e.preventDefault();
    const cityVal = city.value;

    if (cityVal === "") {
        if(cityName.classList.contains("cityName")){
            cityName.classList.remove("cityName");
        }
        middleLayer.classList.add("data-hide");
        cityName.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Please enter a city name`;
    } else {
        try {
            const apiData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=538ccefa66607c6591a1b1958fffda40`);
            const data = await apiData.json();

            cityName.classList.add("cityName");
            cityName.innerText = `${data.name}, ${data.sys.country}`;

            middleLayer.classList.remove("data-hide");
            temperature.innerHTML = `${data.main.temp}&deg;C`;

            const weatherCondition = data.weather[0].main;
            console.log(weatherCondition);

            if (weatherCondition === "Clounds") {
                weatherIcon.innerHTML = `<i class="fas fa-cloud fa-3x"></i>`;
            } else if (weatherCondition === "Thunderstorm"){
                weatherIcon.innerHTML = `<i class="fas fa-bolt fa-3x"></i>`;
            } else if (weatherCondition === "Rain"){
                weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy fa-3x"></i>`;
            } else if (weatherCondition === "Snow"){
                weatherIcon.innerHTML = `<i class="far fa-snowflake fa-3x"></i>`;
            } else if (weatherCondition === "Clear"){
                weatherIcon.innerHTML = `<i class="fas fa-sun fa-3x"></i>`;
            } else if (weatherCondition === "Fog"){
                weatherIcon.innerHTML = `<i class="fas fa-smog fa-3x"></i>`;
            } else if (weatherCondition === "Haze"){
                weatherIcon.innerHTML = `<i class="fas fa-wind fa-3x"></i>`;
            } else {
                weatherIcon.innerHTML = `<i class="fas fa-sun fa-3x"></i>`;
            }
        } catch (e) {
            if(cityName.classList.contains("cityName")){
                cityName.classList.remove("cityName");
            }
            middleLayer.classList.add("data-hide");
            cityName.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Please enter a city name that really exists...`;
        }
    }
}

submitBtn.addEventListener("click", submitInfo);
getDate();