import { EntityRepository, Repository } from 'typeorm';
import { TicketEntity } from '../../entity/ticket.entity';

@EntityRepository(TicketEntity)
export class TicketRepository extends Repository<TicketEntity> {}
