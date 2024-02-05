import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost, thunkGetAllPosts } from "../../redux/post";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((title && description) || imageUrl) {
      const formData = new FormData();

      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      formData.append("title", title);
      formData.append("description", description);

      try {

        await dispatch(thunkCreatePost(formData));
        await dispatch(thunkGetAllPosts());

      } catch (error) {

        console.error("There was a error creating your post!", error);
        setErrors(["There was a error creating your post!"]);

      }
    }
    closeModal();
    navigate("/");
  };

  return (
    <>
      <div className="create-post">
        <form onSubmit={handleSubmit} className="create-form">
          <label className="title-label">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
              className="title-input"
            />
          </label>

          <label className="description-label">
            <textarea
              name="description"
              value={description}
              placeholder="Go ahead, put anything"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              className="description-input"
            />
          </label>

          <label className="image-label">
            Image (**optional):
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              className="file-label"
            />
          </label>
          <button
            type="submit"
            disabled={title.length === 0 || description.length === 0}

          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
