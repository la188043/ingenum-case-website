import Task from './Task.model';

export interface Section {
  id?: string;
  name: string;
  tasks: Task[];
}
