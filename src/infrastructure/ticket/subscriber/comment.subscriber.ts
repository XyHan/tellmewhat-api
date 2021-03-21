import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { Inject } from '@nestjs/common';
import { TicketCommandRepositoryInterface } from '../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../repository/ticket/ticket.command-repository';

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<CommentEntity> {
  private readonly _ticketCommandRepository: TicketCommandRepositoryInterface;

  constructor(
    connection: Connection,
    @Inject(TicketCommandRepository) ticketCommandRepository: TicketCommandRepositoryInterface
  ) {
    connection.subscribers.push(this);
    this._ticketCommandRepository = ticketCommandRepository;
  }

  listenTo() {
    return CommentEntity;
  }

  async afterInsert(event: InsertEvent<CommentEntity>) {
    await this.updateParent(event);
  }

  async afterUpdate(event: InsertEvent<CommentEntity>) {
    await this.updateParent(event);
  }

  private async updateParent(event: InsertEvent<CommentEntity>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}
