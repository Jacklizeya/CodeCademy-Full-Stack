import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCommentsForArticleId,
  selectComments,
  isLoadingComments,
} from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  // Declare additional selected data here.
  const currentComments = useSelector(selectComments);
  const commentsAreLoading = useSelector(isLoadingComments);

  // Dispatch loadCommentsForArticleId with useEffect here.
  useEffect(() => {
    console.log("article", article)
    console.log("comment before dispatch", currentComments); 
    if (article) { 
      dispatch(loadCommentsForArticleId(article.id)); }
      console.log("comment after dispatch", currentComments);
  }, [dispatch, article])

  // article doesnot exist, no comment
  if (!article) return null;  
  if (commentsAreLoading) return <div>Loading Comments</div>;
 
  const commentContent = currentComments["comments"] //this is an array

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments </h3>     
      <CommentList comments={commentContent} />
      <CommentForm articleId={article.id} />
    </div>
  );
};

export default Comments;
