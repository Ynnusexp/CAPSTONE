import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOneComment } from "../../redux/comment";

const CommentSection = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const comments = useSelector((state) => Object.values(state.comments));

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetOneComment(postId));
        };

        fetchData();
    }, [dispatch, postId]);

    if (!comments) return null;

    console.log("COMMENTS", comments);

    return (
        <>
            {comments.map((comment) => (
                <div key={comment.id} className='comment'>
                    {comment.description}
                </div>
            ))}
        </>
    );
};

export default CommentSection;
