import { Command } from './command';

export class CommandNotRegisteteredException extends Error {
  constructor(command: Command) {
    super(
      `This command ${command.constructor.name} hasn't a command hanlder associated`,
    );
  }
}
