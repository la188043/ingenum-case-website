import config from '../config';

const createHeaders  (headers?: Headers, contextType?: Record<string, string>) => {
  const httpHeaders = {
    ...contextType,
    'Accept-Language': 'fr'
  };

  const h = new Headers(httpHeaders);

  if (headers) {
    headers.forEach((val, key) => {
      h.append(key, val);
    });
  }

  return h;
}

const exec = (
  endpoint: string,
  method: string,
  headers?: Headers,
  body?: any
) =>
  fetch(`${config.apiUrl}${endpoint}`, {
    method,
    body,
    headers,
  }).then(async result => {
    const text = await result.text();

    if (!text) {
      if (!result.ok) {
        throw new Error();
      }

      return text;
    }

    const response = JSON.parse(text);
    if (!result.ok) {
      throw response;
    }

    return response;
  });

const execJson = (endpoint: string, method: string, headers?: Headers, body?: any) => exec(
  endpoint,
  method,
  createHeaders(headers, { 'Content-Type': 'application/json' }),
  body && JSON.stringify(body),
);

const execFormData = (endpoint: string, method: string, body: FormData, headers?: Headers) => exec(
  endpoint,
  method,
  createHeaders(headers),
  body,
);

const get = (endpoint: string, headers?: Headers) => execJson(endpoint, 'GET', headers);

const post = (endpoint: string, body: any, headers?: Headers) => execJson(endpoint, 'POST', headers, body);

const postFormData = (endpoint: string, body: FormData, headers?: Headers) => execFormData(endpoint, 'POST', body, headers);

const put = (endpoint: string, body: any, headers?: Headers) => execJson(endpoint, 'PUT', headers, body);

const putFormData = (endpoint: string, body: FormData, headers?: Headers) => execFormData(endpoint, 'PUT', body, headers);

const remove = (endpoint: string, headers?: Headers) => execJson(endpoint, 'DELETE', headers);


export default {
  get,
  post,
  put,
  remove,
  postFormData,
  putFormData,
}