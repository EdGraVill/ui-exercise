import { takeEvery, put } from 'redux-saga/effects';
import { mailActions } from './slicer';
import { Mail } from '../types';

export function* fetchMailsEffect() {
  try {
    const data: { default: { messages: Mail[] } } = yield import('./emails.json');

    yield put(mailActions.receiveMails(data.default.messages));
  } catch (error) {
    yield put(mailActions.rejectMails(error.message));
  }
}

export function* mailSagas() {
  yield takeEvery(mailActions.fetchMails.type, fetchMailsEffect);
}
