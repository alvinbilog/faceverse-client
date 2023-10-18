import { formatDate } from '@/app/utils';
import Link from 'next/link';
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
    <div className="flex items-center">
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23E0E0E0'/%3E%3Cpath d='M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17ZM16 19C12.1411 19 4 20.6863 4 24V26H28V24C28 20.6863 19.8589 19 16 19Z' fill='%23BDBDBD'/%3E%3C/svg%3E"
        alt="User Profile"
        className="h-11 w-11 rounded-full border-2 border-white mr-2"
      />
      <div>
        <span>
          {commentAuthor.firstName} {commentAuthor.lastName}
        </span>

        <div>
          <span className="text-gray-600 text-xs font-normal ">
            {formatDate(updatedAt.toLocaleString())}
          </span>
        </div>
      </div>
    </div>
  );
}
