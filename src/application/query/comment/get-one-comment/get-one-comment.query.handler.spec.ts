import { GetOneCommentQuery } from './get-one-comment.query';
import { GetOneCommentQueryHandler } from './get-one-comment.query.handler';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentInterface, CommentModel } from '../../../../domain/model/ticket/comment.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('get one comment handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a comment success', async () => {
    const repository: CommentQueryRepositoryInterface = {
      findOne(uuid: string): Promise<CommentInterface> {
        const comment = new CommentModel();
        comment.uuid = UUID;
        return Promise.resolve(comment);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneCommentQuery(UUID);
    const handler = new GetOneCommentQueryHandler(repository, logger);
    const comment: CommentInterface = await handler.handle(query);
    expect(comment.uuid).toEqual(UUID);
  });

  it('return a comment error', async () => {
    const repository: CommentQueryRepositoryInterface = {
      findOne(uuid: string): Promise<CommentInterface> {
        const error: Error = new Error('Not found');
        return Promise.reject(error);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneCommentQuery(UUID);
    const handler = new GetOneCommentQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('GetOneCommentQueryHandler - Comment 31dd20e0-9a1d-4734-b0af-d9cc3aff4028 error: Not found');
    }
  });
});
