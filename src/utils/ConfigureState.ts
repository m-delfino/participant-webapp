import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { localStorageManager, reducersManager } from 'case-web-app-core';
import { cookiePreferenceSlice } from '../reducers/consentReducers';
import { contactVerifiedReducer } from '../reducers/signupReducers';

import { onSaveState as signupOnSaveState } from '../localStorage/signup';

const reducersMap = {
  'signup': contactVerifiedReducer,
  [cookiePreferenceSlice.name]: cookiePreferenceSlice.reducer
};

export function configureState() {
  reducersManager.add(reducersMap);
  localStorageManager.onSave(signupOnSaveState);
}

export type InfluwebState = StateFromReducersMapObject<typeof reducersMap>;
