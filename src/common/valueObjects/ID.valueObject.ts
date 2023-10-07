import { ObjectId } from 'mongodb';
import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class ID extends ValueObject<string> {
  constructor(value?: string) {
    super(value ? { value } : { value: new ObjectId().toHexString() });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({ value: id }: DomainPrimitive<string>): void {
    if (id === undefined || id === null || id === '') {
      throw new Error(`Incorrect ID format "${id}"`);
    }
  }
}
