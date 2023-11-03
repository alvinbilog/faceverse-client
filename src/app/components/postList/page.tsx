// @ts-nocheck
'use client';
import Link from 'next/link';
import { CommentInterface, PostInterface, UserContextProps } from '@/app/types';
import { formatDate } from '@/app/utils';
import {
  faEllipsis,
  faImage,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dialog } from '@headlessui/react';
import React, { useContext, useRef, useState } from 'react';
import Comments from '../comments/page';
import PostButtons from '../postBottons/page';
import { useMutation, useQueryClient } from 'react-query';
import commentServices from '@/app/api/comment/commentApi';
import postServices from '@/app/api/post/postApi';
import { UserContext } from '@/app/providers';

interface PostListProps {
  post: PostInterface;
}

export default function PostList({ post }: PostInterface[]) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef(null);

  const [newContent, setNewContent] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [postData] = useState<PostInterface | null>(post);
  const { user } = useContext(UserContext) as UserContextProps;

  const userId = (user?.data._id ?? '').toString();

  const createCommentMutation = useMutation(
    (postAuthor: string) =>
      commentServices.createComment(
        user?.data._id ? [user?.data?._id] : [],
        postAuthor ? [postAuthor] : [],
        commentContent
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    }
  );

  const editPostMutation = useMutation(
    ({
      postId,
      updatedPost,
    }: {
      postId: string | null;
      updatedPost: { content: string | null };
    }) => postServices.updatePost(postId, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    }
  );

  const deletePostMutation = useMutation(
    (postIdString: string | null) => postServices.deletePost(postIdString),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    }
  );

  function handleDeletePost(postId: string) {
    deletePostMutation.mutate(postId);
  }

  function handleEditPost(postId: string | null) {
    // setIsOpen(true);
    const updatedPost = {
      content: newContent,
    };
    editPostMutation.mutate({ postId: postId, updatedPost });
  }

  function handleCommentSubmit(postAuthor: string) {
    createCommentMutation.mutate(postAuthor);
    setCommentContent('');
  }

  return (
    <div>
      <div className="bg-[#f6f4f2] p-4 rounded shadow-md mb-10">
        {/* author */}
        <div className="flex justify-between items-center mb-2 ">
          <div className="flex items-center ">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23E0E0E0'/%3E%3Cpath d='M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17ZM16 19C12.1411 19 4 20.6863 4 24V26H28V24C28 20.6863 19.8589 19 16 19Z' fill='%23BDBDBD'/%3E%3C/svg%3E"
              alt="User Profile"
              className="h-11 w-11 rounded-full border-2 border-white mr-2"
            />
            <div>
              <Link
                // href={`/profile/${postAuthor}`}
                href={`/`}
                className="text-indigo-600 font-bold"
              >
                <span>
                  {post?.author?.firstName} {post?.author?.lastName}
                  {/* <p>login user id {user?.data._id}</p>
                  <p>author id of post {post.author._id}</p>
                  <p>Post Id {post._id}</p>
                  <p>postdata author id {postData?.author._id}</p> */}
                </span>
              </Link>
              <div>
                <span className="text-gray-600 text-xs font-normal ">
                  {formatDate(post?.author?.updatedAt.toLocaleString())}
                </span>
              </div>
            </div>
          </div>
          <Menu>
            <div className="relative inline-block text-left">
              {post?.author?._id.trim() === userId.trim() && (
                <Menu.Button>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="text-md cursor-pointer"
                  />
                </Menu.Button>
              )}
              <Menu.Items
                className={
                  'absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30'
                }
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        active
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setNewContent(post?.content);
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        active
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        handleDeletePost(post?._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </div>
          </Menu>
        </div>
        {/* Update Modal */}
        <Dialog
          as="div"
          initialFocus={textAreaRef}
          open={isOpen}
          onClose={() => {
            // setIsOpen(false);
          }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={(e) => e.stopPropagation()}
          ></div>
          <Dialog.Panel className="relative z-50 w-1/2 bg-white p-4 rounded shadow-md mx-auto ">
            <Dialog.Title>Edit Post</Dialog.Title>

            <textarea
              ref={textAreaRef}
              className="w-full p-2 border rounded "
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            ></textarea>
            <div className="flex items-center justify-between mt-2">
              {/* upload image */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon icon={faImage} className="text-indigo-600" />
                <span className="text-indigo-600 text-xs">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
              <div>
                <button
                  className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mr-5"
                  onClick={() => {
                    handleEditPost(postData?._id);
                    setIsOpen(false);
                  }}
                >
                  Update
                </button>
                <button
                  className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

        {/* content */}
        {post?.content && (
          <p className="text-gray-800 mb-2 ml-1">{post?.content}</p>
        )}
        {/* image */}
        {post?.image && (
          <img src={post?.image} alt="Post image" className="rounded-md mb-2" />
        )}
        {/* likes and comments */}
        <PostButtons />
        {(post?.comments?.length ?? 0) > 0 && (
          <div className="space-y-2 mt-4 pl-4 border-l-2 border-indigo-200">
            {post?.comments?.map((comment: CommentInterface) => (
              <Comments
                comment={comment}
                key={comment?._id}
                postData={postData}
              />
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4 mt-2 ">
          {/* <button className="flex items-center text-gray-600 hover:text-indigo-600">
Like
</button> */}
          {/* Comment Input */}
          <div className="mt-4 flex  w-full p-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full border rounded-md ps-2"
            />
            <button
              onClick={() => handleCommentSubmit(post?._id)}
              className="ml-5 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 "
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-sm " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
