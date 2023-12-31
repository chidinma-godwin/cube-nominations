/**
 * Generated by @openapi-codegen
 *
 * @version 1.0.0
 */
import * as reactQuery from '@tanstack/react-query';
import { useNominationContext, NominationContext } from './nominationContext';
import type * as Fetcher from './nominationFetcher';
import { nominationFetch } from './nominationFetcher';
import type * as Responses from './nominationResponses';

export type CubeAcademyLoginError = Fetcher.ErrorWrapper<{
    status: 401;
    payload: Responses.Error;
}>;

export type CubeAcademyLoginRequestBody = {
    /**
     * @example test@test.com
     */
    email?: string;
    /**
     * @example <string>
     */
    password?: string;
};

export type CubeAcademyLoginVariables = {
    body?: CubeAcademyLoginRequestBody;
} & NominationContext['fetcherOptions'];

/**
 * Login an existing user
 */
export const fetchLogin = (
    variables: CubeAcademyLoginVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.AuthToken,
        CubeAcademyLoginError,
        CubeAcademyLoginRequestBody,
        {},
        {},
        {}
    >({ url: '/api/login', method: 'post', ...variables, signal });

/**
 * Login an existing user
 */
export const useLogin = (
    options?: Omit<
        reactQuery.UseMutationOptions<
            Responses.AuthToken,
            CubeAcademyLoginError,
            CubeAcademyLoginVariables
        >,
        'mutationFn'
    >
) => {
    const { fetcherOptions } = useNominationContext();
    return reactQuery.useMutation<
        Responses.AuthToken,
        CubeAcademyLoginError,
        CubeAcademyLoginVariables
    >({
        mutationFn: (variables: CubeAcademyLoginVariables) =>
            fetchLogin({ ...fetcherOptions, ...variables }),
        ...options,
    });
};

export type CubeAcademyRegisterError = Fetcher.ErrorWrapper<{
    status: 401;
    payload: Responses.Error;
}>;

export type CubeAcademyRegisterRequestBody = {
    /**
     * @example <string>
     */
    name?: string;
    /**
     * @example <email>
     */
    email?: string;
    /**
     * @example <password>
     */
    password?: string;
};

export type CubeAcademyRegisterVariables = {
    body?: CubeAcademyRegisterRequestBody;
} & NominationContext['fetcherOptions'];

/**
 * Register a new user
 */
export const fetchRegister = (
    variables: CubeAcademyRegisterVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.AuthToken,
        CubeAcademyRegisterError,
        CubeAcademyRegisterRequestBody,
        {},
        {},
        {}
    >({ url: '/api/register', method: 'post', ...variables, signal });

/**
 * Register a new user
 */
export const useRegister = (
    options?: Omit<
        reactQuery.UseMutationOptions<
            Responses.AuthToken,
            CubeAcademyRegisterError,
            CubeAcademyRegisterVariables
        >,
        'mutationFn'
    >
) => {
    const { fetcherOptions } = useNominationContext();
    return reactQuery.useMutation<
        Responses.AuthToken,
        CubeAcademyRegisterError,
        CubeAcademyRegisterVariables
    >({
        mutationFn: (variables: CubeAcademyRegisterVariables) =>
            fetchRegister({ ...fetcherOptions, ...variables }),
        ...options,
    });
};

export type CubeAcademyRetrieveNomineeListError =
    Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyRetrieveNomineeListVariables =
    NominationContext['fetcherOptions'];

/**
 * Retrieve a complete list of all nominees
 */
export const fetchRetrieveNomineeList = (
    variables: CubeAcademyRetrieveNomineeListVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Nominee,
        CubeAcademyRetrieveNomineeListError,
        undefined,
        {},
        {},
        {}
    >({ url: '/api/nominee', method: 'get', ...variables, signal });

/**
 * Retrieve a complete list of all nominees
 */
export const useRetrieveNomineeList = <TData = Responses.Nominee>(
    variables: CubeAcademyRetrieveNomineeListVariables,
    options?: Omit<
        reactQuery.UseQueryOptions<
            Responses.Nominee,
            CubeAcademyRetrieveNomineeListError,
            TData
        >,
        'queryKey' | 'queryFn' | 'initialData'
    >
) => {
    const { fetcherOptions, queryOptions, queryKeyFn } =
        useNominationContext(options);
    return reactQuery.useQuery<
        Responses.Nominee,
        CubeAcademyRetrieveNomineeListError,
        TData
    >({
        queryKey: queryKeyFn({
            path: '/api/nominee',
            operationId: 'cubeAcademyRetrieveNomineeList',
            variables,
        }),
        queryFn: ({ signal }) =>
            fetchRetrieveNomineeList(
                { ...fetcherOptions, ...variables },
                signal
            ),
        ...options,
        ...queryOptions,
    });
};

export type CubeAcademyCreateNominationError = Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyCreateNominationRequestBody = {
    /**
     * Must be a valid nominee_id
     */
    nominee_id: string;
    reason: string;
    /**
     * One of the following values: very_unfair,unfair,not_sure,fair,very_fair
     */
    process: string;
};

export type CubeAcademyCreateNominationVariables = {
    body: CubeAcademyCreateNominationRequestBody;
} & NominationContext['fetcherOptions'];

/**
 * Create a new nomination
 */
export const fetchCreateNomination = (
    variables: CubeAcademyCreateNominationVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Nomination,
        CubeAcademyCreateNominationError,
        CubeAcademyCreateNominationRequestBody,
        {},
        {},
        {}
    >({ url: '/api/nomination', method: 'post', ...variables, signal });

/**
 * Create a new nomination
 */
export const useCreateNomination = (
    options?: Omit<
        reactQuery.UseMutationOptions<
            Responses.Nomination,
            CubeAcademyCreateNominationError,
            CubeAcademyCreateNominationVariables
        >,
        'mutationFn'
    >
) => {
    const { fetcherOptions } = useNominationContext();
    return reactQuery.useMutation<
        Responses.Nomination,
        CubeAcademyCreateNominationError,
        CubeAcademyCreateNominationVariables
    >({
        mutationFn: (variables: CubeAcademyCreateNominationVariables) =>
            fetchCreateNomination({
                ...fetcherOptions,
                ...variables,
            }),
        ...options,
    });
};

export type CubeAcademyGetAllNominationsError = Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyGetAllNominationsVariables =
    NominationContext['fetcherOptions'];

/**
 * Retrieves all nominations set by the user
 */
export const fetchCubeAcademyGetAllNominations = (
    variables: CubeAcademyGetAllNominationsVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Nominations,
        CubeAcademyGetAllNominationsError,
        undefined,
        {},
        {},
        {}
    >({ url: '/api/nomination', method: 'get', ...variables, signal });

/**
 * Retrieves all nominations set by the user
 */
export const useGetAllNominations = <TData = Responses.Nominations>(
    variables: CubeAcademyGetAllNominationsVariables,
    options?: Omit<
        reactQuery.UseQueryOptions<
            Responses.Nominations,
            CubeAcademyGetAllNominationsError,
            TData
        >,
        'queryKey' | 'queryFn' | 'initialData'
    >
) => {
    const { fetcherOptions, queryOptions, queryKeyFn } =
        useNominationContext(options);
    return reactQuery.useQuery<
        Responses.Nominations,
        CubeAcademyGetAllNominationsError,
        TData
    >({
        queryKey: queryKeyFn({
            path: '/api/nomination',
            operationId: 'cubeAcademyGetAllNominations',
            variables,
        }),
        queryFn: ({ signal }) =>
            fetchCubeAcademyGetAllNominations(
                { ...fetcherOptions, ...variables },
                signal
            ),
        ...options,
        ...queryOptions,
    });
};

export type CubeAcademyGetNominationByIdPathParams = {
    nominationId: string;
};

export type CubeAcademyGetNominationByIdError = Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyGetNominationByIdVariables = {
    pathParams: CubeAcademyGetNominationByIdPathParams;
} & NominationContext['fetcherOptions'];

/**
 * Retrieve a specific nomination by ID
 */
export const fetchGetNominationById = (
    variables: CubeAcademyGetNominationByIdVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Nomination,
        CubeAcademyGetNominationByIdError,
        undefined,
        {},
        {},
        CubeAcademyGetNominationByIdPathParams
    >({
        url: '/api/nomination/{nominationId}',
        method: 'get',
        ...variables,
        signal,
    });

/**
 * Retrieve a specific nomination by ID
 */
export const useGetNominationById = <TData = Responses.Nomination>(
    variables: CubeAcademyGetNominationByIdVariables,
    options?: Omit<
        reactQuery.UseQueryOptions<
            Responses.Nomination,
            CubeAcademyGetNominationByIdError,
            TData
        >,
        'queryKey' | 'queryFn' | 'initialData'
    >
) => {
    const { fetcherOptions, queryOptions, queryKeyFn } =
        useNominationContext(options);
    return reactQuery.useQuery<
        Responses.Nomination,
        CubeAcademyGetNominationByIdError,
        TData
    >({
        queryKey: queryKeyFn({
            path: '/api/nomination/{nominationId}',
            operationId: 'cubeAcademyGetNominationById',
            variables,
        }),
        queryFn: ({ signal }) =>
            fetchGetNominationById({ ...fetcherOptions, ...variables }, signal),
        ...options,
        ...queryOptions,
    });
};

export type CubeAcademyUpdateNominationPathParams = {
    nominationId: string;
};

export type CubeAcademyUpdateNominationError = Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyUpdateNominationRequestBody = {
    /**
     * Must be a valid nominee_id
     */
    nominee_id?: string;
    reason?: string;
    /**
     * Must be one of the following values: very_unfair,unfair,not_sure,fair,very_fair
     */
    process?: string;
};

export type CubeAcademyUpdateNominationVariables = {
    body?: CubeAcademyUpdateNominationRequestBody;
    pathParams: CubeAcademyUpdateNominationPathParams;
} & NominationContext['fetcherOptions'];

/**
 * Update a specific existing nominiation
 */
export const fetchUpdateNomination = (
    variables: CubeAcademyUpdateNominationVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Nomination,
        CubeAcademyUpdateNominationError,
        CubeAcademyUpdateNominationRequestBody,
        {},
        {},
        CubeAcademyUpdateNominationPathParams
    >({
        url: '/api/nomination/{nominationId}',
        method: 'put',
        ...variables,
        signal,
    });

/**
 * Update a specific existing nominiation
 */
export const useUpdateNomination = (
    options?: Omit<
        reactQuery.UseMutationOptions<
            Responses.Nomination,
            CubeAcademyUpdateNominationError,
            CubeAcademyUpdateNominationVariables
        >,
        'mutationFn'
    >
) => {
    const { fetcherOptions } = useNominationContext();
    return reactQuery.useMutation<
        Responses.Nomination,
        CubeAcademyUpdateNominationError,
        CubeAcademyUpdateNominationVariables
    >({
        mutationFn: (variables: CubeAcademyUpdateNominationVariables) =>
            fetchUpdateNomination({
                ...fetcherOptions,
                ...variables,
            }),
        ...options,
    });
};

export type CubeAcademyDeleteNominationPathParams = {
    nominationId: string;
};

export type CubeAcademyDeleteNominationError = Fetcher.ErrorWrapper<undefined>;

export type CubeAcademyDeleteNominationVariables = {
    pathParams: CubeAcademyDeleteNominationPathParams;
} & NominationContext['fetcherOptions'];

/**
 * Delete a specific existing nomination
 */
export const fetchDeleteNomination = (
    variables: CubeAcademyDeleteNominationVariables,
    signal?: AbortSignal
) =>
    nominationFetch<
        Responses.Deletion,
        CubeAcademyDeleteNominationError,
        undefined,
        {},
        {},
        CubeAcademyDeleteNominationPathParams
    >({
        url: '/api/nomination/{nominationId}',
        method: 'delete',
        ...variables,
        signal,
    });

/**
 * Delete a specific existing nomination
 */
export const useDeleteNomination = (
    options?: Omit<
        reactQuery.UseMutationOptions<
            Responses.Deletion,
            CubeAcademyDeleteNominationError,
            CubeAcademyDeleteNominationVariables
        >,
        'mutationFn'
    >
) => {
    const { fetcherOptions } = useNominationContext();
    return reactQuery.useMutation<
        Responses.Deletion,
        CubeAcademyDeleteNominationError,
        CubeAcademyDeleteNominationVariables
    >({
        mutationFn: (variables: CubeAcademyDeleteNominationVariables) =>
            fetchDeleteNomination({
                ...fetcherOptions,
                ...variables,
            }),
        ...options,
    });
};

export type QueryOperation =
    | {
          path: '/api/nominee';
          operationId: 'cubeAcademyRetrieveNomineeList';
          variables: CubeAcademyRetrieveNomineeListVariables;
      }
    | {
          path: '/api/nomination';
          operationId: 'cubeAcademyGetAllNominations';
          variables: CubeAcademyGetAllNominationsVariables;
      }
    | {
          path: '/api/nomination/{nominationId}';
          operationId: 'cubeAcademyGetNominationById';
          variables: CubeAcademyGetNominationByIdVariables;
      };
