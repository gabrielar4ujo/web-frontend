import { HasId } from '../entities/base.entity';

export abstract class BaseModel<Entity extends HasId = HasId> implements HasId {
  get id(): number {
    return this.entity.id!;
  }
  get displayName(): string {
    return this.id.toString();
  }

  public readonly entity: Partial<Entity>;

  protected constructor(entity: Partial<Entity>) {
    this.entity = entity;
  }
}
