import {QueryObserverResult, RefetchOptions, RefetchQueryFilters} from "react-query/types/core/types";

export type QueryReturnType<R, E> = {
    data: R | undefined,
    error: E | null,
    isLoading: boolean,
    isError: boolean,
    againExecute?: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<R, E>>
}
