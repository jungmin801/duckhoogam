export interface Post {
  postId: number;
  createdAt: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  thumbnail: string;
  categoryNames: string[];
}

export interface PostId {
  postId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Categories {
  categories: Category[] | null;
}

export interface AccountName {
  accountName: string;
}

export interface Profile {
  id: string;
  image: string;
  categories: string[];
  userName: string;
  intro: string;
}
