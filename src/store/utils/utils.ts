import { RequestStatus } from '../../const';

type StateWithRequestStatus = {
  requestStatus: RequestStatus;
}

export const setLoading = (state: StateWithRequestStatus) => {
  state.requestStatus = RequestStatus.Loading;
};

export const setSuccess = (state: StateWithRequestStatus) => {
  state.requestStatus = RequestStatus.Success;
};

export const setFailed = (state: StateWithRequestStatus) => {
  state.requestStatus = RequestStatus.Failed;
};
