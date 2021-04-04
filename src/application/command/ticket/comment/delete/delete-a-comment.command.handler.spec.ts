import { CommentInterface } from '../../../../../domain/model/ticket/comment.model';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';
import { DeleteACommentCommand } from './delete-a-comment.command';
import { DeleteACommentCommandHandler } from './delete-a-comment.command.handler';
import { LoggerMock } from '../../../../../domain/utils/logger/logger.mock';
import { CommentCommandRepositoryMock } from '../../../../../domain/repository/comment/mock/comment.command-repository.mock';
import { CommentQueryRepositoryMock } from '../../../../../domain/repository/comment/mock/comment.query-repository.mock';
import { DeleteACommentCommandHandlerException } from './delete-a-comment.command.handler.exception';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepositoryMock } from '../../../../../domain/repository/ticket/mock/ticket.command-repository.mock';

const UUID = '204df646-3b8a-450b-b15c-fab854149136';
const UPDATEDBY = 'fa9f9d7d-3303-4b08-ad27-61bd605c9d19';

describe('delete a comment handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: CommentCommandRepositoryInterface;
  let queryRepository: CommentQueryRepositoryInterface;
  let ticketCommandRepository: TicketCommandRepositoryInterface;

  beforeEach(() => {
    commandRepository = new CommentCommandRepositoryMock();
    queryRepository = new CommentQueryRepositoryMock();
    ticketCommandRepository = new TicketCommandRepositoryMock();
  })

  it ('delete a comment success', async () => {
    const command = new DeleteACommentCommand(UUID, UPDATEDBY);
    const handler = new DeleteACommentCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await handler.handle(command);
    const comment: CommentInterface | null = await queryRepository.findOne(UUID);
    expect(comment.status).toBe(0);
    expect(comment.updatedBy).toBe(UPDATEDBY);
  });

  it('delete a comment error', async () => {
    const command = new DeleteACommentCommand('', '');
    const handler = new DeleteACommentCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(DeleteACommentCommandHandlerException);
  });
});
