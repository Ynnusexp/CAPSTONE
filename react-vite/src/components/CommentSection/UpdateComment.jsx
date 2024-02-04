import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { thunkUpdateComment, thunkGetOneComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";

const UpdateComment = ({commentId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState(commentId.description);
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description) {
      // const formData = new FormData();
      // formData.append("description", description);

      try {
        await dispatch(thunkUpdateComment({description: description},commentId));
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
      <div className="create-comment">
        <form onSubmit={handleSubmit} className="create-form">

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
          >
            Update
          </button>
          <button onClick={closeModal} className="cancel">Cancel</button>
        </form>
      </div>
    </>
  );
};

export default UpdateComment;
