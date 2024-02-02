const GET_ALL_POSTS = "posts/getAllPosts"
const GET_ONE_POST = "post/getOnePost"
const CREATE_POST = "posts/new"
const UPDATE_POST = "posts/updatePost"
const DELETE_POST = "posts/deletePost"


const getAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts,
    };
};

const getOnePost = (post) => {
    return {
        type: GET_ONE_POST,
        post
    };
};

const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

// GET ALL POSTS
export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/all");
    if (response.ok) {
        const posts = await response.json();
        dispatch(getAllPosts(posts));
        return posts;
    } else {
        return { errors: "Could not get all posts!" }
    }
}

//GET ONE POST
export const thunkGetOnePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`)
    if (response.ok) {
        const post = await response.json();
        dispatch(getOnePost(post));
        return post;
    } else {
        return { errors: "Could not get post!" }
    }
}

//CREATE A POST
export const thunkCreatePost = (formData) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(createPost(newPost));
        return newPost;
    } else {
        return { errors: "Error occured while creating post!" }
    }
}

//UPDATE A POST
export const thunkUpdatePost = (postId, post) => async (dispatch) => {
    
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: post
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePost(updatedPost));
        return updatedPost;
    } else {
        return { errors: "Error occured while updating post!" }
    }
}

//DELETE A POST
export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deletePost(postId));
    } else {
        return { errors: "Error occured while deleting post!" }
    }
};

const postReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { ...action.posts };
        case GET_ONE_POST:
            return { ...action.post };
        case CREATE_POST:
            return { ...state, posts: [...(state.posts || []), action.post] };
        case UPDATE_POST:
            return {
                ...state,
                posts: (state.posts || []).map((post) =>
                    post.id === action.post.id ? action.post : post
                ),
            };
        case DELETE_POST:
            return {
                ...state,
                posts: (state.posts || []).filter((post) => post.id !== action.postId),
            };
        default:
            return state
    }
};


export default postReducers
