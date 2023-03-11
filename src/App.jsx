import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState({});
  const [isCelsio, setIsCelsio] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const isclick = () => setIsCelsio(!isCelsio);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=255a2683bd5ad3ec6d689e72383cce35`
        )
        .then((res) => {
          setWeather(res.data);
          const temp = {
            celsiu: `${Math.round(res.data.main.temp - 273.15)}°C`,
            farenheit: `${(Math.round(res.data.main.temp - 273.15) * 9) / 5 + 32
              }°F`,
          };
          setTemperature(temp);
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(weather);
  return (
    <div className="App">

      <div className="time">
   
        
     


        <input type="text" placeholder="Buscar ciudad" />
        <h1 className="title--weather">weather app</h1>
        
        <button onClick={isclick} className="btn">
          {" "}
          {isCelsio ? " °F" : " °C"}{" "}
        </button>
      </div>


      {/* nubes */}
      <div className="cloud">

        <div className="nubes">
          <p>
            {weather.name} &nbsp; <span>{weather.sys?.country}</span>
          </p>
          <img
            className="img--clouds"
            src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
            alt=""
          />
          <p>{weather.weather?.[0].description}</p>
        </div>


        <h1 className="temp">
          {" "}
          <span style={{ color: "white" }}>
            {isCelsio ? temperature?.celsiu : temperature?.farenheit}
          </span>
        </h1>

      </div>
      {/*  */}

      <div className="time">


        <p className="estados-clima">
          <span className="name">Temp_min:</span> <span>{` ${weather.main?.temp_main} `}</span>
        </p>
        <p className="estados-clima">
          <span className="name">Temp_max:</span> <span>{` ${weather.main?.temp_max} `}</span>
        </p>
        <p className="estados-clima">
          <span className="name">Feels_like:</span> <span>{` ${weather.main?.feels_like} mb`}</span>
        </p>
        <p className="estados-clima">
          <span className="name">Pressure:</span> <span>{` ${weather.main?.pressure} hpa`}</span>
        </p>
        <p className="estados-clima">
          <span className="name">Humidity: </span> <span>{` ${weather.main?.humidity} %`}</span>
        </p>
        <p className="estados-clima">
          <span className="name">Wind speed: </span>  <span> {` ${weather.wind?.speed} m/s`}</span>
        </p>







      </div>




      








    </div>
  );
}

export default App;
