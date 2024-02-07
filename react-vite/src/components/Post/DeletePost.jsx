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
            {/* <h1 className='delete-post'>Delete This Post?</h1> */}

            <h2 className='post-DeleteConfirm'>
                Are you sure you want to delete this post?
            </h2>
            <div className='delete-post-buttons'>
                <button onClick={closeModal} className="cancel">Cancel</button>
                <button onClick={deletePost} className="delete">Ok</button>

            </div>
        </div >
    )
}

export default DeletePost
