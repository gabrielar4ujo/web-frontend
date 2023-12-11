import { HasId } from '../entities/base.entity';

export interface SelfEntity extends HasId {
  email: string;
  nome: string;
  admin: boolean;
}
