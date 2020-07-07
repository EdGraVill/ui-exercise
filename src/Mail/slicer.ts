import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Mail } from "../types";

export const mailInitialState = {
  isFetching: false,
  lastKnownError: null as string | null,
  mailList: [] as Mail[],
}

export const { actions: mailActions, reducer: mailReducer } = createSlice({
  initialState: mailInitialState,
  name: 'mail',
  reducers: {
    fetchMails(state) {
      state.isFetching = true;
    },
    receiveMails(state, { payload }: PayloadAction<Mail[]>) {
      const uniqueList: { [id: number]: Mail } = state.mailList.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }), {});

      payload.forEach((mail) => {
        uniqueList[mail.id] = mail;
      });

      state.isFetching = false;
      state.mailList = Object.values(uniqueList)
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    },
    rejectMails(state, { payload }: PayloadAction<string>) {
      state.isFetching = false;
      state.lastKnownError = payload;
    },
  },
})
