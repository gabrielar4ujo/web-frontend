import { HasId } from '../entities/base.entity';

export interface AdsEntity extends HasId {
  urlImagem: string;
  descricao: string;
  preco: number;
}
