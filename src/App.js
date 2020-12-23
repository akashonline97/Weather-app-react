import React, { useState } from "react"
import './App.css';

const api ={
  key : "8682e5868cfb16374bf04bbfd2911047" ,
  base : "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) =>{
  let months = ["Jan" ,"Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]

  let days= ["MON", "TUE" , "WED" , "THU" , "FRI" ,"SAT" , "SUN"]

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}` 
}
function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
  const search = evt => {
    if(evt.key==="Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
                setWeather(result)
                setQuery('')});

  
                      
    }
  }
  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp >16) ? 'app warm' : 'app' : 'app'}>
      <main>
        <div className="search-box">
          <input
                type="text"
                className="search-bar"
                placeholder="Search...."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
          />
        </div>
            {(typeof weather.main != "undefined") ? (
                <div>
                    <div className="location-box">
                        <div className="location">{weather.name},{weather.sys.country}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                    </div>

                    <div className="weather-box">
                        <div className="temp">
                        {Math.round(weather.main.temp)}*c
                        </div>
                      <div className ="weather">{weather.weather[0].main} </div>
                    </div>
                </div>
            ) : ('') } 
      </main>
    </div>
  );
}

export default App;
