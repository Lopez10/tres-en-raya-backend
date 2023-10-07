import { ID } from './valueObjects/ID.valueObject';

export interface Repository<T> {
  findById(id: ID | string): Promise<T | null>;
  create(entity: T): Promise<void>;
}
