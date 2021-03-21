import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CreateACommentCommand } from './create-a-comment.command';
import { CreateACommentCommandHandler } from './create-a-comment.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { CommentCommandRepositoryMock } from '../../../../domain/repository/comment/mock/comment.command-repository.mock';
import { CommentQueryRepositoryMock } from '../../../../domain/repository/comment/mock/comment.query-repository.mock';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { CreateACommentCommandHandlerException } from './create-a-comment.command.handler.exception';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const CONTENT = 'N\'essaie pas! Fais-le ou ne le fais pas! Il n\'y a pas d\'essai.';
const CREATEDBY = '08ee082c-be8c-4a50-8533-83c7e774cbff';

describe('create a comment handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: CommentCommandRepositoryInterface;
  let queryRepository: CommentQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new CommentCommandRepositoryMock();
    queryRepository = new CommentQueryRepositoryMock();
  })

  it ('create a comment success', async () => {
    const command = new CreateACommentCommand(UUID, CONTENT, CREATEDBY);
    const handler = new CreateACommentCommandHandler(commandRepository, logger);
    await handler.handle(command);
    const comment: CommentInterface | null = await queryRepository.findOne(UUID);
    expect(comment.uuid).toBe(UUID);
    expect(comment.status).toBe(1);
    expect(comment.createdAt).toBeDefined();
    expect(comment.createdBy).toBe(CREATEDBY);
    expect(comment.updatedAt).toBeDefined();
    expect(comment.updatedBy).toBe(CREATEDBY);
    expect(comment.content).toEqual(CONTENT);
  });

  it('create a comment error', async () => {
    const command = new CreateACommentCommand('', '', '');
    const handler = new CreateACommentCommandHandler(commandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(CreateACommentCommandHandlerException);
  });
});
