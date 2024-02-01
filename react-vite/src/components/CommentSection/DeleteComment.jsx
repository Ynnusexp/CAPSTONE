import { useDispatch } from "react-redux"
import { thunkDeleteComment, thunkGetAllComments } from "../../redux/post"
import { useModal } from "../../context/Modal"
import './DeletePost.css'

const DeleteComment = (commentId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteComment(commentId.commentId))
        await dispatch(thunkGetAllComments())
        closeModal()
    }
    return (
        <div className='delete-CommentModal'>
            <h1 className='delete-comment'>Delete This Post?</h1>
            <div className='comment-DeleteConfirm'>
                Are you sure? This cannot be undone.
            </div>
            <button onClick={deleteComment} className="delete">Delete</button>
            <button onClick={closeModal} className="cancel">Cancel</button>
        </div >
    )
}

export default DeleteComment
