import { comment } from 'postcss';
import apiClient from '../apiClient';

export const commentServices = {
  createComment,
  updateComment,
  deleteComment,
};
export default commentServices;
async function createComment(
  authorId: string[] | null | undefined,
  postId: string[] | null | undefined,
  content: string
) {
  try {
    const response = await apiClient.post('comment/', {
      author: authorId,
      post: postId,
      content: content,
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}
async function updateComment() {
  //
  try {
  } catch (error: any) {
    console.log(error.message);
  }
}
async function deleteComment(commentId: string | undefined) {
  if (!commentId) {
    throw new Error('Post ID is undefined.');
  }
  try {
    const response = await apiClient.delete(`comment/delete/${commentId}`);
    console.log('here');
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}
