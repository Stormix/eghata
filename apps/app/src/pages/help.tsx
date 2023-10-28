import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PullToRefresh from 'react-simple-pull-to-refresh';
import LoadingSpinner from '../components/atoms/loading-spinner';
import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
const MAX = 60;

const Help = () => {
  const { t } = useTranslation();

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
    <div className="flex flex-col justify-start w-full gap-4 pb-28 ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>
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
        <ul className="flex flex-col gap-4 px-4">
          {data.map((_, index) => (
            <li className="list-none m-0 p-0" key={index} ref={index === data.length - 1 ? lastItemRef : null}>
              <Card key={index} className="" />
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
};

export default Help;
