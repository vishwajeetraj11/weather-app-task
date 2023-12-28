import { APIResponse } from "@/shared/types";
import GoogleMapsLink from "./GoogleMapsLink";
import Temperature from "./Temperature";
import WeatherType from "./WeatherType";
import StatCard from "./StatCard";

type Props = {
  data: APIResponse;
};

const WeatherDisplay = (props: Props) => {
  const { data } = props;
  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <GoogleMapsLink lat={data.coord.lat} lon={data.coord.lon} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl">{data.name}</p>
        <Temperature feelsLike={data.main.feels_like} temp={data.main.temp} />
        <WeatherType
          iconCode={data.weather[0].icon}
          weatherType={data.weather[0].main}
        />
        <div className="flex items-center justify-between w-full max-w-[300px]">
          <StatCard title="Wind Speed" unit="km/h" stat={data.wind.speed} />
          <StatCard title="Humidity" unit="%" stat={data.main.humidity} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
