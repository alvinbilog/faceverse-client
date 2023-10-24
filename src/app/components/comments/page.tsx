import Link from 'next/link';
import CommentAuthor from '../commentAuthor/page';
import { CommentInterface } from '@/app/types';
import { useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CommentsProps {
  comment: CommentInterface;
}

export default function Comments({ comment }: CommentsProps) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    console.log(commentText);
    setCommentText('');
  };
  return (
    <div>
      <div className="flex justify-between mb-1">
        <Link
          //   href={`/profile/${comment.author}`}
          href={`/`}
          className="text-indigo-600 font-medium"
        >
          {/* {comment.author} */}
          {comment.author?.map((commentAuthor: any) => (
            <CommentAuthor
              key={commentAuthor._id}
              commentAuthor={commentAuthor}
              updatedAt={comment.updatedAt}
            />
          ))}
        </Link>
        <span className="text-gray-600 text-xs italic ml-2">
          {/* {comment.updatedAt?.toLocaleString()} */}
        </span>
      </div>
      <p className="text-gray-700 pl-4">{comment.content}</p>
      <div className="flex items-center space-x-4 mt-2 ">
        {/* <button className="flex items-center text-gray-600 hover:text-indigo-600">
          Like
        </button> */}
        {/* Comment Input */}
        <div className="mt-4 flex  w-full p-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border rounded-md ps-2"
          />
          <button
            onClick={handleCommentSubmit}
            className="ml-5 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 "
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-sm " />
          </button>
        </div>
      </div>
    </div>
  );
}
