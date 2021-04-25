import { QueryInterface } from '../../../query.interface';

export class ListAllTicketsQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _size: number;
  private readonly _page: number;
  private readonly _sources: string[];
  private readonly _sort: string;

  constructor(size: number, offsetStart: number, sources: string[], sort: string) {
    this._size = size;
    this._page = offsetStart;
    this._sources = sources;
    this._sort = sort;
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

  get page(): number {
    return this._page;
  }

  get sources(): string[] {
    return this._sources;
  }

  get sort(): string {
    return this._sort;
  }
}
