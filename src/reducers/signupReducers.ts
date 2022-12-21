import { createReducer } from '@reduxjs/toolkit';
import { coreReduxActions } from "case-web-app-core";

const initialState = {
  contactVerified: false,
};

export type SignupContactVerified = typeof initialState;

export const contactVerifiedReducer = createReducer(initialState, (builder) => {
  builder.addCase(coreReduxActions.signupActions.contactVerified, (state = initialState) => {
    state.contactVerified = true
  });

  builder.addDefaultCase((state = initialState) => { return state; });
});
