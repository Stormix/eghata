import { ReactComponent as Seat } from '../../assets/icons/seat.svg';
interface CapacityIndicatorProps {
  capacity: number;
  maxCapacity: number;
}

const CapacityIndicator = ({ capacity, maxCapacity }: CapacityIndicatorProps) => {
  return (
    <div className="flex">
      {[...Array(maxCapacity)].map((_, index) => (
        <Seat key={index} className={`w-4 h-4 rounded-full ${index < capacity ? 'text-teal-500' : 'text-gray-400'}`} />
      ))}
    </div>
  );
};

export default CapacityIndicator;
