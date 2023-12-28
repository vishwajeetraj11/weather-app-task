type Props = {
  temp: number;
  feelsLike: number;
};

const Temperature = (props: Props) => {
  const { feelsLike, temp } = props;
  return (
    <p className="my-2 inline-flex items-center">
      {temp}° C{" "}
      <span className="ml-2 text-xs rounded-full border-gray-300 border px-3 py-1.5">
        feels like {feelsLike} ° C{" "}
      </span>
    </p>
  );
};

export default Temperature;
