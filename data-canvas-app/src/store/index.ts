// File: src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import editorReducer from './editorSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'user', 'editor']
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  editor: editorReducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
