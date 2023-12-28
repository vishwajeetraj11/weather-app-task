type Props = {
  temp: number;
  feelsLike: number;
};

const Temperature = (props: Props) => {
  const { feelsLike, temp } = props;
  return (
    <div className="flex flex-col items-center flex-wrap">
      <p className="my-2 text-4xl py-3 inline-flex items-center text-center">
        {temp}° C{" "}
      </p>
      <span className="mb-4 text-center text-xs rounded-full border-gray-300 border px-3 py-1.5">
        feels like {feelsLike} ° C{" "}
      </span>
    </div>
  );
};

export default Temperature;
