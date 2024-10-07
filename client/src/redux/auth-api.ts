import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponse, LoginRequest, LoginResponse, RegisterRequest, UserInfo } from "../interface";

export const baseApi = process.env.REACT_APP_BASE_API_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseApi }),
    endpoints: (builder) => ({
        login: builder.mutation<BaseResponse<LoginResponse>, LoginRequest>({
            query: (user) => ({
                url: "auth/login",
                method: "POST",
                body: user,
            }),
        }),
        register: builder.mutation<BaseResponse<UserInfo>, RegisterRequest>({
            query: (user) => ({
                url: "auth/register",
                method: "POST",
                body: user,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
