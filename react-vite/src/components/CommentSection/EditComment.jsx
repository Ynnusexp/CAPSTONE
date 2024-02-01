import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { thunkCreateComment, thunkGetAllComments } from "../../redux/post";
import { useModal } from "../../context/Modal";

const CreateComment = (commentId) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");

  const commentFilter = useSelector((state) => Object.values(state.comments));

  const updatingComment = commentFilter.filter((comment) => comment.id === commentId.commentId);

  useEffect(() => {

    if (updatingComment) {
        setDescription(updatingComment[0].description);
    }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description) {
      const formData = new FormData();
      formData.append("description", description);

        await dispatch(thunkCreateComment(formData));
        await dispatch(thunkGetAllComments());


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