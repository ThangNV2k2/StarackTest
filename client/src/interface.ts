import {AccountTypeEnum, RoleEnum, StatusEnum} from "./enum";

export interface UserInfo {
    userId: string;
    email: string;
    fullName: string;
    roles: Set<RoleEnum>;
    accountType: AccountTypeEnum;
    phone: string;
    avatarLink: string;
    nationality: string;
    status: StatusEnum;
    language: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface LoginResponse {
    accessToken: string;
    userResponse: UserInfo;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    status: StatusEnum;
    accountType: AccountTypeEnum;
    roles: RoleEnum[];
}

export interface LoginRequest {
    email: string;
    password: string;
    roles: RoleEnum[];
}

export interface BaseResponse<T> {
    code: number;
    message?: String;
    result?: T;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface PageResponse<T> {
    content: T[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number; 
    first: boolean; 
    empty: boolean; 
}

export interface LogUserResponse {
    logId: string;
    userId: string;
    modifiedBy: string;
    timestamp: Date;
    changeType: string;
    action: string;
}