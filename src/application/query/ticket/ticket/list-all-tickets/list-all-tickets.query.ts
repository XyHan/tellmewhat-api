import { QueryInterface } from '../../../query.interface';

export class ListAllTicketsQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _size: number;
  private readonly _offsetStart: number;
  private readonly _source: string[];

  constructor(size: number, offsetStart: number, source?: string[]) {
    this._size = size;
    this._offsetStart = offsetStart;
    this._source = source;
    this._name = 'list-all-tickets-query';
    this._version = 1.0;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get size(): number {
    return this._size;
  }

  get offsetStart(): number {
    return this._offsetStart;
  }

  get source(): string[] {
    return this._source;
  }
}
