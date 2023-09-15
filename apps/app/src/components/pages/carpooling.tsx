import CarpoolingCard from '../molecules/carpooling-card';
import TransportInput from '../molecules/transport-input';

const Carpooling = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-start py-4 px-4">
      <TransportInput />

      <div className="bg-gray-100 text-teal-500 text-center font-medium  px-4 py-2">{'12 September 2023'}</div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <CarpoolingCard key={index} className="" />
        ))}
      </div>
    </div>
  );
};

export default Carpooling;
