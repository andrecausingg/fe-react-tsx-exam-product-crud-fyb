import React, { useEffect } from "react";

// Mantine
import {
  FileInput,
  Modal,
  NumberInput,
  TextInput,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";

// Redux
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  selectNameProduct,
  setViewModalProduct,
} from "../../../../redux/features/product/productSlice";
import ProductDetails from "../ProductDetails";

const ModalProductView: React.FC = () => {
  // Path
  const pathStorageImage = import.meta.env.VITE_IMAGE_BACKEND_URL;

  // Redux
  const dispatch = useAppDispatch();
  const { isViewModalProduct, selectedDataProduct } =
    useAppSelector(selectNameProduct);

  // Mantine
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  // Mantine form
  const form = useForm({
    initialValues: {},
  });

  const handleModalClose = () => {
    form.reset();
    dispatch(setViewModalProduct());
  };

  useEffect(() => {
    console.log("selectedDataProduct VIew", selectedDataProduct);
  }, []);

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={isViewModalProduct}
        onClose={handleModalClose}
        title={<h1 className="font-bold text-xl">View product</h1>}
        centered
        size={isMediumScreen ? "md" : ""}
        withCloseButton={false}
      >
        <ProductDetails />

        <div className="flex gap-x-2 justify-center items-center mt-4">
          <Button color="red" onClick={() => handleModalClose()}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalProductView;
