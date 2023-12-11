import { AdsEntity } from '../entities/ads.entity';
import { BaseModel } from './base.model';

export class AdsModel extends BaseModel<AdsEntity> {
  public readonly urlImagem: string;
  public readonly descricao: string;
  public readonly titulo: string;
  public readonly data: string;
  public readonly preco: number;
  public readonly anunciante: string;

  constructor(entity: Partial<AdsEntity>) {
    super(entity);

    this.urlImagem = entity.urlImagem!;
    this.descricao = entity.descricao!;
    this.preco = entity.preco!;
    this.titulo = entity.titulo!;
    this.data = `${entity.dataInicio?.dayOfMonth}/${entity.dataInicio?.month}/${entity.dataInicio?.year}`;
    this.anunciante = entity.anunciante?.nome!;
  }

  static decoder(entity: Partial<AdsEntity>): AdsModel {
    return new AdsModel(entity);
  }
}
