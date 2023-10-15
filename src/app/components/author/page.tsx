import Link from 'next/link';
import { UserInterface } from '../post/page';

interface PostAuthorProps {
  postAuthor: UserInterface;
}
export default function User({ postAuthor }: PostAuthorProps) {
  return (
    <div>
      <Link
        // href={`/profile/${postAuthor}`}
        href={`/`}
        className="text-indigo-600 font-bold"
      >
        <span>
          {postAuthor.firstName} {postAuthor.lastName}
        </span>
        <span className="text-gray-600 text-xs italic ml-2">
          {postAuthor.updatedAt.toLocaleString()}
        </span>
      </Link>
    </div>
  );
}
