import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState([]);

  const [animationParent] = useAutoAnimate();

  console.log("weather dolu mu", weather);

  const handleClick = async (e) => {
    setCountry(e.target.value);
    try {
      setWeather([]);
      const headers = {
        authorization: "apikey 51KD1HA4UP4kgR6f0YVFso:6BcmaEU3rJkDL0WHOXbE89",
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${country}`,
        { headers: headers }
      );

      const newWeatherData = [];

      for (let i = 0; i < 7; i++) {
        newWeatherData.push(response.data.result[i]);
      }

      setWeather((prevWeater) => [...prevWeater, ...newWeatherData]);
    } catch (e) {
      console.log(e);
    }
  };

  function capitalizeWords(text) {
    let words = text.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
  }

  return (
    <>
      <div className="flex gap-4 m-10 justify-center">
        <input
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          type="text"
          className="bg-transparent border-2 rounded-md border-[#7C1034] text-white p-1"
          placeholder="İlçe Giriniz"
        />

        <button
          onClick={handleClick}
          className="border-2 rounded-md border-[#7C1034] text-white p-1"
        >
          Gör
        </button>
      </div>

      <ul
        ref={animationParent}
        className="flex flex-col w-[95%] mx-auto items-center gap-1"
      >
        {weather.map((item, index) => (
          <li
            key={index}
            className="border-2 border-[#7C1034] text-white rounded-md p-2"
          >
            {item.date} - {capitalizeWords(item.description)}
          </li>
        ))}
        {!weather.length && (
          <li className="border-2 border-[#7C1034] text-white rounded-md p-2">
            Şehir Bilgisi Bulunamadı.
          </li>
        )}
      </ul>
    </>
  );
}

export default App;
