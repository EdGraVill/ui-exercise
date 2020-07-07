import { takeLatest, call, put } from 'redux-saga/effects';
import { authActions } from './slicer';
import axios, { AxiosResponse } from 'axios';
import { randomBetween } from '../util';
import { UserInfo } from '../types';

interface UserResponse {
  data: UserInfo;
  ad: any;
}

export function* fetchUserInfoEffect() {
  try {
    const response: AxiosResponse<UserResponse> = yield call(axios.get, `https://reqres.in/api/users/${randomBetween(0, 12)}`);

    yield put(authActions.receiveUserInfo(response.data.data));
  } catch (error) {
    const err = error.response?.data || error.message || 'Unknown Error';

    yield put(authActions.rejectUserInfo(err));
  }
}

export function* authSagas() {
  yield takeLatest(authActions.login.type, fetchUserInfoEffect);
}
