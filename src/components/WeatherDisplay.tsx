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
  const date = new Date();

  function getFormattedDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  // Example: Get the formatted date for today
  const formattedDate = getFormattedDate(date);

  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <GoogleMapsLink lat={data.coord.lat} lon={data.coord.lon} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl">{data.name}</p>
        <p className="px-4 py-2 text-white bg-black rounded-full text-xs">
          {formattedDate}
        </p>
        <Temperature feelsLike={data.main.feels_like} temp={data.main.temp} />
        <WeatherType
          iconCode={data.weather[0].icon}
          weatherType={data.weather[0].main}
        />
        <div className="flex items-center justify-center w-full gap-4 flex-wrap">
          <StatCard
            type="wind"
            title="Wind Speed"
            unit="km/h"
            stat={data.wind.speed}
          />
          <StatCard
            type="humidity"
            title="Humidity"
            unit="%"
            stat={data.main.humidity}
          />
          <StatCard
            type="visibility"
            title="Visibility"
            unit="km"
            stat={data.visibility}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
