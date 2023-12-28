import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WeatherDisplay from "./WeatherDisplay";
import { useWeather } from "@/hooks/useWeather";
import Header from "./Header";

const Weather = () => {
  const { data, error, loading, onSubmit, city, setCity, showEmptyState } =
    useWeather();

  const render = () => {
    if (showEmptyState) {
      return (
        <p className="mt-20 font-normal sm:text-2xl text-lg">
          Please enter city name to search for weather
        </p>
      );
    } else if (loading) {
      return <span className="loader mt-20"></span>;
    } else if (error) {
      return (
        <div className="mt-20">
          <p>{error.message}</p>
        </div>
      );
    } else if (data) {
      return <WeatherDisplay data={data} />;
    } else return null;
  };

  return (
    <div>
      <Header />
      <div className="flex items-center flex-wrap sm:flex-nowrap sm:gap-10">
        <Input
          className="w-full"
          value={city}
          disabled={loading}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onSubmit();
            }
          }}
        />
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="w-48 mt-4 sm:mt-0"
        >
          Submit
        </Button>
      </div>
      {render()}
    </div>
  );
};

export default Weather;
