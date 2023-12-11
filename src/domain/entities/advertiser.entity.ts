import { HasId } from '../entities/base.entity';

export interface AdvertiserEntity extends HasId {
  admin: boolean;
  email: string;
  nome: string;
}
