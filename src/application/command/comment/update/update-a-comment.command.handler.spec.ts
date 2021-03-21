import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { UpdateACommentCommand } from './update-a-comment.command';
import { UpdateACommentCommandHandler } from './update-a-comment.command.handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { CommentCommandRepositoryMock } from '../../../../domain/repository/comment/mock/comment.command-repository.mock';
import { CommentQueryRepositoryMock } from '../../../../domain/repository/comment/mock/comment.query-repository.mock';
import { UpdateACommentCommandHandlerException } from './update-a-comment.command.handler.exception';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.command-repository.mock';

const UUID = 'e1844d91-0c55-433e-a907-db2f29de3303';
const STATUS = 2;
const UPDATED_BY = '31dd20e0-9a1d-4734-xxxx-d9cc3aff4028';
const CONTENT = 'N\'essaie pas! Fais-le ou ne le fais pas! Il n\'y a pas d\'essai.';

describe('update a comment handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: CommentCommandRepositoryInterface;
  let queryRepository: CommentQueryRepositoryInterface;
  let ticketCommandRepository: TicketCommandRepositoryInterface;

  beforeEach(() => {
    commandRepository = new CommentCommandRepositoryMock();
    queryRepository = new CommentQueryRepositoryMock();
    ticketCommandRepository = new TicketCommandRepositoryMock();
  })

  it ('update a comment success', async () => {
    const command = new UpdateACommentCommand(UUID, STATUS, UPDATED_BY, CONTENT);
    const handler = new UpdateACommentCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await handler.handle(command);
    const comment: CommentInterface = await queryRepository.findOne(UUID);
    expect(comment.uuid).toBe(UUID);
    expect(comment.status).toBe(STATUS);
    expect(comment.createdAt).toBeDefined();
    expect(comment.createdBy).toBeDefined();
    expect(comment.updatedAt).toBeDefined();
    expect(comment.updatedBy).toBe(UPDATED_BY);
    expect(comment.content).toEqual(CONTENT);
  });

  it('create a comment error', async () => {
    const command = new UpdateACommentCommand('', 2, '', '');
    const handler = new UpdateACommentCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(UpdateACommentCommandHandlerException);
  });
});
