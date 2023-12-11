import { SelfEntity } from '../entities/self.entity';
import { BaseModel } from './base.model';

export class SelfModel extends BaseModel<SelfEntity> {
  public readonly email: string;
  public readonly nome: string;
  public readonly admin: boolean;

  constructor(entity: Partial<SelfEntity>) {
    super(entity);

    this.email = entity.email!;
    this.nome = entity.nome!;
    this.admin = entity.admin!;
  }

  static decoder(entity: Partial<SelfEntity>): SelfModel {
    return new SelfModel(entity);
  }
}
