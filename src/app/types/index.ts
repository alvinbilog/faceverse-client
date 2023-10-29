export interface PostInterfaceProps {
  postData: PostInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}
export interface PostInterface {
  _id: string;
  author: AuthorInterface; // User Reference
  content: string;
  image?: string;
  likes?: (number | string)[];
  comments?: CommentInterface[];
  hashtags?: Array<string> | string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AuthorInterface {
  _id: string;
  firstName: string;
  lastName: string;
  updatedAt: Date;
}
export interface CommentInterface {
  _id: string;
  author: AuthorInterface[];
  post: string[];
  content?: string;
  replies?: (number | string)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  friends?: string[];
  posts?: PostInterface[];
  notifications?: string[];
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: string;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

export interface UserContextProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export interface UserData {
  success: boolean;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    friends?: string[];
    posts?: PostInterface[];
    notifications?: string[];
    createdAt: Date;
    updatedAt: Date;
    accountType: string;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: string;
    verifyToken: string;
    verifyTokenExpiry: Date;
  };
}
