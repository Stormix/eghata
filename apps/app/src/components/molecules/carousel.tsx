import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from './card';

interface CarouselProps {
  title: string;
  items: Array<typeof Card>;
}

const Carousel = ({ title, items }: CarouselProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center font-medium">
        <h3>{title}</h3>
        <Link to="/help" className="underline opacity-75">
          {t('See all')}
        </Link>
      </div>

      <div className="flex gap-2 flex-nowrap overflow-x-auto">
        {items.map((Item, index) => (
          <Item key={index} className="flex-grow-0 flex-shrink-0 w-11/12" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
