import httpService from '../../shared/services/http.service';
import { AddTask } from '../models/AddTask.model';

import { Section } from '../models/Section.model';
import Task from '../models/Task.model';

const endpoint = '/tables';

const getAll = (): Promise<Section[]> => httpService.get(endpoint);

// eslint-disable-next-line
export default {
  getAll,
};
