// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import logo from "../../../public/wumblr-high-resolution-logo-white-transparent.png";
import logoMoble from "../../../public/favicon.ico";
// import ad from "../../../public/aalogo.png";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../Post/CreatePost";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Floater() {
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
    <div className="">
      <div className="">
        <div className="">
          <div className="test">
            <img src={logo} className="wumlogo" onClick={() => navigate("/")} />
            <img
              src={logoMoble}
              className="wummoble"
              onClick={() => navigate("/")}
            />
            <div className="auth">
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
                          title="Log In"
                        ></i>
                        <span
                          className="log-in-button s-icon"
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
                          title="Sign Up"
                        ></i>
                        <span
                          className="signup-button s-icon"
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
                <button className="home-button" title="Home" onClick={() => navigate("/")}>
                  <i
                    className="fa-solid fa-house"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}
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
                  title="Explore"
                >
                  <i
                    className="fa-solid fa-map-location-dot"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}

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
                  title="Activity"
                >
                  <i
                    className="fa-solid fa-bolt"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}

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
                  title="Messages"
                >
                  <i
                    className="fa-solid fa-face-smile"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}

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
                  title="Inbox"
                >
                  <i
                    className="fa-solid fa-envelope"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}

                  >Inbox</span>
                </button>
              )}
            </div>

            <div>
              {user && (
                <button
                  className="account-button"
                  disabled={true}
                  onClick={() => alert("Feature is under maintenance!")}
                  title="Account"
                >
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}
                  >Account</span>

                </button>
              )}
            </div>
            <div>
              {user && (
                <button className="log-out-button" onClick={() => logout()}
                title="Log Out">

                  <i
                    className="fa-solid fa-door-closed"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>{" "}
                  <span style={{ fontSize: "16px" }}

                  >Log Out</span>
                </button>
              )}
            </div>
            <div>
              {user && (
                <button className="glass-button">
                  <i
                    className="fa fa-search "
                    aria-hidden="true"
                    id="search-icon"
                    disabled={true}
                  ></i>
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
                        title="Create"
                      ></i>
                      <span
                        className="create-word"

                        style={{ fontSize: "15px" }}
                      >
                        Create
                      </span>
                    </>
                  }
                  modalComponent={<CreatePost />}
                  className={"create-post "}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Floater;
