// import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../../public/wumblr-high-resolution-logo-white-transparent.png";
import { useSelector } from "react-redux";
import CreatePost from "../Post/CreatePost";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function Navigation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const user = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <div>
        <div className="left-main">
          <div>
            {user && (
              <button className="home-button" onClick={() => navigate("/")}>
                Home
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="explore-button"
                onClick={() => alert("Feature coming soon!")}
              >
                Explore
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="activity-button"
                onClick={() => alert("Feature coming soon!")}
              >
                Activity
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="messages-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                Messages
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="inbox-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                Inbox
              </button>
            )}
            <div>
              {user && (
                <OpenModalButton
                  buttonText={"Log Out"}
                  modalComponent={<CreatePost />}
                  logout="log-out-button"
                />
              )}
            </div>
          </div>

          <div>
            {user && (
              <OpenModalButton
                buttonText={"Create Post"}
                modalComponent={<CreatePost />}
                createpost={"create-post"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="No Image" className="wumblr-logo" />
      </div>

      <div className="profile-button">
        <ProfileButton />
      </div>
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => alert("Feature is under maintenance!")}
        placeholder="Search Wumblr"
      />
    </div>
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
