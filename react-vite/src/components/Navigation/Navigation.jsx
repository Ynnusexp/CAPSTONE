import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import logo from "../../../public/wumblr-high-resolution-logo-white-transparent.png";
import logoMoble from  "../../../public/favicon.ico"
// import ad from "../../../public/aalogo.png";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../Post/CreatePost";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const navigate = useNavigate();
  // const closeMenu = () => setShowMenu(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = async (e) => {
    // e.preventDefault()

    await dispatch(thunkLogout());

    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div className="toppage">
        <div className="left-main">
          <div className="sticky-header">
            <img src={logo} className="wumlogo" onClick={() => navigate("/")} />
            <img src={logoMoble} className="wummoble" onClick={() => navigate("/")} />
            <div className="">
              {!user && (
                <>
                  <OpenModalButton
                    className={"log-in"}
                    modalComponent={<LoginFormModal />}
                    buttonText={
                      <>
                        <i
                          className="fa-solid fa-right-to-bracket"

                          style={{ fontSize: "16px", marginRight: "8px" }}
                        ></i>
                        <span
                          className="log-in-button"
                          title="Log In"
                          style={{ fontSize: "16px" }}

                        >
                          Log In
                        </span>
                      </>
                    }
                  />
                  <OpenModalButton
                    className={"signup"}
                    modalComponent={<SignupFormModal />}
                    buttonText={
                      <>
                        <i
                          className="fa-solid fa-user-plus"
                          style={{ fontSize: "16px", marginRight: "8px" }}
                        ></i>
                        <span
                          className="signup-button"
                          title="Sign Up"
                          style={{ fontSize: "16px" }}

                        >
                          Sign Up
                        </span>
                      </>
                    }
                  />
                </>
              )}
            </div>
            <div>
              {user && (
                <button className="home-button" onClick={() => navigate("/")}>
                  <i
                    className="fa-solid fa-house"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span
                  title="Home"
                  style={{ fontSize: "16px" }}

                   > Home </span>
                </button>
              )}
            </div>
            <div>
            {user && (
              <button
                className="explore-button"
                disabled={true}
                onClick={() => alert("Feature coming soon!")}
              >
                <i
                  className="fa-solid fa-map-location-dot"

                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span
                style={{ fontSize: "16px" }}
                title="Explore"
                >Explore</span>
              </button>
            )}
          </div>
            <div>
            {user && (
              <button
                className="activity-button"
                disabled={true}
                onClick={() => alert("Feature coming soon!")}
              >
                <i
                  className="fa-solid fa-bolt"

                  style={{ fontSize: "16px", marginRight: "8px" }}

                ></i>{" "}
                <span style={{ fontSize: "16px" }}
                title="Activity"
                >Activity</span>
              </button>
            )}
          </div>
            <div>
            {user && (
              <button
                className="messages-button"
                disabled={true}
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-face-smile"

                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}
                title="Messages"
                >Messages</span>
              </button>
            )}
          </div>
            <div>
            {user && (
              <button
                className="inbox-button"
                disabled={true}
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-envelope"

                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}
                title="Inbox">Inbox</span>
              </button>
            )}
          </div>

            <div>
            {user && (
              <button
                className="account-button"
                disabled={true}
                onClick={() => alert("Feature is under maintenance!")}
              >
                <i
                  className="fa-solid fa-user"

                  style={{ fontSize: "16px", marginRight: "8px" }}
                ></i>{" "}
                <span style={{ fontSize: "16px" }}
                 title="Account">Account</span>
              </button>
            )}
          </div>
          <div>
              {
                 <div className="dev">
                 <div>
                   <i
                   className="fa-brands fa-github"
                   style={{ fontSize: "16px", marginRight: "8px", color: "white" }}></i>
                   <NavLink
                     to="https://github.com/Ynnusexp"
                     style={{ fontSize: "16px", marginRight: "8px", color: "white", textDecoration:"none" }}
                   >
                     Light Vo
                   </NavLink>
                 </div>
               </div>
              }
            </div>

            <div>
              {user && (
                <button className="log-out-button" onClick={() => logout()}>
                  <i
                    className="fa-solid fa-door-closed"

                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}
                   title="Log Out">Log Out</span>
                </button>
              )}
            </div>

            <div>
              {user && (
                <OpenModalButton
                  buttonText={
                    <>
                      <i
                        className="fa-solid fa-pencil"
                        style={{ fontSize: "16px", marginRight: "4px" }}
                      ></i>
                      <span
                        className="create-word"
                        style={{ fontSize: "15px" }}
                        title="Create"
                      >
                        Create
                      </span>
                    </>
                  }
                  modalComponent={<CreatePost />}
                  className={"create-post "}
                />
              )}
              {/* <i className="fa-solid fa-pencil"></i> */}
            </div>
          </div>
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
