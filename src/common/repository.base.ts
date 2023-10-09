export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<T>;
}
