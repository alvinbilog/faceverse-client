import Link from 'next/link';
import { CommentInterface, PostInterface, UserContextProps } from '@/app/types';
import { useContext, useRef, useState } from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from 'react-query';
import commentServices from '@/app/api/comment/commentApi';
import { formatDate } from '@/app/utils';
import { Dialog, Menu } from '@headlessui/react';
import { UserContext } from '@/app/providers';

interface CommentsProps {
  comment: CommentInterface;
  postData: PostInterface | null;
}

export default function CommentsProfile({ comment, postData }: CommentsProps) {
  console.log('postData', postData);
  console.log('comment', comment);
  let [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext) as UserContextProps;
  const textAreaRef = useRef(null);
  const [newComment, setNewComment] = useState('');

  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation(
    ({
      commentId,
      newComment,
    }: {
      commentId: string | undefined;
      newComment: { content: string | undefined };
    }) => commentServices.updateComment(commentId, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    }
  );

  const deleteCommentMutation = useMutation(
    (commentId: string | undefined) => commentServices.deleteComment(commentId),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    }
  );

  function handleEditComment(commentId: string, commentContent: string) {
    const newComment = {
      content: commentContent,
    };
    updateCommentMutation.mutate({ commentId, newComment });
  }

  function handleDeleteComment(commentId: string) {
    console.log('commentId ', commentId);
    deleteCommentMutation.mutate(commentId);
  }
  return (
    <div>
      <div className="flex justify-between mb-1 ">
        {/* {comment.author} */}
        {comment.author?.map((commentAuthor: any) => (
          <div className="flex items-center  w-full" key={commentAuthor._id}>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23E0E0E0'/%3E%3Cpath d='M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17ZM16 19C12.1411 19 4 20.6863 4 24V26H28V24C28 20.6863 19.8589 19 16 19Z' fill='%23BDBDBD'/%3E%3C/svg%3E"
              alt="User Profile"
              className="h-11 w-11 rounded-full border-2 border-white mr-2"
            />
            <div className="flex-1">
              <Link
                //   href={`/profile/${comment.author}`}
                href={`/`}
                className="text-indigo-600 font-medium flex-grow"
              >
                <span>
                  {commentAuthor.firstName} {commentAuthor.lastName}
                </span>
              </Link>
              <div>
                <span className="text-gray-600 text-xs font-normal ">
                  {formatDate(commentAuthor.updatedAt.toLocaleString())}
                </span>
              </div>
            </div>
            <Menu>
              <div className="relative inline-block text-left">
                {user?.data._id === commentAuthor._id ||
                user?.data._id === postData?._id ? (
                  <Menu.Button>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-md cursor-pointer"
                    />
                  </Menu.Button>
                ) : (
                  ''
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
                          console.log('commentId', comment._id);
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
                          handleDeleteComment(comment._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </div>
            </Menu>
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
                <Dialog.Title>Edit Comment</Dialog.Title>

                <textarea
                  ref={textAreaRef}
                  className="w-full p-2 border rounded "
                  placeholder={comment.content}
                  onChange={(e) => setNewComment(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                ></textarea>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <button
                      className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mr-5"
                      onClick={() => {
                        handleEditComment(comment._id, newComment);
                        setIsOpen(false);
                      }}
                      ref={textAreaRef}
                    >
                      Update
                    </button>
                    <button
                      className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      ref={textAreaRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </div>
        ))}
      </div>
      <p className="text-gray-700 pl-4">{comment.content}</p>
      {/* <p>{user?.data._id}</p> */}
    </div>
  );
}
