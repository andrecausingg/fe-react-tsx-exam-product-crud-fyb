// Redux
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectNameProduct,
  setParamsProduct,
  setQueryingIndex,
} from "../../../redux/features/product/productSlice";
import { Pagination } from "@mantine/core";

const Paginate: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { dataProduct, paramsProducts } = useAppSelector(selectNameProduct);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    dispatch(setParamsProduct({ page: page }));
    dispatch(setQueryingIndex(true));
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        {dataProduct?.pagination && dataProduct.pagination.last_page >= 1 && (
          <Pagination
            mt="lg"
            page={paramsProducts?.current_page || 1}
            total={dataProduct?.pagination.last_page}
            onChange={handlePageChange}
            // siblings={1} // Show 2 pages before and after the current page
            // boundaries={1} // Show 1 page at the beginning and the end
          />
        )}
      </div>
    </>
  );
};

export default Paginate;
