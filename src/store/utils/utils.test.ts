import { describe, it, expect } from 'vitest';
import { RequestStatus } from '../../const';
import { setLoading, setSuccess, setFailed } from './utils';

describe('Request status utilities', () => {
  const initialState = { requestStatus: RequestStatus.Idle };

  it('должен изменить статус запроса на Loading, когда вызывается setLoading', () => {
    const state = { ...initialState };
    setLoading(state);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('должен изменить статус запроса на Success, когда вызывается setSuccess', () => {
    const state = { ...initialState };
    setSuccess(state);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  it('должен изменить статус запроса на Failed, когда вызывается setFailed', () => {
    const state = { ...initialState };
    setFailed(state);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
