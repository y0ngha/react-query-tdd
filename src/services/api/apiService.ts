import {customAxios} from "../axios/axios";
import {IPost} from "../../model/post/IPost";

const throwError = (message: string | any) => {
    throw new Error(message)
}

export const fetchPost = async (id: number): Promise<IPost> => {
    try {
        return await customAxios.get<IPost>(`/posts/${id}`)
    } catch (e) {
        return throwError(e)
    }
}
