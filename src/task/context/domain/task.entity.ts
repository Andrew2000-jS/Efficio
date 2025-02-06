import { AggregateRoot, CreatedAt, UpdatedAt } from '@shared/context';
import {
  TaskAssignedTo,
  TaskComments,
  TaskDescription,
  TaskEndDate,
  TaskId,
  TaskPriority,
  TaskProgress,
  TaskStartDate,
  TaskStatus,
  TaskTitle,
} from './value-object';

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface TaskPrimitives {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  status: Status;
  priority: Priority;
  assignedTo: Record<string, any> | null;
  comments: string | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskPrimitivesWithoutMetadata = Omit<
  TaskPrimitives,
  'id' | 'createdAt' | 'updatedAt'
>;

export class Task extends AggregateRoot {
  constructor(
    private readonly id: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly progress: TaskProgress,
    private readonly status: TaskStatus,
    private readonly priority: TaskPriority,
    private readonly assignedTo: TaskAssignedTo,
    private readonly comments: TaskComments,
    private readonly startDate: TaskStartDate,
    private readonly endDate: TaskEndDate,
    private readonly createdAt: CreatedAt,
    private readonly updatedAt: UpdatedAt,
  ) {
    super();
  }

  static create(data: TaskPrimitivesWithoutMetadata): Task {
    const task = new Task(
      TaskId.generate(),
      new TaskTitle(data.title),
      new TaskDescription(data.description),
      new TaskProgress(data.progress),
      new TaskStatus(data.status, [
        Status.PENDING,
        Status.IN_PROGRESS,
        Status.COMPLETED,
        Status.ON_HOLD,
        Status.CANCELLED,
      ]),
      new TaskPriority(data.priority, [
        Priority.HIGH,
        Priority.MEDIUM,
        Priority.LOW,
      ]),
      new TaskAssignedTo(data.assignedTo),
      new TaskComments(data.comments),
      new TaskStartDate(data.startDate),
      new TaskEndDate(data.endDate),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    return task;
  }

  static fromPrimitives(plainData: TaskPrimitives): Task {
    return new Task(
      new TaskId(plainData.id),
      new TaskTitle(plainData.title),
      new TaskDescription(plainData.description),
      new TaskProgress(plainData.progress),
      new TaskStatus(plainData.status, [
        Status.PENDING,
        Status.IN_PROGRESS,
        Status.COMPLETED,
        Status.ON_HOLD,
        Status.CANCELLED,
      ]),
      new TaskPriority(plainData.priority, [
        Priority.HIGH,
        Priority.MEDIUM,
        Priority.LOW,
      ]),
      new TaskAssignedTo(plainData.assignedTo),
      new TaskComments(plainData.comments),
      new TaskStartDate(plainData.startDate),
      new TaskEndDate(plainData.endDate),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): TaskPrimitives {
    return {
      id: this.id.getValue(),
      title: this.title.getValue(),
      description: this.description.getValue(),
      progress: this.progress.getValue(),
      status: this.status.value,
      priority: this.priority.value,
      assignedTo: this.assignedTo.getValue(),
      comments: this.comments.getValue(),
      startDate: this.startDate.getValue(),
      endDate: this.endDate.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
}
