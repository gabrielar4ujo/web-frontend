import { AdsEntity } from '../entities/ads.entity';
import { BaseModel } from './base.model';

export class AdsModel extends BaseModel<AdsEntity> {
  public readonly urlImagem: string;
  public readonly descricao: string;
  public readonly preco: number;

  constructor(entity: Partial<AdsEntity>) {
    super(entity);

    this.urlImagem = entity.urlImagem!;
    this.descricao = entity.descricao!;
    this.preco = entity.preco!;
  }

  static decoder(entity: Partial<AdsEntity>): AdsModel {
    return new AdsModel(entity);
  }
}
