import { TicketInterface, TicketModel } from './ticket.model';

export interface HistoryInterface {
  ticket: TicketInterface;
  type: number;
  typeUuid: string | null;
  description: string | null;
  createdBy: string;
  createdAt: Date;
}

export class HistoryModel implements HistoryInterface {
  protected _ticket: TicketModel;
  protected _type: number;
  protected _typeUuid: string | null;
  protected _description: string | null;
  protected _createdBy: string;
  protected _createdAt: Date;

  get ticket(): TicketModel {
    return this._ticket;
  }

  set ticket(value: TicketModel) {
    this._ticket = value;
  }

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }

  get typeUuid(): string | null {
    return this._typeUuid;
  }

  set typeUuid(value: string | null) {
    this._typeUuid = value;
  }

  get description(): string | null {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }
}
