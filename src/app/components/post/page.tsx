import apiClient from '@/app/api/apiClient';
import { useQuery } from 'react-query';
import Comments from '../comments/page';
import Author from '../author/page';
import PostButtons from '../postBottons/page';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import OutsideClickHandler from 'react-outside-click-handler';
import { CommentInterface, PostInterface, UserInterface } from '@/app/types';

export default function PostList() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    isPreviousData,
  } = useQuery<PostInterface[], Error>({
    queryKey: ['post'],
    queryFn: async () => {
      const { data } = await apiClient.get('post/all', {
        //old
        // params: { populate: 'author' },

        //nested populate
        params: { populate: 'author, comments' },
      });
      if (data) {
        return data.data;
      }
      throw new Error('No data received');
    },
  });
  //Sort post by date
  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="">
        {sortedPosts?.map((post: any) => (
          <div
            key={post._id}
            className="bg-[#f6f4f2] p-4 rounded shadow-md mb-10"
          >
            <div className="flex justify-between items-center mb-2 ">
              {post.author?.map((postAuthor: UserInterface) => (
                <Author postAuthor={postAuthor} key={postAuthor._id} />
              ))}
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpenDropdownId(null);
                }}
              >
                <div
                  className="relative inline-block text-left"
                  ref={dropdownRef}
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => setOpenDropdownId(post._id)}
                    className="text-md cursor-pointer"
                  />
                  {openDropdownId === post._id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </OutsideClickHandler>
            </div>
            {post.content && (
              <p className="text-gray-800 mb-2 ml-1">{post.content}</p>
            )}
            {post.image && (
              <img
                src={post.image}
                alt="Post image"
                className="rounded-md mb-2"
              />
            )}
            {/* likes and comments */}
            <PostButtons />
            {post.comments?.length > 0 && (
              <div className="space-y-2 mt-4 pl-4 border-l-2 border-indigo-200">
                {post.comments.map((comment: CommentInterface) => (
                  <Comments comment={comment} key={comment._id} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
