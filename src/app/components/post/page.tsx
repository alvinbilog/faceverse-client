// @ts-nocheck
'use client';
import React, { useContext, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PostInterface, UserContextProps, UserInterface } from '@/app/types';
import { UserContext } from '@/app/providers';
import apiClient from '@/app/api/apiClient';
import postServices from '@/app/api/post/postApi';
import commentServices from '@/app/api/comment/commentApi';
import PostList from '../postList/page';
import UserPostList from '../userPostList/page';

export default function Post({ userId }: { userId?: string }) {
  const {
    isLoading,
    isError,
    error,
    data: data,
    isFetching,
    isPreviousData,
  } = useQuery<PostInterface[] | UserInterface, Error>(
    ['post', userId],
    async () => {
      let endpoint = 'post/all';
      let params = { populate: 'author, comments' };

      if (userId) {
        endpoint = `user/posts/${userId}`;
        params = { populate: 'posts, comments' };
      }
      const { data } = await apiClient.get(endpoint, {
        params,
      });

      if (data) {
        return data.data;
      }
      throw new Error('No data received');
    }
  );

  // Sort post by date
  const sortedPosts: PostInterface[] | UserInterface[] | undefined =
    Array.isArray(data)
      ? data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      : undefined;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {userId ? (
        // type is UserInterface
        <div className="">
          <UserPostList data={data as UserInterface} />
        </div>
      ) : (
        // type is PostInterface
        <div className="">
          {sortedPosts?.map((post: PostInterface) => (
            <PostList post={post} key={post._id} />
          ))}
        </div>
      )}
    </>
  );
}
