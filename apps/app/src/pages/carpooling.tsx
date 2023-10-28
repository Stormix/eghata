import { Calendar } from '@/components/atoms/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { format } from 'date-fns';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CarpoolingCard from '../components/molecules/carpooling-card';
import TransportInput from '../components/molecules/transport-input';
import LoadingSpinner from '@/components/atoms/loading-spinner';

const MAX = 60;

const Carpooling = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState<Date>(new Date());

  const [data, setData] = useState<number[]>([]);
  const [SubList, setSubList] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = () => {
    if (hasMore) {
      const startIndex = data.length;
      setData((prev) => [...prev, ...Array.from({ length: 20 }, (_, i) => startIndex + i + 1)]);
      if (data.length >= MAX - 20) {
        setHasMore(false);
      }
    }
  };

  const handleRefresh = async () => {
    setData([]); // clear items
    setHasMore(true); // set hasMore back to true

    // fetch initial data
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [SubList, hasMore]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSubList((prevSubList) => prevSubList + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-start py-4 px-4">
      <TransportInput
        value={{
          start: {
            address: '',
            lat: 0,
            lng: 0
          },
          end: {
            address: '',
            lat: 0,
            lng: 0
          }
        }}
        onChange={(value) => console.log(value)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-gray-100 text-teal-500 text-center font-medium  px-4 py-1 rounded-md">
            {date ? format(date, 'PPP') : <span>{t('Pick a date')}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date: Date | undefined) => setDate(date ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <PullToRefresh
        isPullable={true}
        canFetchMore={false}
        onRefresh={handleRefresh}
        pullDownThreshold={70}
        maxPullDownDistance={70}
        resistance={4}
        refreshingContent={
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner className="w-12 h-12" />
          </div>
        }
        pullingContent={
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner className="w-12 h-12" />
          </div>
        }
      >
        <ul className="flex flex-col gap-4">
          {data.map((_, index) => (
            <li className="list-none m-0 p-0" key={index} ref={index === data.length - 1 ? lastItemRef : null}>
              <CarpoolingCard key={index} className="" />
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
};

export default Carpooling;
