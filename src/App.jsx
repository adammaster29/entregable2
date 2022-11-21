import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import Footer from "./components/Footer";

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
            farenheit: `${
              (Math.round(res.data.main.temp - 273.15) * 9) / 5 + 32
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
      <div className="container">
        <h1 className="title--weather">weather app</h1>
        <p>
          {weather.name} &nbsp; <span>{weather.sys?.country}</span>
        </p>
        <div className="allTime">
          <div className="cloud">
            <img
              className="img--clouds"
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
          </div>

          <div className="time">
            <p>"scattereb clouds"</p>
            <p>
              speed: <span> {` ${weather.wind?.speed} m/s`}</span>
            </p>
            <p>
              clouds: <span>{` ${weather.clouds?.all} %`}</span>
            </p>
            <p>
              pressure: <span>{` ${weather.main?.pressure} mb`}</span>
            </p>
          </div>
        </div>

        <div className="temp--container">
          <p className="temp">
            temp:{" "}
            <span>
              {isCelsio ? temperature?.celsiu : temperature?.farenheit}
            </span>
          </p>
          <button onClick={isclick} className="btn">
            {" "}
            {isCelsio ? "temp to °F" : "temp to °C"}{" "}
          </button>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
