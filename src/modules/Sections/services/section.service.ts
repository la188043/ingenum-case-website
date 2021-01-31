import httpService from '../../shared/services/http.service';
import { AddSection } from '../models/AddSection.model';
import { AddTask } from '../models/AddTask.model';

import { Section } from '../models/Section.model';
import Task from '../models/Task.model';

const endpoint = '/tables';

const getAll = (): Promise<Section[]> => httpService.get(endpoint);

const addSection = (section: AddSection): Promise<Section> =>
  httpService.post(endpoint, JSON.stringify(section));

// eslint-disable-next-line
export default {
  getAll,
  addSection,
};
