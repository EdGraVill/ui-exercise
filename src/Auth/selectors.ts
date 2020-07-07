import { State } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const authRootStateSelector = (state: State) => state.auth;

export const isAuthLoadingSelector = createSelector(
  authRootStateSelector,
  auth => auth.isFetching,
);

export const isLoggedSelector = createSelector(
  authRootStateSelector,
  auth => auth.user !== null,
);

export const userInfoSelector = createSelector(
  authRootStateSelector,
  auth => auth.user,
);

export const authErrorSelector = createSelector(
  authRootStateSelector,
  auth => auth.error,
);
