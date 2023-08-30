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
let clearEl = document.querySelector("#clear");
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
            search(data);
        })
    
}

function search(cityObj){
    let storedHistory = JSON.parse(localStorage.getItem("masterHistory"));
    if (storedHistory!==null){
        history = storedHistory;
    }
    cCity=cityObj;
    console.log(cCity)
    if (cCity !== null|| cCity !==""){
        for (let i=0; i<history.length; i++){
            if (history[i].city.name===cCity.city.name){
                history.splice(i, 1);
            }
        };
        history.push(cCity);
    };
    
    localStorage.setItem("masterHistory", JSON.stringify(history));
    renderHistory();
    renderCurrentCard();
    renderForecast()
    citySearchEl.value = "";
};

function renderHistory(){
    historyUlEl.innerHTML="";
    let storedHistory = JSON.parse(localStorage.getItem("masterHistory"));
    if (storedHistory!==null){
        history = storedHistory;
    };
    let revHistory = history.reverse();
    for (let i=0; i<revHistory.length; i++){
        let li = document.createElement("li");
        let liClose = document.createElement("div");
        let liCloseI = document.createElement("i");
        liCloseI.setAttribute("class", "fa fa-close");
        liClose.setAttribute("class", "liClose");
        li.setAttribute("class", "history-li");
        li.textContent = revHistory[i].city.name;
        liClose.appendChild(liCloseI);
        li.appendChild(liClose);
        historyUlEl.appendChild(li);
        li.addEventListener("click", ()=>{search(revHistory[i])}, { once:true });
        liClose.addEventListener("click", (event)=>{
            event.stopPropagation();
            for (let n=0; n<history.length; n++){
                if (history[n].city.name===revHistory[i].city.name){
                    history.splice(n, 1);
                };
            };
            localStorage.setItem("masterHistory", JSON.stringify(history));
            renderHistory();
        }, { once:true });
    }

}


function renderCurrentCard(){
    let titleBox = document.createElement("div");
    let nameBox = document.createElement("div");
    let cityTitleEl = document.createElement("h2");
    let cityDateEl = document.createElement("h3");
    let cIcon = document.createElement("img")
    let cTemp = document.createElement("p");
    let cWind = document.createElement("p");
    let cHum = document.createElement("p");
    

    currentBoxEl.innerHTML="";

    titleBox.setAttribute("class", "titleBox");
    nameBox.setAttribute("class", "nameBox");

    if (cCity === null|| cCity ===""){
        cIcon.setAttribute("class", "nv");
        cityDateEl.setAttribute("class", "nv")
        cityTitleEl.textContent = "Enter Valid City Name";
        cTemp.textContent = "Temp:";
        cWind.textContent = "Wind:";
        cHum.textContent = "Humidity:";
    } else {
        let weatherIcon = cCity.list[0].weather[0].icon;
        let iconAddress = "http://openweathermap.org/img/w/"+weatherIcon+".png";
        // let cityTitle = cCity.city.name+" "+today.format("ddd, M/D/YYYY")
        let cTempVar = cCity.list[0].main.temp;
        let cWindVar = cCity.list[0].wind.speed;
        let cHumVar = cCity.list[0].main.humidity;

        cIcon.setAttribute("src", iconAddress);
        cIcon.setAttribute("class", "cIcon");

        cityDateEl.setAttribute("class", "");

        // cityTitleEl.textContent = cityTitle;
        cityTitleEl.textContent = cCity.city.name;
        cityDateEl.textContent = today.format("ddd, M/D/YYYY");
        cTemp.textContent = "Temp: "+cTempVar+"°F";
        cWind.textContent = "Wind: "+cWindVar+"mph";
        cHum.textContent = "Humidity: "+cHumVar+"%";
    }

    nameBox.appendChild(cityTitleEl);
    nameBox.appendChild(cIcon);
    titleBox.appendChild(nameBox);
    titleBox.appendChild(cityDateEl);
    // currentBoxEl.appendChild(cityTitleEl);
    currentBoxEl.appendChild(titleBox);
    currentBoxEl.appendChild(cTemp);
    currentBoxEl.appendChild(cWind);
    currentBoxEl.appendChild(cHum);
}

function renderForecast(){
    let now = dayjs();
    let forecast = [];

    console.log(cCity)

    for (let i=0; i<cCity.list.length; i++){
        let listTime = dayjs(cCity.list[i].dt_txt);
        // console.log(cCity.list[i].dt_txt)
        // console.log(listTime.format("M/D/YYYY h:mm"))
        if (!listTime.isSame(now, "date")&&listTime.hour()===12){
            console.log("bub")
            forecast.push(cCity.list[i]);
        };  
    };

    for (let i=0; i<forecast.length; i++){
        let li = document.createElement("li");
    }
}

renderCurrentCard();
renderHistory();

formBtnEl.addEventListener("click", citySearch);
// submitEl.addEventListener("click", citySearch);

clearEl.addEventListener("click", ()=>{
    history = [];
    localStorage.setItem("masterHistory", JSON.stringify(history));
    renderHistory();
});
