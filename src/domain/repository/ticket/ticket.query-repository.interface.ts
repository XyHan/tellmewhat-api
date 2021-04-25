import { TicketInterface } from '../../model/ticket/ticket.model';
import { findAllOptions } from '../find-all-options.type';

export interface TicketQueryRepositoryInterface {
  findOne(uuid: string, sources: any[]): Promise<TicketInterface | null>;
  findAll(options: findAllOptions): Promise<[TicketInterface[], number]>;
}
