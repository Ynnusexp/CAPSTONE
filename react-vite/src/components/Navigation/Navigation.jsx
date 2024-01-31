// import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/wumblr-logo.png"

function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="No Image" className="wumblr-logo" />
      </div>

      <div className="profile-button">
        <ProfileButton />
      </div>


    </>
    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <li>
    //     <ProfileButton />
    //   </li>
    // </ul>
  );
}

export default Navigation;
