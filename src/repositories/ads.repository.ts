import axios from 'axios';
import { AdsModel } from '../domain/models/ads.model';
import { AdsEntity } from '../domain/entities/ads.entity';

const useAdsRepository = () => {
  async function listAds(): Promise<Array<AdsModel> | null> {
    const res = await axios.get('/anuncio');

    if (res.data) {
      return (res.data as []).map((item: AdsEntity) =>
        AdsModel.decoder({ ...item })
      );
    }

    return null;
  }
  return { listAds };
};

export { useAdsRepository };
