export type User = {
  id: number;
  name: string;
  email: string;
};

export type Page = {
  items: User[];
  total: number;
};
