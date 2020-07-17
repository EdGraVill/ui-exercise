import { State } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { Mail } from "../types";

export const mailRootStateSelector = (state: State) => state.mail;

export const mailListSelector = createSelector(
  mailRootStateSelector,
  mails => mails.mailList,
);

export const isFetchingMailsSelector = createSelector(
  mailRootStateSelector,
  mails => mails.isFetching,
);

export const lastMailsKnownErrorSelector = createSelector(
  mailRootStateSelector,
  mails => mails.lastKnownError,
);

export const mailsTagsSelector = createSelector(
  mailListSelector,
  (mailList) => {
    const uniqueTags: { [tag: string]: number } = {};

    mailList.map(({ tags }) => tags).flat().forEach((tag) => {
      if (!uniqueTags[tag]) {
        uniqueTags[tag] = 1;
      } else {
        uniqueTags[tag] += 1;
      }
    });

    return Object.keys(uniqueTags).sort((a, b) => uniqueTags[b] - uniqueTags[a]);
  }
);

export const mailListByTagSelector = (tag?: string) => createSelector(
  mailListSelector,
  (mailList) => {
    if (!tag || (tag && tag === '/')) {
      return mailList.filter(({ isDeleted }) => !isDeleted);
    } else if (tag.includes('/tags/')) {
      return mailList.filter(mail => mail.tags.includes(tag.replace('/tags/', '')) && !mail.isDeleted);
    } else if (tag.includes('/starred')) {
      return mailList.filter(({ isDeleted, isFavorite }) => isFavorite && !isDeleted);
    } else if (tag.includes('/trash')) {
      return mailList.filter(({ isDeleted }) => isDeleted);
    }

    return [] as Mail[];
  },
);

export const mailSelector = (id: number) => createSelector(
  mailListSelector,
  mailList => mailList.find(mail => mail.id === id),
);
