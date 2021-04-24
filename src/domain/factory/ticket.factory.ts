import { TicketInterface } from '../model/ticket/ticket.model';

export interface TicketFactoryInterface {
  generate(
    uuid: string,
    status: number,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
    subject: string,
    description: string | null,
    type: string,
    project: string,
  ): TicketInterface;
}

export class TicketFactory implements TicketFactoryInterface {
  private readonly _instance: TicketInterface;

  constructor(instance: TicketInterface) {
    this._instance = instance;
  }

  public generate(
    uuid: string,
    status: number,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
    subject: string,
    description: string | null,
    type: string,
    project: string,
  ): TicketInterface {
    this._instance.uuid = uuid;
    this._instance.status = status;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.updatedAt = updatedAt;
    this._instance.updatedBy = updatedBy;
    this._instance.subject = subject;
    this._instance.description = description;
    this._instance.type = type;
    this._instance.project = project;

    return this._instance;
  }
}
