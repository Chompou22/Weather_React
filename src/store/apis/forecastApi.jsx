import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '852b9c87bd1edf4a8a2de3fc6e00cec9';

const forecastApi = createApi({
  reducerPath: 'forecast',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints(builder) {
    return {
      fetchForecast: builder.query({
        providesTags: ['forecast'],
        query: ({ lat = '', lon = '' }) => {
          return {
            url: `/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchForecastQuery } = forecastApi;
export { forecastApi };
