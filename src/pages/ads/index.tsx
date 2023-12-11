import { useEffect, useState } from 'react';
import CarCard from '../../components/car_card';
import { useAdsRepository } from '../../repositories/ads.repository';
import './index.css';
import { AdsModel } from '../../domain/models/ads.model';
import toast from 'react-hot-toast';

const AdsPage = () => {
  const [ads, setAds] = useState<Array<AdsModel>>();
  const { listAds } = useAdsRepository();

  useEffect(() => {
    listAds()
      .then((res) => setAds(res!))
      .catch(() => toast.error('Ocorreu algum erro ao listar anúncios'));
  }, []);

  return (
    <div className="car-list-container">
      <h1>Car List</h1>
      <div className="car-list-box ">
        <div className="car-list">
          {ads &&
            ads.map((carInfo, index) => (
              <CarCard key={index} carInfo={carInfo} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
