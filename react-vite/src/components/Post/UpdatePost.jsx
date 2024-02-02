import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkUpdatePost, thunkGetAllPosts } from "../../redux/post"
import { useModal } from "../../context/Modal"

const UpdatePost = ({post}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [imageUrl, setImageUrl] = useState(post.imageUrl)
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if ((title && description) || imageUrl) {
            const formData = new FormData();

            if (imageUrl) {
                formData.append('image', imageUrl)
            }
            formData.append('title', title)
            formData.append('description', description)

            try {
                await dispatch(thunkUpdatePost(post.id, formData))
                await dispatch(thunkGetAllPosts())
            } catch (error) {
                console.error("There was a error updating your post!", error);
                setErrors(["There was a error updating your post!"]);
            }
        }
        closeModal()
    }


    return (
        <>
            <div className='update-post'>
                <form onSubmit={handleSubmit} className="update-form">
                    <label className='title-label'>
                        <input
                            type='text'
                            name='title'
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={50}
                            className='title-label'
                        />
                    </label>

                    <label className='description-label'>
                        <textarea
                            name='description'
                            value={description}
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={200}
                            className='description-input'
                        />
                    </label>

                    <label className='image-label'>
                        Image (**optional):
                        <input type='file'
                        accept='image/*'
                        onChange={(e) => setImageUrl(e.target.files[0])}
                        className='file-label'
                        />
                    </label>
                    <button type='submit' disabled={title?.length === 0 || description?.length === 0}>
                        Update Post
                    </button>
                </form>
            </div>
        </>
    )
}

export default UpdatePost
