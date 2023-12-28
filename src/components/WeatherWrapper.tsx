import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WeatherDisplay from "./WeatherDisplay";
import { useWeather } from "@/hooks/useWeather";
import Header from "./Header";
import Temperature from "./Temperature";

const Weather = () => {
  const {
    data,
    error,
    loading,
    onSubmit,
    city,
    setCity,
    showEmptyState,
    history,
    // setData,
  } = useWeather();

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
    <div className="flex flex-col min-h-screen">
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
                onSubmit(city);
              }
            }}
          />
          <Button
            onClick={() => onSubmit(city)}
            disabled={loading}
            className="w-48 mt-4 sm:mt-0"
          >
            Submit
          </Button>
        </div>
        {render()}
      </div>
      <div className="mt-auto">
        <p className="text-left">Previous Results</p>
        <div className="py-4 flex flex-col sm:flex-row flex-wrap gap-4">
          {history.reverse().map((item) => (
            <button
              onClick={() => {
                onSubmit(item.name.toLowerCase());
                setCity(item.name.toLocaleLowerCase());
              }}
              className="shadow-light px-3 py-2"
              key={item.id}
            >
              <p className="text-2xl text-left">{item.name}</p>
              <div className="flex flex-col items-center justify-center">
                <Temperature
                  feelsLike={item.main.feels_like}
                  temp={item.main.temp}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
