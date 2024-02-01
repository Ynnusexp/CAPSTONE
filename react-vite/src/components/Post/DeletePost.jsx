import { useDispatch } from "react-redux"
import { thunkDeletePost, thunkGetAllPosts } from "../../redux/post"
import { useModal } from "../../context/Modal"
import './DeletePost.css'

const DeletePost = (postId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
   
    const deletePost = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeletePost(postId.postId))
        await dispatch(thunkGetAllPosts())
        closeModal()
    }
    return (
        <div className='delete-PostModal'>
            <h1 className='delete-post'>Delete This Post?</h1>
            <div className='postDelConfirm'>
                Are you sure? This cannot be undone.
            </div>
            <button onClick={deletePost} className="delete">Delete</button>
            <button onClick={closeModal} className="cancel">Cancel</button>
        </div >
    )
}

export default DeletePost
