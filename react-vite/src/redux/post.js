const GET_ALL_POSTS = "posts/getAllPosts"



const getAllPosts = (posts) => {
    return{
        type: GET_ALL_POSTS,
        posts,
    };
};

// GET ALL POSTS
export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch("api/posts/all");
    if(response.ok) {
        const posts = await response.json();
        dispatch(getAllPosts(posts));
        return posts;
    } else {
        return {errors: "Could not get all products!"}
    }
}

const postReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { ...action.posts };

        default:
            return state
    }
};


export default postReducers
