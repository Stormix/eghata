import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';
import { useInfiniteScroll } from 'ahooks';
import { getLoadMoreList } from '@/lib/getInfiniteScrollData';
import { useRef } from 'react';

const Help = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll((d) => getLoadMoreList(d?.nextId, 10), {
    target: ref,
    isNoMore: (d) => d?.nextId === undefined
  });

  return (
    <div className="flex flex-col justify-start w-full gap-4 pb-28 ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>

      <div ref={ref} className="flex flex-col gap-4 px-4">
        {loading ? <p>loading</p> : data?.list?.map((index) => <Card key={index} className="" />)}

        <div style={{ marginTop: 8 }}>
          {!noMore && (
            <button type="button" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading more...' : 'Click to load more'}
            </button>
          )}

          {noMore && <span>No more data</span>}
        </div>
      </div>
    </div>
  );
};

export default Help;
