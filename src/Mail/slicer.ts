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
        if (!uniqueList[mail.id]) {
          uniqueList[mail.id] = {
            ...mail,
            id: Number(mail.id),
            isReaded: false,
            isDeleted: false,
            isFavorite: false,
          };
        }
      });

      state.isFetching = false;
      state.mailList = Object.values(uniqueList)
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    },
    rejectMails(state, { payload }: PayloadAction<string>) {
      state.isFetching = false;
      state.lastKnownError = payload;
    },
    readMail(state, { payload }: PayloadAction<number>) {
      const mail = state.mailList.find(({ id }) => id === payload);

      if (mail) {
        mail.isReaded = true;
      }
    },
    deleteMail(state, { payload }: PayloadAction<number>) {
      const mail = state.mailList.find(({ id }) => id === payload);

      if (mail) {
        mail.isDeleted = true;
      }
    },
    restoreMail(state, { payload }: PayloadAction<number>) {
      const mail = state.mailList.find(({ id }) => id === payload);

      if (mail) {
        mail.isDeleted = false;
      }
    },
    removeMail(state, { payload }: PayloadAction<number>) {
      const mailIx = state.mailList.findIndex(({ id }) => id === payload);

      if (mailIx >= 0) {
        state.mailList.splice(mailIx, 1);
      }
    },
    switchFavorite(state, { payload }: PayloadAction<number>) {
      const mail = state.mailList.find(({ id }) => id === payload);

      if (mail) {
        mail.isFavorite = !mail.isFavorite;
      }
    },
  },
});
