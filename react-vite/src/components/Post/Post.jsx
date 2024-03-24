import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { thunkGetOnePost } from "../../redux/post";
import { useParams } from "react-router-dom";
import { thunkGetOneComment } from "../../redux/comment";
import "./Post.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteComment from "../CommentSection/DeleteComment";
import CreateComment from "../CommentSection/CreateComment";
import UpdateComment from "../CommentSection/UpdateComment";
import Navigation from "../Navigation/Navigation";
import { Floater } from "../Navigation";

const Post = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [search, setSearch] = useState();
  const currentPost = useSelector((state) => state.posts);
  const comments = useSelector((state) => Object.values(state.comments));
  const user = useSelector((state) => state.session.user);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(thunkGetOnePost(postId));
      await dispatch(thunkGetOneComment(postId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, postId]);

  function formatDate(inputDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];

    return `${month} ${day}, ${year}`;
  }

  

  return (
    <>
    {loading? (
      <div className="flicker">
        <h1 className="loading"> LOADING ... PLEASE WAIT </h1>
      </div>
    ) : (
    <div className="home-page">
      <div className="box-one">
        <Navigation />
      </div>
      <div className="box-floor">
          <Floater />
        </div>
      <div className="all-posts">
        <div key={currentPost.id} className="each-post">
          <div className="post-header">
            <div className="name-follow">
              <p>{currentPost?.user}</p>
            </div>
          </div>
          <p className="post-date">{formatDate(currentPost?.updated_at)}</p>
          <h2 className="post-title">{currentPost?.title}</h2>
          <div className="text-overflow-container">
          <p className="post-description">{currentPost?.description}</p>
            </div>
          <img src={currentPost?.image} className="post-image" />
        </div>
        <div>
          {user && (
            <div className="comment-create">
              <OpenModalButton
                buttonText={"Post Comment"}
                className={"create-comment"}
                modalComponent={<CreateComment />}
              />
            </div>
          )}
          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="commnamedate">
                  <div>{comment?.user}</div>
                  {formatDate(comment.updated_at)}
                </div>
                <div className="text-overflow-container">
                {comment?.description}
                </div>
                <div className="icons">
                  <button
                    className="like"
                    disabled={true}
                    onClick={() => alert("Feature is under maintenance!")}
                  >
                    <i
                      className="fa-solid fa-heart"
                      style={{ fontSize: "24px" }}
                      title="Like"
                    ></i>
                  </button>
                  <button
                    className="reply2"
                    disabled={true}
                    onClick={() => alert("Feature is under maintenance!")}
                  >
                    <i
                      className="fa-solid fa-comment"
                      style={{ fontSize: "24px" }}
                      title="Reply"
                    ></i>
                  </button>
                  {user && comment?.userId === user?.id && (

                    <OpenModalButton
                      className={"edit-post"}
                      buttonText={<i className="fa-solid fa-pencil" style={{ fontSize: "24px", marginRight: "0px" }} title="Edit"></i>}
                      modalComponent={<UpdateComment comment={comment} />}
                    />
                  )}
                  {user && comment?.userId === user?.id && (
                    <OpenModalButton
                      className={"delete-post"}
                      buttonText={<i className="fa-solid fa-trash" style={{ fontSize: "24px", marginRight: "0px" }} title="Delete"></i>}
                      modalComponent={<DeleteComment commentId={comment.id} />}
                    />

                  )}
                </div>
              </div>
            )).reverse()}
        </div>
        {user && comments?.length === 0 && (
          <p className="first-to-reply">Be the first to reply!</p>
        )}
      </div>
      {/* <div className="right-main">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => alert("Feature is under maintenance!")}
          placeholder={<i className="fa fa-search" aria-hidden="true" id='search-icon'></i> && "Search Wumblr"}
          disabled={true}
        />
      </div> */}

    </div>
    )}
    </>
  );
};

export default Post;
