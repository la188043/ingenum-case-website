import httpService from '../../shared/services/http.service';

import { Section } from '../models/Section.model';

const endpoint = '/tables';

const getAll = (): Promise<Section[]> => httpService.get(endpoint);

// eslint-disable-next-line
export default {
  getAll,
};
