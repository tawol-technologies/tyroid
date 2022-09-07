import axios, { Method } from 'axios';
import { TResponseType } from './responseType';

export interface IAxios<T> {
    method: Method | "POST" | "PUT" | "DELETE" | "GET",
    url?: string,
    data?: T,
    onSuccess(response: IAxiosHTTPResponse<T>):void,
    onFailure(error: IAxiosHTTPError):void,
    headers?: Record<string,string>,
    responseType?: TResponseType,
    withCredentials?: boolean,
}

export const axiosHttp = <T> (request: IAxios<T>) => {
    axios({
        responseType: request.responseType ?? "json",
        method: request.method ?? "POST",
        url: request.url,
        headers: request.headers,
        data: request.data,
        withCredentials: request.withCredentials,
    })
    .then((res) => request.onSuccess((res as unknown) as IAxiosHTTPResponse<T>))
    .catch((res) => request.onFailure((res as unknown) as IAxiosHTTPError));
}

export interface IAxiosHTTPResponse<T> {
    data: T;
    status: number;
    statusText: string;
    header: Record<string, string>;
}

export interface IAxiosHTTPError {
    status: number;
    reason: string;
    body: string;
}