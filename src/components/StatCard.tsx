type Props = {
  title: string;
  stat: number;
  unit: string;
};

const StatCard = (props: Props) => {
  const { title, stat, unit } = props;
  return (
    <div className="flex items-start flex-col gap-2 shadow-light px-3 py-2 rounded-sm">
      <p>{title}</p>
      <p>
        {stat} {unit}
      </p>
    </div>
  );
};

export default StatCard;
