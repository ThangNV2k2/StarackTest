import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponse, PageResponse, UserInfo } from "../interface";
import { baseApi } from "./auth-api";

export const getToken = () => {
    return `Bearer ${localStorage.getItem("token")}`;
};
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseApi, 
        prepareHeaders: (headers) => {
            headers.set("Authorization", getToken());
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllUser: builder.query<BaseResponse<PageResponse<UserInfo>>, { page: number, size: number }>({
            query: ({page, size}) => ({
                url: `users?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),
        getUserInfo: builder.query<BaseResponse<UserInfo>, void>({
            query: () => ({
                url: "auth/getUserInfo",
                method: "GET"
            })
        })
    }),
});

export const { useGetAllUserQuery, useLazyGetAllUserQuery, useLazyGetUserInfoQuery } = userApi;
