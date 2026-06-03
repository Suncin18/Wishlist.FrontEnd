export interface UserResponse {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
}

export interface ItemResponse {
  id: number;
  name: string;
  link: string | null;
  price: number | null;
  is_bought: boolean;
  list_id: number;
}

export interface ListResponse {
  id: number;
  title: string;
  owner_id: number;
  items: ItemResponse[];
}