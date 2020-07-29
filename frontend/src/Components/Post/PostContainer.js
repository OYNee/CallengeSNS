import React, {useState, useEffect} from "react";
import propTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";


const PostContainer = ({ 
    id, 
    user, 
    files, 
    likeCount, 
    isLiked, 
    comments, 
    createdAt }) => {
        const [isLikedS, setIsLiked] = useState(isLiked)
        const [likeCountS, setLikeCount] = useState(likeCount);
        const [currentItem, setCurrentItem] = useState(0);
        const [selfComments, setSelfComments] = useState([]);
        const comment = useInput("");
        const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
            variables: { postId: id }
          });
          const addCommentMutation = useMutation(ADD_COMMENT, {
            variables: { postId: id, text: comment.value }
          });
        const slide = () => {
            const totalFiles = files.length;
            if (currentItem === totalFiles - 1) {
              setTimeout(() => setCurrentItem(0), 3000);
            } else {
              setTimeout(() => setCurrentItem(currentItem + 1), 3000);
            }
          };
          useEffect(() => {
            slide();
          }, [currentItem]);
          
        const toggleLike = () => {
        toggleLikeMutation();
        if (isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
        };
        const onKeyPress = async event => {
            const { which } = event;
            if (which === 13) {
              event.preventDefault();
              try {
                const {
                  data: { addComment }
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
              } catch {
                toast.error("Cant send comment");
              }
        }

    };
        

    return <PostPresenter 
        user={user}
        files={files}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        newComment={comment}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
    />;
};

PostContainer.propTypes = {
id: propTypes.string.isRequired, 
user: propTypes.shape({
    id:propTypes.string.isRequired,
    avatar:propTypes.string,
    username:propTypes.string.isRequired
}).isRequired, 
files: propTypes.arrayOf(propTypes.shape({
    id:propTypes.string.isRequired,
    url: propTypes.string.isRequired
})
).isRequired, 
likeCount: propTypes.number.isRequired, 
isLiked: propTypes.bool.isRequired, 
comments: propTypes.arrayOf(
    propTypes.shape({
    id:propTypes.string.isRequired,
    text:propTypes.string.isRequired,
    user:propTypes.shape({
        id:propTypes.string,
        username:propTypes.string.isRequired
    }).isRequired
})
).isRequired, 
createdAt: propTypes.string.isRequired
};

export default PostContainer;