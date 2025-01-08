import { CommandHandler as NestJsCommandHanlder } from '@nestjs/cqrs';
import { Command } from './command';

export const CommandHandler = (command: Command) => {
  return NestJsCommandHanlder(command);
};
