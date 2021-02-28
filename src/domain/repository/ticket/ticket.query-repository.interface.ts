import { TicketInterface } from '../../model/ticket.model';
import { findAllOptions } from '../find-all-options.type';

export interface TicketQueryRepositoryInterface {
  findOne(uuid: string): Promise<TicketInterface | null>;
  findAll(options: findAllOptions): Promise<[TicketInterface[], number]>;
}
