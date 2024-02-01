import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import {thunkGetOneComment} from "../../redux/comment"




const CommentSection = () => {
    const dispatch = useDispatch();

    const allComments = useSelector((state) => state?.comments)

    const { postId } = useParams;



    useEffect(()=> {
        const fetch = async () => {
            await dispatch(thunkGetOneComment(postId))
        };
        fetch();
    }, [dispatch, postId]);

    if(!allComments) return null
    
    const filteredComments = Object.values(allComments)
    return (
        <>
        <p> DESCRIPTION: {filteredComments?.description} </p>
        </>


    )
}

export default CommentSection
