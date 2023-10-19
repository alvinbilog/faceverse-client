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
  author: number | null | undefined,
  content: string,
  image?: string
) {
  const response = await apiClient.post('post/', { author, content, image });
  return response;
}
async function getPosts() {
  //
}
async function getPost() {
  //
}
async function updatePost() {
  //
}
async function deletePost(author: string) {
  // const response = await apiClient.delete('post/delete:id', { author });
  // return response;
}
