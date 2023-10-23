import { ReactComponent as DirectionIcon } from '@/assets/icons/directions.svg';
import BackButton from '@/components/atoms/back-button';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import LocationMap from '@/components/molecules/location-map';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import api from '@/lib/api';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import { capitalize } from 'lodash';

export type DataProps = {
  id: number;
  longitude: string;
  latitude: string;
  address: string;
  description: string;
  source: string;
  status: string;
  name: string;
  phone: string;
  email: string;
  is_on_site: boolean;
  created_at: string;
  updated_at: string;
  files: string[];
};

const Detail = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  const [data, setData] = useState<DataProps>();

  useEffect(() => {
    switch (type) {
      case 'offer':
        api
          .getHelpOffer(id!)
          .then((response) => setData(response))
          .catch((err) => console.log(err));
        console.log(data);
        break;
      case 'request':
        api
          .getHelpRequest(id!)
          .then((response) => {
            setData(response);
          })
          .catch((err) => console.log(err));
        break;
      case 'ride-request' || 'ride-offer':
        api
          .getCarpoolingRequest(id!)
          .then((response) => setData(response))
          .catch((err) => console.log(err));
        break;
    }
  }, []);
  console.log(data);
  if (!data) return <LoadingSpinner />;
  return (
    <div className="pb-6 overflow-y-auto">
      <BackButton className="absolute z-10 top-10 left-4" />
      {/* TODO multiple images */}
      <img src="http://localhost:3333/uploads/IMG-3769.jpg" className=" h-[40vh] object-cover w-full" />
      <div className="flex flex-col gap-2 p-6 flex-grow mb-24">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-medium">
            {t('Detail')} {t(type)} {id}
          </h1>
          <span>
            <Badge variant={'destructive'}>{t(data!.status)}</Badge>
          </span>
        </div>
        <div className="flex justify-between">
          <p>
            {t(capitalize(data!.address))}, {t('Yes')}
          </p>
          <span className="text-gray-500 text-sm">
            {/* {data.updated_at}*/} {t('hours')} {t('ago')}
          </span>
        </div>
        <h3 className="text-gray-500 mt-2">{t('Description')}</h3>
        <p className="text-justify">{t(data!.description)}</p>

        <h3 className="text-gray-500 my-2">{t('Contact Info')}</h3>

        <div className="flex flex-col gap-4 font-medium">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            <a
              href={`tel:${data!.phone}`}
              className="flex-grow underline underline-offset-4 decoration-dotted decoration-red-200"
            >
              {data!.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <a
              href={`mailto:${data!.email}`}
              className="flex-grow underline underline-offset-4 decoration-dotted decoration-red-200"
            >
              {data!.email}
            </a>
          </div>
        </div>

        <h3 className="text-gray-500 my-2">{t('Location')}</h3>

        <LocationMap location={[parseFloat(data!.latitude), parseFloat(data!.longitude)]} />
      </div>

      <div className="fixed left-0 bottom-0 z-30 w-full px-6 pt-4 pb-8 -ml-6 rtl:-mr-6 rtl:ml-0 bg-white">
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
