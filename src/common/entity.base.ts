import { ID } from './valueObjects/ID.valueObject';

export abstract class Entity<T> {
  protected readonly _id: ID;
  public readonly props: T;

  constructor(props: T, id?: ID) {
    this._id = id ? id : new ID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id === object._id;
  }

  public getPropsCopy(): Readonly<{ id: ID } & T> {
    const propsCopy = {
      id: this._id,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  public abstract toPrimitives(): any;
}
