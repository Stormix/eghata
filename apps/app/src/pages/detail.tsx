import { ReactComponent as DirectionIcon } from '@/assets/icons/directions.svg';
import BackButton from '@/components/atoms/back-button';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import LocationMap from '@/components/molecules/location-map';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

const Detail = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  return (
    <div className="pb-6 overflow-y-auto">
      <BackButton className="absolute z-10 top-10 left-4" />
      <img src="https://maeq-tracker.rocmine.net/assets/earth.webp" className=" h-[40vh] object-cover w-full" />
      <div className="flex flex-col gap-2 p-6 flex-grow mb-24">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-medium">
            {t('Detail')} {t(type)} {id}
          </h1>
          <span>
            <Badge variant={'destructive'}>{t('Requested')}</Badge>
          </span>
        </div>
        <div className="flex justify-between">
          <p>
            {t('Marrakech')}, {t('Yes')}
          </p>
          <span className="text-gray-500 text-sm">
            10 {t('hours')} {t('ago')}
          </span>
        </div>
        <h3 className="text-gray-500 mt-2">{t('Description')}</h3>
        <p className="text-justify">
          {t(`English 2/20: Hello, I am in need of warm clothing for the upcoming winter season. I'm a single mother with
          two young children, and we've been struggling to stay warm. If anyone can help us with winter coats,
          gloves, and scarves, we would be incredibly grateful. Your support means the world to us`)}
        </p>

        <h3 className="text-gray-500 my-2">{t('Contact Info')}</h3>

        <div className="flex flex-col gap-4 font-medium">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            <a
              href="tel:+212666666666"
              className="flex-grow underline underline-offset-4 decoration-dotted decoration-red-200"
            >
              +212 6 66 66 66 66
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <a
              href="mailto:test@stormix.co"
              className="flex-grow underline underline-offset-4 decoration-dotted decoration-red-200"
            >
              test@stormix.co
            </a>
          </div>
        </div>

        <h3 className="text-gray-500 my-2">{t('Location')}</h3>

        <LocationMap />
      </div>

      <div className="fixed left-0 bottom-0 z-30 w-full px-6 pt-4 pb-8 bg-white">
        <div className="flex gap-4">
          <Button variant="primary" className="w-full">
            {t('Offer assistance')}
          </Button>
          <Button variant="primary">
            <DirectionIcon />
          </Button>
        </div>
        <Button variant="outline" className="w-full mt-4">
          {t('Report')}
        </Button>
      </div>
    </div>
  );
};

export default Detail;
