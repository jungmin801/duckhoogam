export interface Post {
  post_id: number;
  created_at: string;
  title: string;
  content: string;
  user_name: string;
  thumbnail: string;
  category_names: string[];
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
