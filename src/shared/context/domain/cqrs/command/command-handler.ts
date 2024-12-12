import { ICommandHandler as NestJsICommandHandler } from '@nestjs/cqrs';
import { Command } from './command';

export interface ICommandHandler<T extends Command>
  extends NestJsICommandHandler<T> {}
