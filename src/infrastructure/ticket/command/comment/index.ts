import { CreateACommentCommandHandlerAdapter } from './create-a-comment.command.handler.adapter';
import { UpdateACommentCommandHandlerAdapter } from './update-a-comment.command.handler.adapter';
import { DeleteACommentCommandHandlerAdapter } from './delete-a-comment.command.handler.adapter';

export const CommentCommandHandlers = [
  CreateACommentCommandHandlerAdapter,
  UpdateACommentCommandHandlerAdapter,
  DeleteACommentCommandHandlerAdapter
];
