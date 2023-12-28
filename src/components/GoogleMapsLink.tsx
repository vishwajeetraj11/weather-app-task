type Props = {
  lat: number;
  lon: number;
};

const GoogleMapsLink = (props: Props) => {
  const { lat, lon } = props;
  return (
    <a
      href={`https://maps.google.com/?q=${lat},${lon}`}
      target="_blank"
      className="flex items-center ml-auto p-2"
    >
      <img
        alt="Google Maps Platform"
        src="https://developers.google.com/static/maps/images/maps-icon.svg"
        width={30}
        className="mr-2"
        loading="lazy"
      ></img>
      <span>Google Maps</span>
    </a>
  );
};

export default GoogleMapsLink;
