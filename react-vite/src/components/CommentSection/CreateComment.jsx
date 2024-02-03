import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateComment, thunkGetOneComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";

const CreateComment = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description) {
      const formData = new FormData();
      formData.append("description", description);

      try {
        await dispatch(thunkCreateComment(formData));
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
      <div className="create-post">
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
