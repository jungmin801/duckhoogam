export interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  userName: string;
  image: string;
  category: string[];
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
