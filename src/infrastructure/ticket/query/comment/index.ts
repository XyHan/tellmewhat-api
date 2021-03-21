import { GetOneCommentQueryHandlerAdapter } from './get-one-comment.query.handler.adapter';
import { ListAllCommentsQueryHandlerAdapter } from './list-all-comments.query.handler.adapter';

export const CommentQueryHandlers = [
  GetOneCommentQueryHandlerAdapter,
  ListAllCommentsQueryHandlerAdapter
];
