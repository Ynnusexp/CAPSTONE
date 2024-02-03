import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import CreatePost from "../Post/CreatePost";
import DeletePost from "../Post/DeletePost";
import UpdatePost from "../Post/UpdatePost";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPosts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);
  //   console.log("POST HERE!!!!!!!!!!!!!!", allPosts)

  const filteredPosts = Object.values(allPosts);

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* <div className="left-main">
      <div>
          {user && (
            <button className="home-button"
            onClick={() => navigate("/")}>
              HOME
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
        </div>

        <div>
          {user && (
            <OpenModalButton
              buttonText={"Create Post"}
              modalComponent={<CreatePost />}
            />
          )}
        </div>
      </div> */}

      <div className="all-posts">
        {/* <h1 > Welcome to your corner of the internet </h1> */}
        {filteredPosts
          .map((post) => (
            <div key={post.id} className="each-post">
              <div className="post-header">
                <div className="name-follow">
                  <p className="user-name">{post?.user}</p>
                  <NavLink
                    to={"/"}
                    className="follow"
                    onClick={() => alert("Feature is under maintenance!")}
                  >
                    Follow
                  </NavLink>
                </div>
              </div>
              <p className="post-date">{post?.date}</p>
              <h2 className="post-title">{post?.title}</h2>
              <p className="post-description">{post?.description}</p>
              <img
                src={post?.image}
                className="post-image"
                onClick={() => navigate(`/posts/${post.id}`)}
              />
              <div className="delete-edit">

              {user && user.id === post.userId && (
                <OpenModalButton
                  deletePost={"delete-post"}
                  // buttonText={"Delete"}
                  modalComponent={<DeletePost postId={post.id} />}
                  // <i className="fa-solid fa-trash"></i>
                />
              )}
              {user && user.id === post.userId && (
                <OpenModalButton
                  editPost={"edit-post"}
                  // buttonText={"Edit"}
                  modalComponent={<UpdatePost post={post} />}

                  // <i className="fa-solid fa-pencil"></i>
                />
              )}
                </div>


              {/* <button onClick={() => alert("Feature is under maintenance!")} >
              COMMENTS
            </button> */}
              <div className="notes-like-reply-delete-reblog">
                <button
                  className="notes"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  <p className="notes-word">
                    <span className="notes-count">
                      {post?.comments?.length}{" "}
                    </span>
                    {post?.comments?.length === 1 ? "note" : "notes"}
                  </p>
                </button>

                <div className="feature-icons">

                <button
                  className="share"
                  onClick={() => alert("Feature coming soon!")}
                  title="Share"
                >
                  <i
                    className="fa-solid fa-share"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
                <button
                  className="reply"
                  onClick={() => navigate(`/posts/${post.id}`)}
                  title="Reply"
                >
                  <i
                    className="fa-solid fa-comment"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
                <button
                  className="reblog"
                  onClick={() => alert("Feature coming soon!")}
                  title="Reblog"
                >
                  <i
                    className="fa-solid fa-retweet"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
                <button
                  className="like"
                  onClick={() => alert("Feature coming soon!")}
                  title="Like"
                >
                  <i
                    className="fa-solid fa-heart"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>


                </div>

              </div>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default HomePage;
