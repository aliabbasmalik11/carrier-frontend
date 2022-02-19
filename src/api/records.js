import request from './request';

export const getStatesApi = ({
  onSuccess,
  onFailure,
  onFinally
}) => {
  return request({
    path: 'states/all',
    onSuccess,
    onFailure,
    onFinally,
    opts: {
      method: 'GET',
    },
  });
}

export const getInsuranceTypesApi = ({
  onSuccess,
  onFailure,
  onFinally
}) => {
  return request({
    path: 'insurance-types/all',
    onSuccess,
    onFailure,
    onFinally,
    opts: {
      method: 'GET',
    },
  });
}

export const getRecordsApi = ({
  data,
  onSuccess,
  onFailure,
  onFinally
}) => {
  return request({
    path: 'records/all',
    onSuccess,
    onFailure,
    onFinally,
    opts: {
      method: 'POST',
      data,
    },
  });
}

