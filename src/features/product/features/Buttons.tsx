import React, { useEffect } from "react";

// Mantine
import { Button } from "@mantine/core";

// Redux
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectNameProduct,
  setStoreModalProduct,
} from "../../../redux/features/product/productSlice";
import ModalProductStore from "./modal/ModalProductStore";

const Buttons: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { dataProduct, isStoreModalProduct } =
    useAppSelector(selectNameProduct);

  // Campaign
  useEffect(() => {
    console.log("dataProduct", dataProduct);
  }, [dataProduct]);

  const handleModalStoreProduct = () => {
    dispatch(setStoreModalProduct());
    console.log("andre:");
  };

  return (
    <>
      {/* Button Fields */}
      <div className="">
        {dataProduct?.buttons.map((item: any, index: number) => (
          <div key={index}>
            <Button
              onClick={
                item.button_name === "Create product"
                  ? handleModalStoreProduct
                  : undefined
              }
              variant="filled"
            >
              {item.button_name}
            </Button>
          </div>
        ))}
      </div>

      <ModalProductStore />
    </>
  );
};

export default Buttons;
