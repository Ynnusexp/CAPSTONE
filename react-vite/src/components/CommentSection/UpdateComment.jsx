import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateComment, thunkGetOneComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";

import './UpdateComment.css'

const UpdateComment = ({ comment }) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState(comment.description);//////////////////////
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description) {
      // const formData = new FormData();
      // formData.append("description", description);

      try {
        await dispatch(thunkUpdateComment({ description: description }, comment.id));
        await dispatch(thunkGetOneComment());

      } catch (error) {
        console.error("There was a error updating your comment!", error);
        setErrors(["There was a error updating your comment!"]);
      }
    }
    closeModal();
  };

  return (
    <>
      <div className="comment-modal">
        <form onSubmit={handleSubmit} className="update-comment-form">

          <label className="description-label">
            <textarea
              name="description"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              className="description-input"
            />
          </label>

          <button
            type="submit"
            disabled={description?.length === 0}
            className="update-comment"
          >
            Update
          </button>

        </form>
      </div>
    </>
  );
};

export default UpdateComment;
