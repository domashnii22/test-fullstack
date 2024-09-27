import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mainApi } from './MainApi';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

setupListeners(store.dispatch);
