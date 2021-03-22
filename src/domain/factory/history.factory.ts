import { HistoryInterface } from '../model/ticket/history.model';
import { TicketInterface } from '../model/ticket/ticket.model';

export interface HistoryFactoryInterface {
  generate(
    ticket: TicketInterface,
    type: number,
    typeUuid: string | null,
    description: string | null,
    createdBy: string,
    createdAt: Date,
  ): HistoryInterface;
}

export class HistoryFactory implements HistoryFactoryInterface {
  private readonly _instance: HistoryInterface;

  constructor(instance: HistoryInterface) {
    this._instance = instance;
  }

  public generate(
    ticket: TicketInterface,
    type: number,
    typeUuid: string | null,
    description: string | null,
    createdBy: string,
    createdAt: Date,
  ): HistoryInterface {
    this._instance.type = type;
    this._instance.typeUuid = typeUuid;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.description = description;
    this._instance.ticket = ticket;

    return this._instance;
  }
}
