import { HasId } from '../entities/base.entity';
import { AdvertiserEntity } from './advertiser.entity';
import { DateEntity } from './date.entity';

export interface AdsEntity extends HasId {
  urlImagem: string;
  descricao: string;
  titulo: string;
  preco: number;
  dataInicio: DateEntity;
  anunciante: AdvertiserEntity;
}
