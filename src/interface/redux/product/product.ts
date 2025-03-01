export interface InitialStateAndResponse {
  // Param filter
  paramsProducts: ParamsProducts;
  // Fetch Data
  dataProduct: DataProduct;
  isViewModalProduct: boolean;
  isStoreModalProduct: boolean;
  isUpdateModalProduct: boolean;
  isDeleteModalProduct: boolean;
  // Select Data
  selectedDataProduct: selectedDataProduct;
}

// Params Product
interface ParamsProducts {
  limit: number;
  page: number;
  search: string;
  start_created_at: string;
  end_created_at: string;
  status: string;
}

// Data Product
interface DataProduct {
  title_message: string;
  message: string;
  data: [];
  buttons: [];
  filters: [];
  pagination: {};
}

// Selected Data
export interface selectedDataProduct {
  url: string;
  payload: [];
  method: string;
  icon: string;
  button_name: string;
  container: string;
  details: [];
}
