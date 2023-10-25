import React, { useContext, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PostInterface, UserContextProps } from '@/app/types';
import { UserContext } from '@/app/providers';
import apiClient from '@/app/api/apiClient';
import postServices from '@/app/api/post/postApi';
import commentServices from '@/app/api/comment/commentApi';
import PostList from '../postList/page';

export default function Post() {
  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    isPreviousData,
  } = useQuery<PostInterface[], Error>('post', async () => {
    const { data } = await apiClient.get('post/all', {
      //old
      params: { populate: 'author' },

      //nested populate
      // params: { populate: 'author, comments' },
    });

    if (data) {
      return data.data;
    }
    throw new Error('No data received');
  });

  //Sort post by date
  const sortedPosts: PostInterface[] | undefined = posts?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="">
        {sortedPosts?.map((post: PostInterface) => (
          <PostList post={post} key={post._id} />
        ))}
      </div>
    </>
  );
}
