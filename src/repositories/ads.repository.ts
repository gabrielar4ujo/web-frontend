import axios from 'axios';
import { AdsModel } from '../domain/models/ads.model';
import { AdsEntity } from '../domain/entities/ads.entity';

interface ICreateAds {
  urlImagem: string;
  preco: string;
  descricao: string;
  titulo: string;
}

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

  async function createAds({
    descricao,
    preco,
    titulo,
    urlImagem,
  }: ICreateAds): Promise<any> {
    return await axios.post('/anuncio', {
      descricao,
      preco,
      titulo,
      urlImagem,
    });
  }

  return { listAds, createAds };
};

export { useAdsRepository };
