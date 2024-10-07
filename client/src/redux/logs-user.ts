import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./auth-api";
import { getToken } from "./user-api";
import { BaseResponse, LogUserResponse } from "../interface";

export const logsUserApi = createApi({
    reducerPath: "logsUserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseApi,
        prepareHeaders: (headers) => {
            headers.set("Authorization", getToken());
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getLogUser: builder.query<BaseResponse<LogUserResponse[]>, {userId: string}>({
            query: ({ userId }) => ({
                url: `users/log?userId=${userId}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetLogUserQuery } = logsUserApi;