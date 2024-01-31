const GET_ALL_COMMENTS = "comments/getAllComments"
const GET_ONE_COMMENT = "comment/getOneComment"
const CREATE_COMMENT = "comments/new"
const UPDATE_COMMENT = "comments/updateComment"
const DELETE_COMMENT = "comments/deleteComment"
const POST_COMMENT = "comments/postComment"



const getAllComments = (comments) => {
    return{
        type: GET_ALL_COMMENTS,
        comments,
    };
};

const getOneComment = (comment) => {
    return {
        type: GET_ONE_COMMENT,
        comment,
    };
};

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    };
};

const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    };
};

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};

const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    };
};


// GET ALL COMMENTS
export const thunkGetAllComments = () => async (dispatch) => {
    const response = await fetch("api/comments/all");
    if(response.ok) {
        const comments = await response.json();
        dispatch(getAllComments(comments));
        return comments;
    } else {
        return {errors: "Could not get all comments!"}
    }
};

// GET ONE COMMENT
export const thunkGetOneComment = (postId) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${postId}`)
    if(response.ok) {
        const comment = await response.json();
        dispatch(getOneComment(comment));
        return comment;
    } else {
        return {errors: "Could not get comment!"}
    }
};

// CREATE COMMENT
// export const thunkCreateComment = (  , commentId)

// UPDATE COMMENT
export const thunkUpdateComment = (comment, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });
    if(response.ok) {
        const updatedComment = await response.json();
        dispatch(updateComment(updatedComment));
        return updatedComment
    } else {
        return {errors: "Error occured while updating comment!"}
    }
};

// DELETE COMMENT
export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if(response.ok) {
        dispatch(deleteComment(commentId));
    } else {
        return {errors: "Error occured while deleting comment!"}
    }
};

//POST COMMENT


const commentReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            return { ...action.posts };

        default:
            return state
    }
};


export default commentReducers
