import Link from 'next/link';
import { CommentInterface } from '../post/page';
import CommentAuthor from '../commentAuthor/page';

interface CommentsProps {
  comment: CommentInterface;
}

export default function Comments({ comment }: CommentsProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <Link
          //   href={`/profile/${comment.author}`}
          href={`/`}
          className="text-indigo-600 font-medium"
        >
          {/* {comment.author} */}
          {comment.author?.map((commentAuthor) => (
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
    </div>
  );
}
