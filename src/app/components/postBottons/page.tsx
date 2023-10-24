import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function PostButtons() {
  return (
    <div className="flex items-center space-x-4 mt-2">
      <button className="flex items-center text-gray-600 hover:text-indigo-600">
        <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
        Like
      </button>
      <button className="flex items-center text-gray-600 hover:text-indigo-600">
        <FontAwesomeIcon icon={faComment} className="mr-2" />
        Comment
      </button>
    </div>
  );
}
