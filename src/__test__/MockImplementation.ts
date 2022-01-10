import {QueryReturnType} from "../types/hooks/QueryReturnType";

type ReturnType<R, E> = () => QueryReturnType<R, E>

interface IFunction<R, E> {
    data: R | undefined, error: E | null, isError: boolean, isLoading: boolean
}

export function setUseQueryMockImplementation<R, E>({data, error, isError, isLoading}: IFunction<R, E>): ReturnType<R, E> {
    return () => {
        return {
            data: data,
            error: error,
            isError: isError,
            isLoading: isLoading,
        }
    }
}
