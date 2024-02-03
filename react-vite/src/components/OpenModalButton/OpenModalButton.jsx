import { useModal } from "../../context/Modal";
import "../Navigation/Navigation";
import "../HomePage/HomePage"

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  logout,
  createpost,
  deletePost,
  editPost,
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button className={`${logout} ${createpost} ${deletePost} ${editPost}`} onClick={onClick}>
      {createpost && (
        <i className="fa-solid fa-pencil" style={{ fontSize: "24px", marginRight: "8px" }}></i>
      )}
      {deletePost && (
        <i className="fa-solid fa-trash" style={{ fontSize: "24px", marginRight: "8px" }} title="Delete"></i>
      )}
      {editPost && (
        <i className="fa-solid fa-pencil" style={{ fontSize: "24px", marginRight: "8px" }} title="Edit"></i>
      )}
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
