import { Children, createContext, useContext, useState } from "react";


const postsRepository = new PostsRepository();
const result = await postsRepository.getPosts();

export const PostContext = createContext;

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState(result);

    return (
        <PostContext.Provider value={{ posts }} >
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    return useContext (PostContext)
}