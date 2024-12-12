import { CommandBus as NestJsCommandBus } from '@nestjs/cqrs';

export interface CommandBus extends NestJsCommandBus {}
