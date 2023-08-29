// let fetchUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=6f70b9885c5a3d8ea9b7077692618ee1";

// let fetchUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=6f70b9885c5a3d8ea9b7077692618ee1"
// let fetchUrl = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&units=imperial&appid=6f70b9885c5a3d8ea9b7077692618ee1"
// fetch(fetchUrl)
//     .then((response)=>{
//         return response.json();
//     })
//     .then((data)=>{
//         console.log(data);
//     })


let citySearchEl = document.querySelector("#city-search");
// let submitEl = document.querySelector("#submit-input");
let formBtnEl = document.querySelector("#form-btn");
let currentBoxEl = document.querySelector("#current-box");
let historyUlEl = document.querySelector("#history-ul");
let ffUlEl = document.querySelector("#forecast-ul");

let cCity = null;
let today = dayjs();
let history = [];


function citySearch(event){
    event.preventDefault()
    let cityInput = citySearchEl.value.trim();

    fetch("https://api.openweathermap.org/data/2.5/forecast?&q="+cityInput+"&units=imperial&appid=6f70b9885c5a3d8ea9b7077692618ee1")
        .then((response)=>{
            if (response.status===200){
                return response.json();
            } else {
                cCity = null;
            };
            
        })
        .then((data)=>{
            cCity=data;
            console.log(data);
            renderCurrentCard();
            citySearchEl.value = "";
        })
    
}


function renderCurrentCard(){
    let now = dayjs();
    let currentSlot = ()=>{
        if (now.hour()<8){
            return 0;
        } else if (now.hour()<11){
            return 1;
        } else if (now.hour()<14){
            return 2;
        } else if (now.hour()<17){
            return 3;
        } else if (now.hour()<20){
            return 4;
        } else if (now.hour()<23){
            return 5;
        };
    };
    console.log(currentSlot())

    let titleBox = document.createElement("div");
    let cityTitleEl = document.createElement("h2");
    let cityDateEl = document.createElement("h3");
    let cIcon = document.createElement("i")
    let cTemp = document.createElement("p");
    let cWind = document.createElement("p");
    let cHum = document.createElement("p");

    currentBoxEl.innerHTML="";

    titleBox.setAttribute("class", "titleBox");

    if (cCity === null|| cCity ===""){
        cityTitleEl.textContent = "Enter Valid City Name";
        cTemp.textContent = "Temp:";
        cWind.textContent = "Wind:";
        cHum.textContent = "Humidity:";
    } else {
        let cityTitle = cCity.city.name+" "+today.format("ddd, M/D/YYYY")
        let cTempVar = cCity.list[currentSlot()].main.temp;
        let cWindVar = cCity.list[currentSlot()].wind.speed;
        let cHumVar = cCity.list[currentSlot()].main.humidity;

        cityTitleEl.textContent = cityTitle;
        cTemp.textContent = "Temp: "+cTempVar+"°F";
        cWind.textContent = "Wind: "+cWindVar+"mph";
        cHum.textContent = "Humidity: "+cHumVar+"%";
    }


    titleBox.appendChild(cityTitleEl);
    currentBoxEl.appendChild(cityTitleEl);
    currentBoxEl.appendChild(cTemp);
    currentBoxEl.appendChild(cWind);
    currentBoxEl.appendChild(cHum);
}


renderCurrentCard();


formBtnEl.addEventListener("click", citySearch);
// submitEl.addEventListener("click", citySearch);
