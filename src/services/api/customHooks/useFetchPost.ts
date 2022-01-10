import {fetchPost} from "../apiService";
import {useQuery} from "react-query";
import {QueryReturnType} from "../../../types/hooks/QueryReturnType";
import {IPost} from "../../../model/post/IPost";

export const useFetchPost = (id: number): QueryReturnType<IPost, Error> => {
    const {
        data,
        error,
        isLoading,
        isError,
        refetch
    } = useQuery<IPost, Error>(["GET_POST", id], async () => fetchPost(id), {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            retry: false,
            enabled: false,
            cacheTime: Infinity
        }
    )

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        isError: isError,
        againExecute: refetch
    }
}
