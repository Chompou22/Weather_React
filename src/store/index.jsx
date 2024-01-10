import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currentApi } from './apis/currentApi';
import { forecastApi } from './apis/forecastApi';

export const store = configureStore({
  reducer: {
    [currentApi.reducerPath]: currentApi.reducer,
    [forecastApi.reducerPath]: forecastApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      currentApi.middleware,
      forecastApi.middleware,
    );
  },
});

setupListeners(store.dispatch);

export { useFetchCurrentQuery } from './apis/currentApi';
export { useFetchForecastQuery } from './apis/forecastApi';
