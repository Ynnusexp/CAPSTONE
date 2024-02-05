import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { thunkGetOnePost } from "../../redux/post";
import { useParams } from "react-router-dom";
import { thunkGetOneComment } from "../../redux/comment";
import "./Post.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteComment from "../CommentSection/DeleteComment";
import CreateComment from "../CommentSection/CreateComment";
import UpdateComment from "../CommentSection/UpdateComment";

const Post = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const currentPost = useSelector((state) => state.posts);
  const comments = useSelector((state) => Object.values(state.comments));
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(thunkGetOnePost(postId));
      await dispatch(thunkGetOneComment(postId));
    };

    fetchData();
  }, [dispatch, postId]);

  // if (!currentPost) return null
  // if (!comments) return null

  return (
    <>
      <div className="maincont">
        <div key={currentPost.id} className="each-post">
          <div className="post-header">
            <div className="name-follow">
              <p>{currentPost?.user}</p>
            </div>
            <p className="post-date">{currentPost?.date}</p>
          </div>
          <h2 className="post-title">{currentPost?.title}</h2>
          <p className="post-description">{currentPost?.description}</p>
          <img src={currentPost?.image} className="post-image" />
        </div>
        <div>
          {user && (
            <div>
              <OpenModalButton
                buttonText={"Create Comment"}
                modalComponent={<CreateComment />}
              />
            </div>
          )}
          {user && comments?.length === 0 && (
  <p className="first-to-reply">Be the first to Reply!</p>
)}
          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="commnamedate">
                  <div>{comment?.user}</div>
                  {comment.date}
                </div>
                {comment?.description}
                {user && comment?.userId === user?.id && (
                  <div>
                    <OpenModalButton
                      buttonText={"Delete Comment"}
                      modalComponent={<DeleteComment commentId={comment.id} />}
                    />
                    <OpenModalButton
                      buttonText={"Edit Comment"}
                      modalComponent={<UpdateComment comment={comment} />}
                    />
                  </div>
                )}
                <button
                  className="reply"
                  onClick={() => alert("Feature is under maintenance!")}
                >
                  REPLY
                </button>
                <button
                  className="like"
                  onClick={() => alert("Feature is under maintenance!")}
                >
                  LIKE
                </button>
              </div>
            )).reverse()}
        </div>
      </div>
    </>
  );
};

export default Post;
