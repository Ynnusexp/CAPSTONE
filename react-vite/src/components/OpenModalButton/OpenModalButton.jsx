import { useModal } from "../../context/Modal";
import "../Navigation/Navigation";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  logout,
  createpost,
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button className={`${logout} ${createpost}`} onClick={onClick}>
      {createpost && (
        <i className="fa-solid fa-pencil" style={{ marginRight: "8px" }}></i>
      )}
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
