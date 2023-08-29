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
            // let nameArray=[];
            // let test1 = dayjs(data.list[0].dt)
            // console.log(test1.format("hA"))
            let storedHistory = JSON.parse(localStorage.getItem("masterHistory"));
            if (storedHistory!==null){
                history = storedHistory;
            }
            cCity=data;
            console.log(data);
            history.push(data);
            // if (cCity === null|| cCity ===""){
            //     for (let i=0; i<history.length; i++){
            //         if (history[i].city.name===data.city.name){
            //             history.splice(i, 1, data)
            //             nameArray.push(data.name);
            //         } else {
            //             nameArray.push(history[i].name);
            //         };
            //     }
            //     if (!nameArray.includes(data.name)){
            //         localStorage.setItem("masterHistory", JSON.stringify(history));
            //     };
            // }
            localStorage.setItem("masterHistory", JSON.stringify(history));
            renderHistory()
            renderCurrentCard();
            citySearchEl.value = "";
        })
    
}

function renderHistory(){
    historyUlEl.innerHTML="";
    let storedHistory = JSON.parse(localStorage.getItem("masterHistory"));
    if (storedHistory!==null){
        history = storedHistory;
    }
    let revHistory = history.reverse();
    for (let i=0; i<revHistory.length; i++){
        let li = document.createElement("li");
        li.setAttribute("class", "history-li");
        li.textContent = revHistory[i].city.name;
        historyUlEl.appendChild(li);
    }

}


function renderCurrentCard(){
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
        let cTempVar = cCity.list[0].main.temp;
        let cWindVar = cCity.list[0].wind.speed;
        let cHumVar = cCity.list[0].main.humidity;

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
renderHistory();

formBtnEl.addEventListener("click", citySearch);
// submitEl.addEventListener("click", citySearch);
