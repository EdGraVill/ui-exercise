import { State } from "../store";
import { createSelector } from "@reduxjs/toolkit";

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

    console.log(uniqueTags);

    return Object.keys(uniqueTags).sort((a, b) => uniqueTags[b] - uniqueTags[a]);
  }
);

export const mailListByTagSelector = (tag?: string) => createSelector(
  mailListSelector,
  mailList => tag ? mailList.filter(mail => mail.tags.includes(tag)) : mailList,
);
