// import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../../public/wumblr-high-resolution-logo-white-transparent.png";
import ad from "../../../public/aalogo.png";
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
                <i
                  className="fa-solid fa-house"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}> Home </span>
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="explore-button"
                onClick={() => alert("Feature coming soon!")}
              >
                <i
                  className="fa-solid fa-map-location-dot"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Explore</span>
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="activity-button"
                onClick={() => alert("Feature coming soon!")}
              >
                <i
                  className="fa-solid fa-bolt"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Activity</span>
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="messages-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-face-smile"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Messages</span>
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                className="inbox-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Inbox</span>
              </button>
            )}
          </div>

          <div>
            {user && (
              <button
                className="account-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Account</span>
              </button>
            )}
          </div>
          <div>
            {user && (
              <button
                // NEED TO CHANGE TO MODAL WHEN LOG OUT AND APPLY FUNCTIONALITY
                className="log-out-button"
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-door-closed"
                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}>Log Out</span>
              </button>
            )}
          </div>

          <div>
            {user && (
              <OpenModalButton
                buttonText={<span style={{ fontSize: "15px" }}>Create</span>}
                modalComponent={<CreatePost />}
                createpost={"create-post"}
              />
            )}
            {/* <i className="fa-solid fa-pencil"></i> */}
          </div>
        </div>
      </div>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="No Image" className="wumblr-logo" />
      </div>

      <div className="profile-button">
        <ProfileButton />
      </div>

              <div className="right-main">
              <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => alert("Feature is under maintenance!")}
          placeholder="Search Wumblr"
        />

        <div className="ad" onClick={() => navigate("/")}>
          <img src={ad} alt="No Image" />
        </div>
              </div>


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
