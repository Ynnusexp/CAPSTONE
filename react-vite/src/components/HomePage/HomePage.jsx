import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [search, setSearch] = useState();
  const allPosts = useSelector((state) => state.posts);
//   console.log("POST HERE!!!!!!!!!!!!!!", allPosts)

  const filteredPosts = Object.values(allPosts);

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  return (
    <>
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => alert("Feature is under maintenance!")}
        placeholder="Search Wumblr"
      />
      <div className="each-post">
        {/* <h1 > Welcome to your corner of the internet </h1> */}
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <p>{post?.user}</p>
            {/* <button onClick={() => navigate(`/posts/${post.id}`)} >
              FOLLOW
            </button> */}
            <button onClick={() => alert("Feature is under maintenance!")} >
              FOLLOW
            </button>
            {/* <NavLink to={"/"}>
            FOLLOW
             </NavLink> */}
            <p>{post?.date}</p>
            <p>{post?.title}</p>
            <p>{post?.description}</p>
            <img src={post?.image} />
            <button onClick={() => navigate(`/posts/${post.id}`)} >
            <p> {post?.comments.length}  notes </p>
            </button>

            {/* <button onClick={() => alert("Feature is under maintenance!")} >
              COMMENTS
            </button> */}
            <button onClick={() => navigate(`/posts/${post.id}`)} >
              REPLY
            </button>
            <button onClick={() => alert("Feature is under maintenance!")} >
              LIKE
            </button>

          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
