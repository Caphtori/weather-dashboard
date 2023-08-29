// let fetchUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=6f70b9885c5a3d8ea9b7077692618ee1";

let fetchUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=6f70b9885c5a3d8ea9b7077692618ee1"
fetch(fetchUrl)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
    })


let citySearchEl = document.querySelector("#city-search");
let formBtnEl = document.querySelector("#form-btn");
let currentBoxEl = document.querySelector("#current-box");
let historyUlEl = document.querySelector("#history-ul");
let ffUlEl = document.querySelector("#forecast-ul");

let cCity = null;
let today = dayjs();


function citySearch(){
    
}


function renderCurrentCard(){
    let cityTitleEl = document.createElement("h2");
    let cTemp = document.createElement("a");
    let cWind = document.createElement("a");
    let cHum = document.createElement("a");

    if (cCity === null|| cCity ===""){
        cityTitleEl.textContent = "Enter Valid City Name";
    } else {
        let cityTitle = cCity+today.format("ddd D/M/YYYY")
        let cTempVar = 0;
        let cWindVar = 0;
        let cHumVar = 0;

        cityTitleEl.textContent = cityTitle;
        cTemp.textContent = "Temp: "+cTempVar;
        cWind.textContent = "Temp: "+cWindVar;
        cHum.textContent = "Temp: "+cHumVar;
    }


    currentBoxEl.append(cityTitleEl);
    if (cCity === null|| cCity ===""){
        currentBoxEl.append(cTemp);
        currentBoxEl.append(cWind);
        currentBoxEl.append(cHum);
    };
}


renderCurrentCard();



