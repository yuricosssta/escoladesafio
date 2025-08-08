import { IPost } from "./IPost"


export type IPostApiResponse = {
    page: number,
    results: IPost[],
}