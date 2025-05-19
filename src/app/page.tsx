'use client'

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherIcon from "@/components/WeatherIcon";
import { WEATHER_API_KEY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Calendar } from "lucide-react";

type WeatherForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: CityInfo;
};

type ForecastEntry = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type CityInfo = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export default function Home() {


  const { isPending, error, data } = useQuery<WeatherForecastResponse>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  });

  console.log("data", data?.city.country);
  console.log("data", data?.city.name);

  const firstData = data?.list[0];

  function kelvinToCelsius(kelvin: number): number {
    const celsius = kelvin - 273.15;
    return Math.round(celsius);
    // return celsius
  }

  if (isPending) return(
    <div className="flex items-center h-screen justify-center">
      <div className="container">
        <div className="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-flex flex-col gap-4 h-screen max-h-screen">
      <Navbar/>
      <main className="flex text-white">
        {/* section for today data and 10-day forecast */}
        <section className="flex flex-col gap-2 w-full max-w-xs">
          {/* today */}
          <div className="bg-gray-800 rounded-2xl p-5 w-full">
            <div className="flex w-full justify-between">
              <h1>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE') }</h1>
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'dd/MM/yyyy') }</p>
            </div>
            <Container>
              <h1>{data?.city.name}, {data?.city.country}</h1>
              <h1 className="text-center">{kelvinToCelsius(firstData?.main.temp ?? 0)}°</h1>
              <div>
                {/* {firstData?.weather[0]?.main} */}
                <p>{firstData?.weather[0]?.description}</p>
                <p>H: {kelvinToCelsius(firstData?.main.temp_max ?? 0)}  L: {kelvinToCelsius(firstData?.main.temp_min ?? 0)}</p>
              </div>
            </Container>
          </div>
          
          {/* 10-day */}
          <div className="flex flex-col bg-gray-800 rounded-2xl p-5">
            <p className="flex gap-2 items-center"> <Calendar className="w-5 h-5" /> 10 Day Forecast</p>
          </div>
        </section>

        {/* section for information 1 */}
        <section className="flex flex-col gap-2 w-full max-w-lg">
          {/* day for the day */}          
          <div className="bg-gray-800 rounded-2xl p-5 flex gap-2 overflow-x-auto w-full">
            {data?.list.map((d,i) => (
              <div key={i} className="flex items-center flex-col gap-2">
                <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), 'h:mm a') }</p>
                <WeatherIcon iconName={d.weather[0].icon}/>
                {/* <h1 className="text-center">{kelvinToCelsius(data?.list[d].main.temp)}°</h1> */}
                <h1 className="text-center">{kelvinToCelsius(d?.main.temp ?? 0)}°</h1>

              </div>
            ))}
          </div>
  {/* // const firstData = data?.list[0]; */}

        </section>

        {/* section for information 2 */}
        <section>

        </section>
        
      </main>
    </div>
  );
}