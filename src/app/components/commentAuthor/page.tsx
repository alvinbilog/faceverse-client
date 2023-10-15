import React from 'react';

interface CommentAuthorProps {
  commentAuthor: {
    _id: number;
    firstName: string;
    lastName: string;
  };
  updatedAt: Date;
}

export default function CommentAuthor({
  commentAuthor,
  updatedAt,
}: CommentAuthorProps) {
  return (
    <div>
      <span>
        {commentAuthor.firstName} {commentAuthor.lastName}
      </span>
      <span className="text-gray-600 text-xs italic ml-2">
        {updatedAt.toLocaleString()}
      </span>
    </div>
  );
}
