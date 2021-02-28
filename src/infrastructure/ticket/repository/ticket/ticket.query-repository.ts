import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketRepository } from './ticket.repository';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { TicketRepositoryException } from './ticket.repository.exception';

export class TicketQueryRepository implements TicketQueryRepositoryInterface {
  constructor(private readonly ticketRepository: TicketRepository) {}

  public async findAll(): Promise<TicketInterface[]> {
    try {
      return await this.ticketRepository.find({ take: 10 });
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findAll tickets`);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface> {
    try {
      return await this.ticketRepository.findOneOrFail({ uuid });
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findOneOrNull ticket '${uuid}'`);
    }
  }
}
