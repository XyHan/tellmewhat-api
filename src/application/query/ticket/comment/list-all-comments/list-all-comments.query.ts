import { QueryInterface } from '../../../query.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';

export class ListAllCommentsQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _size: number;
  private readonly _offsetStart: number;
  private readonly _sources: string[];
  private readonly _filters: Map<string, string | TicketInterface>;

  constructor(size: number, offsetStart: number, sources: string[], filters: Map<string, string | TicketInterface>) {
    this._size = size;
    this._offsetStart = offsetStart;
    this._sources = sources;
    this._filters = filters;
    this._name = 'list-all-comments-query';
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

  get sources(): string[] {
    return this._sources;
  }

  get filters(): Map<string, string | TicketInterface> {
    return this._filters;
  }
}
