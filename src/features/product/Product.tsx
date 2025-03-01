// React
import React, { useEffect } from "react";

// Component
import TableProduct from "./features/TableProduct";
import Buttons from "./features/Buttons";

// Api
import { useFetchProducts } from "../../api/product/product";

// Redux
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectNameProduct,
  setDataProduct,
  setQueryingIndex,
} from "../../redux/features/product/productSlice";
import Filters from "./features/Filters";
import Paginate from "./features/Paginate";

const Product: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { paramsProducts } = useAppSelector(selectNameProduct);

  // Products API
  const {
    data: dataApiProducts,
    isLoading: isLoadingApiProducts,
    isSuccess: isSuccessApiProducts,
    isError: isErrorApiProducts,
  } = useFetchProducts(paramsProducts);

  // Campaign
  useEffect(() => {
    if (dataApiProducts) {
      dispatch(setDataProduct(dataApiProducts));
    }
    if (isSuccessApiProducts) {
      dispatch(setQueryingIndex(false));
    }
    // console.log("dataApiProducts", dataApiProducts);
  }, [dataApiProducts, isLoadingApiProducts, isErrorApiProducts]);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center container mx-auto flex-col p-4 md:p-0">
        <div className="w-full max-w-[700px]">
          <Buttons />
          <Filters />
          <Paginate />
          <TableProduct />
        </div>
      </div>
    </>
  );
};

export default Product;
