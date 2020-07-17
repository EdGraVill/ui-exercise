export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Mail {
  id: number;
  subject: string;
  sender: string;
  body: string;
  tags: string[],
  date: string;
  isReaded: boolean;
  isDeleted: boolean;
  isFavorite: boolean;
}
