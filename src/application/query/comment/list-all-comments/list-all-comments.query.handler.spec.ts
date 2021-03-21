import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentInterface, CommentModel } from '../../../../domain/model/ticket/comment.model';
import { ListAllCommentsQuery } from './list-all-comments.query';
import { ListAllCommentsQueryHandler } from './list-all-comments.query.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('list all comments handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a comment success', async () => {
    const repository: CommentQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[CommentInterface[], number]> {
        const comment = new CommentModel();
        comment.uuid = UUID;
        return Promise.resolve([[comment], 1]);
      },
    };
    const query = new ListAllCommentsQuery(10, 0);
    const handler = new ListAllCommentsQueryHandler(repository, logger);
    const comments: [CommentInterface[], number] = await handler.handle(query);
    expect(comments[0].length).toEqual(1);
    expect(comments[0][0].uuid).toEqual(UUID);
  });

  it('list all comments error', async () => {
    const repository: CommentQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[CommentInterface[], number]> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
    };
    const query = new ListAllCommentsQuery(10, 0);
    const handler = new ListAllCommentsQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('ListAllCommentsQueryHandler - error: Repository error');
    }
  });
});
