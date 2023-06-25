import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState({});
  const [isCelsio, setIsCelsio] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Nuevo estado para el campo de búsqueda

  const handleClick = () => setIsCelsio(!isCelsio);

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

  const buscar = () => {
    // Actualizar el campo 'name' de 'weather' con el valor del campo de búsqueda
    setWeather({ ...weather, name: searchQuery });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <div className="time">
       <div className="input-contenedor">
       <input
          type="text"
          placeholder="Buscar ciudad"
          value={searchQuery}
          onChange={handleChange}
        />
        <i onClick={buscar} className="bx bx-search lupa"></i>

       </div>
        <h1 className="title--weather">weather app</h1>
        <button onClick={handleClick} className="btn">
          {isCelsio ? " °F" : " °C"}
        </button>
      </div>

      <div className="cloud">
        <div className="nubes">
          <p>
            {weather.name} &nbsp; <span>{weather.sys?.country}</span>
          </p>
          <img
            className="img--clouds"
            src={`http://openweathermap.org/img/wn/${
              weather.weather?.[0].icon
            }@2x.png`}
            alt=""
          />
          <p>{weather.weather?.[0].description}</p>
        </div>
        <i style={{ color: "white" }} className="bx bx-cloud-lightning bx-fade-down bx-lg"></i>
        <h1 className="temp">
          <span style={{ color: "white" }}>
            {isCelsio ? temperature?.celsiu : temperature?.farenheit}
          </span>
        </h1>
      </div>

      <div className="time">
        <p className="estados-clima">
          <span className="name">Temp_min:</span> <span>{` ${weather.main?.temp_min} `}</span>
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
          <span className="name">Wind speed: </span> <span>{` ${weather.wind?.speed} m/s`}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
