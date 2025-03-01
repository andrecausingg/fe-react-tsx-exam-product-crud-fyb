// Campaign
export interface ProductsResponse {
  title_message: string;
  message: string;
  data: [];
  buttons: [];
  filters: [];
  pagination: {};
}

export interface ProductFetchParams {
  limit?: number;
  page?: number;
  search?: string;
  start_created_at?: string;
  end_created_at?: string;
}

export interface ProductStore {
  image: File | null;
  name: string;
  price: number;
}
