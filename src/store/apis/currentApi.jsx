import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '852b9c87bd1edf4a8a2de3fc6e00cec9';

const currentApi = createApi({
  reducerPath: 'current',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints(builder) {
    return {
      fetchCurrent: builder.query({
        providesTags: ['current'],
        query: (city = '') => {
          return {
            url: `/weather?q=${city}&appid=${apiKey}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchCurrentQuery } = currentApi;
export { currentApi };
