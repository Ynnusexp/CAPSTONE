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
import Navigation from "../Navigation/Navigation";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const allPosts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);
  //   console.log("POST HERE!!!!!!!!!!!!!!", allPosts)

  const filteredPosts = Object.values(allPosts);

  function formatDate(inputDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dateObj = new Date(inputDate);
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    const month = months[dateObj.getMonth()];

    return `${month} ${day}, ${year}`;
  }

  // const searchIcon = () => {
  //   return (
  //     <i className="fa fa-search" aria-hidden="true" id="search-icon"></i>
  //   )
  // }

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  return (
    <div className="outer">


      {/* <div className="home-page"> */}

        <div className="box-one">
          <Navigation />
        </div>

        <div className="all-posts">
          {filteredPosts
            .map((post) => (
              <div key={post?.id} className="each-post">
                <div className="post-header">
                  <div className="name-follow">
                    <p className="user-name">{post?.user}</p>
                    <NavLink
                      to={"/"}
                      className="follow"
                      // onClick={() => alert("Feature is under maintenance!")}
                      disabled={true}
                    >
                      Follow
                    </NavLink>
                  </div>
                </div>
                <p className="post-date">{formatDate(post?.updated_at)}</p>
                <h2 className="post-title">{post?.title}</h2>
                <div className="desc-container">
                  <div className="text-overflow-container">

                  <p className="post-description">{post?.description}</p>
                  </div>

                  </div>

                <img
                  src={post?.image}
                  className="post-image"
                  onClick={() => navigate(`/posts/${post?.id}`)}
                />

                <div className="notes-like-reply-delete-reblog">
                  <button
                    className="notes"
                    onClick={() => navigate(`/posts/${post?.id}`)}
                  >
                    <p className="notes-word">
                      <span className="notes-count">
                        {post?.comments?.length}{" "}
                      </span>
                      {post?.comments?.length === 1 ? "note" : "notes"}
                    </p>
                  </button>

                  <div className="feature-icons">
                    <div className="delete-edit">

                      {user && user?.id === post?.userId && (
                        <OpenModalButton
                          className={"edit-post"}
                          buttonText={<i className="fa-solid fa-pencil" style={{ fontSize: "24px", marginRight: "0px" }} title="Edit"></i>}
                          modalComponent={<UpdatePost post={post} />}
                        />
                      )}
                      {user && user?.id === post?.userId && (
                        <OpenModalButton
                          className={"delete-post"}
                          buttonText={<i className="fa-solid fa-trash" style={{ fontSize: "24px", marginRight: "0px" }} title="Delete"></i>}
                          modalComponent={<DeletePost postId={post?.id} />}
                        />
                      )}
                    </div>
                    <button
                      className="share"
                      onClick={() => alert("Feature coming soon!")}
                      disabled={true}
                      title="Share"
                    >
                      <i
                        className="fa-solid fa-share"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </button>
                    <button
                      className="reply"
                      onClick={() => navigate(`/posts/${post?.id}`)}
                      title="Reply"
                    >
                      <i
                        className="fa-solid fa-comment"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </button>
                    <button
                      className="reblog"
                      disabled={true}
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
                      disabled={true}
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
        <div className="right-main-wrapper">

        <div className="right-main">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => alert("Feature is under maintenance!")}
            placeholder={"Search Wumblr"}
            disabled={true}
          />
        </div>


        </div>

      </div>
    // </div>
  );
};

export default HomePage;
