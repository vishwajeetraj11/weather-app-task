import { Fragment } from "react";

type Props = {
  weatherType: string;
  iconCode: string;
};

const WeatherType = (props: Props) => {
  const { weatherType, iconCode } = props;
  return (
    <Fragment>
      <p className="font-semibold text-xl">{weatherType}</p>
      <img
        src={`http://openweathermap.org/img/w/${iconCode}.png`}
        alt="Weather Icon"
        className="w-[50px]"
      />
    </Fragment>
  );
};

export default WeatherType;
