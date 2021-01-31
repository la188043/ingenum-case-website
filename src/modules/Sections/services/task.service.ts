import httpService from '../../shared/services/http.service';
import { AddTask } from '../models/AddTask.model';
import Task from '../models/Task.model';

const endpoint = '/tasks';

const addTask = (task: AddTask): Promise<Task> =>
  httpService.post(endpoint, JSON.stringify(task));

const deleteTask = (taskId: string): Promise<boolean> =>
  httpService.remove(`${endpoint}/${taskId}`);

// eslint-disable-next-line
export default {
  addTask,
  deleteTask,
};
