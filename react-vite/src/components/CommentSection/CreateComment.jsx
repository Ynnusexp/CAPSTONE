import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateComment, thunkGetOneComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import './CreateComment.css'
const CreateComment = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description) {
      // const formData = new FormData();
      // formData.append("description", description);

      try {
        console.log(postId, " POSTT ID HERE")
        await dispatch(thunkCreateComment({ description: description }, postId));
        await dispatch(thunkGetOneComment());

      } catch (error) {
        console.error("There was a error creating your comment!", error);
        setErrors(["There was a error creating your comment!"]);
      }
    }
    closeModal();
  };

  return (
    <>
      <div className="comment-modal">
        <form onSubmit={handleSubmit} className="create-comment-form">
          {errors && <div> {errors}</div>}
          <label className="description-label">
            <textarea
              name="description"
              value={description}
              placeholder="Share your thoughts..."
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              className="description-input"
            />
          </label>
          <button
            type="submit"
            className="post-comment"
            disabled={description.length === 0}
          >
            Post comment
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateComment;
