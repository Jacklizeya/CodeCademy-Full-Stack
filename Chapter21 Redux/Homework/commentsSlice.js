// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (currentArticleid) => {
    const response = await fetch(`api/articles/${currentArticleid}/comments`);
    const replyfromdatabase = await response.json();
    console.log("In thunk function payload", replyfromdatabase)
    return replyfromdatabase;
    // only grab the right comments
  }
)
           
// Create postCommentForArticleId here.
export const postCommentsForArticleId = createAsyncThunk(
  'comments/postCommentsForArticleId',
  async ({articleId, comment}) => {
    console.log("enter the thunk function")
    let requestBody = JSON.stringify(comment)
    console.log("requestbody is ", requestBody)
    const response = await fetch(`api/articles/${articleId}/comments`, {
      method: "POST",
      body: requestBody
    });
    console.log("response", response)
    const replyfromdatabase = await response.json();
    console.log("payload", requestBody)
    let id = replyfromdatabase.id
    let text = comment
    return {id, text}; // this is the action.payload
    // only grab the right comments
  }
)


export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    currentComment:{},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
  },
  // Add extraReducers here.
  extraReducers: (builder) => {
      builder
        .addCase(loadCommentsForArticleId.pending, (state, action) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        }) 
        .addCase(loadCommentsForArticleId.rejected, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        })
        .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            state.currentComment = action.payload;})
          .addCase(postCommentsForArticleId.pending, (state, action) => {
            state.createCommentIsPending = true;
            state.failedToCreateComment = false;            
            })
            .addCase(postCommentsForArticleId.rejected, (state, action) => {
            state.createCommentIsPending = false;
            state.failedToCreateComment = true;
           })
           .addCase(postCommentsForArticleId.fulfilled, (state, action) => {
            state.createCommentIsPending =  false;
            state.failedToCreateComment = false;
            state.currentComment["comments"].push(action.payload)
            })
        // .addCase()
        // .addCase()
        // .addCase()
  }
});

export const selectComments = (state) => state.comments.currentComment;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
