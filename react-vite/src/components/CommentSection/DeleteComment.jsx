import { useDispatch } from "react-redux"

import { useModal } from "../../context/Modal"
// import './DeletePost.css'
import { useParams } from "react-router-dom"
import { thunkDeleteComment, thunkGetOneComment } from "../../redux/comment"

const DeleteComment = (commentId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const { postId } = useParams()
    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteComment(commentId.commentId))
        await dispatch(thunkGetOneComment(postId))
        closeModal()
    }
    return (
        <div className='delete-CommentModal'>
            <h1 className='delete-comment'>Delete This Comment?</h1>
            <div className='comment-DeleteConfirm'>
                Are you sure? This cannot be undone.
            </div>
            <button onClick={deleteComment} className="delete">Delete</button>
            <button onClick={closeModal} className="cancel">Cancel</button>
        </div >
    )
}

export default DeleteComment
