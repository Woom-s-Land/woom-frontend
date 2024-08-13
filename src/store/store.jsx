import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authSlice';
import settingReducer from './settingSlice';
import groupReducer from './groupSlice';
import alertReducer from './alertSlice';

const persistConfigAuth = {
  key: 'auth',
  storage: storageSession,
};

const persistGroupSetting = {
  key: 'group',
  storage: storageSession,
};

const persistConfigSetting = {
  key: 'setting',
  storage: storageSession,
};

const persistConfigAlert = {
  key: 'alert',
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistGroupReducer = persistReducer(persistGroupSetting, groupReducer);
const persistedSettingReducer = persistReducer(
  persistConfigSetting,
  settingReducer
);
const persistedAlertReducer = persistReducer(persistConfigAlert, alertReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    group: persistGroupReducer,
    setting: persistedSettingReducer,
    alert: persistedAlertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
