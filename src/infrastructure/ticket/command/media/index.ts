import { CreateAMediaCommandHandlerAdapter } from './create-a-media.command.handler.adapter';
import { DeleteAMediaCommandHandlerAdapter } from './delete-a-media.command.handler.adapter';

export const MediaCommandHandlers = [
  CreateAMediaCommandHandlerAdapter,
  DeleteAMediaCommandHandlerAdapter
];
