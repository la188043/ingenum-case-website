export interface Task {
  id?: string;
  name: string;
  dueDate: Date;
  description: string;
  tableId: string;
}

export default Task;
