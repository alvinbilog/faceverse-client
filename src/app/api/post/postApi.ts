import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';

export const postServices = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};

export default postServices;

async function createPost(
  author: string | null | undefined,
  content: string,
  image?: string
) {
  try {
    const response = await apiClient.post('post/', { author, content, image });
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {
  //
}
async function getPost() {
  //
}
async function updatePost(
  postId: string | undefined,
  updatedData: { content?: string | undefined }
) {
  if (!postId) {
    throw new Error('Post ID is undefined');
  }

  try {
    const response = await apiClient.put(`post/update/${postId}`, updatedData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function deletePost(postId: string | undefined) {
  if (!postId) {
    throw new Error('Post ID is undefined.');
  }
  try {
    const response = await apiClient.delete(`post/delete/${postId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
