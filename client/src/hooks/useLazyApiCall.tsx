import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { BaseResponse } from '../interface';

export interface LazyApiResult<T> {
    data: BaseResponse<T> | null;
    loading: boolean;
    error: string | null;
}


export const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useLazyApiCall = <T,>(): [(config: AxiosRequestConfig) => void, LazyApiResult<T>] => {
    const [data, setData] = useState<BaseResponse<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async (config: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios(config);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const result: LazyApiResult<T> = { data, loading, error };

    return [callApi, result];
};

export default useLazyApiCall;