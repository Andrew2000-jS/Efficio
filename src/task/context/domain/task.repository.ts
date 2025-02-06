import { Criteria } from '@shared/context';
import { TaskPrimitives, TaskPrimitivesWithoutMetadata } from './task.entity';

export abstract class TaskRepository {
  abstract create(task: TaskPrimitivesWithoutMetadata): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    task: Partial<TaskPrimitivesWithoutMetadata>,
  ): Promise<void>;
  abstract match(criteria: Criteria): Promise<TaskPrimitives[]>;
}
