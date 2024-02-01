import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "./HomePage.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreatePost from "../Post/CreatePost";
import DeletePost from "../Post/DeletePost";
import UpdatePost from "../Post/EditPost";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [search, setSearch] = useState();
  const allPosts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user)
  //   console.log("POST HERE!!!!!!!!!!!!!!", allPosts)

  const filteredPosts = Object.values(allPosts);

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);


  return (
    <>
      <div className="left-main">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => alert("Feature is under maintenance!")}
          placeholder="Search Wumblr"
        />
       {user && < OpenModalButton
          buttonText={"Create Post"}
          modalComponent={<CreatePost />}
        />}
      </div>

      <div className="all-posts">
        {/* <h1 > Welcome to your corner of the internet </h1> */}
        {filteredPosts.map((post) => (
          <div key={post.id} className="each-post">
            <div className="post-header">
              <div className='name-follow'>
                <p>{post?.user}</p>
                {/* <button onClick={() => navigate(`/posts/${post.id}`)} >
              FOLLOW
            </button> */}
                <button className="follow" onClick={() => alert("Feature is under maintenance!")} >
                  FOLLOW
                </button>
              </div>
              {/* <NavLink to={"/"}>
            FOLLOW
          </NavLink> */}
              <p className='post-date'>{post?.date}</p>
            </ div>
            <h2 className='post-title'>{post?.title}</h2>
            <p className='post-description'>{post?.description}</p>
            <img src={post?.image} className='post-image' />
            <button onClick={() => navigate(`/posts/${post.id}`)} >
              <p> {post?.comments?.length}  notes </p>
            </button>

            {/* <button onClick={() => alert("Feature is under maintenance!")} >
              COMMENTS
            </button> */}
            <div className="like-reply-delete">
              <button className='reply' onClick={() => navigate(`/posts/${post.id}`)} >
                REPLY
              </button>
              <button className='like' onClick={() => alert("Feature is under maintenance!")} >
                LIKE
              </button>
              {user && user.id === post.userId && < OpenModalButton
                buttonText={"Delete Post"}
                modalComponent={<DeletePost postId={post.id} />}
              />}
              {user && user.id === post.userId && <OpenModalButton
                buttonText={"Edit Post"}
                modalComponent={<UpdatePost post={post} />}
              />
              }
            </div>
          </div>
        )).reverse()}
      </div>
    </>
  );
};

export default HomePage;
