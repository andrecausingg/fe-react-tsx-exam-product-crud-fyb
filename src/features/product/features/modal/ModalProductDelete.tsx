import React, { useEffect } from "react";

// Mantine
import {
  FileInput,
  Modal,
  NumberInput,
  TextInput,
  Button,
  Skeleton,
  Grid,
  Card,
  Text,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

// Redux
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  selectNameProduct,
  setDeleteModalProduct,
} from "../../../../redux/features/product/productSlice";

// Api
import { useApiProducts } from "../../../../api/product/product";
import ProductDetails from "../ProductDetails";

const ModalProductDelete: React.FC = () => {
  // Path
  const pathStorageImage = import.meta.env.VITE_IMAGE_BACKEND_URL;

  // Redux
  const dispatch = useAppDispatch();
  const { isDeleteModalProduct, selectedDataProduct } =
    useAppSelector(selectNameProduct);

  // Mantine
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  // Product API | React tanstack
  const {
    mutateProducts,
    isLoadingProducts,
    isErrorProducts,
    isSuccessProducts,
    errorProducts,
    dataProducts,
    resetProducts,
  } = useApiProducts();

  // Mantine form
  const form = useForm({
    initialValues: {},
  });

  const handleModalClose = () => {
    form.reset();
    dispatch(setDeleteModalProduct());
  };

  const handleSubmit = () => {
    console.log("selectedDataProduct", selectedDataProduct);
    const url = selectedDataProduct.url;
    const method = selectedDataProduct.method;

    mutateProducts({
      payload: {},
      api: url,
      method: method,
    });
  };

  // Success | Notification
  useEffect(() => {
    // Success
    if (isSuccessProducts) {
      notifications.show({
        title: dataProducts?.title_message || "Success",
        message: dataProducts?.message || "Success",
        color: "green",
      });

      form.reset();
      dispatch(setDeleteModalProduct());
      resetProducts;
    }
  }, [isSuccessProducts]);

  // Error handling and notification
  useEffect(() => {
    console.log("errorProducts", errorProducts);

    if (isErrorProducts) {
      notifications.show({
        title: errorProducts?.title_message || "Error",
        message: errorProducts?.message || "Something went wrong!",
        color: "red",
      });

      if (errorProducts?.errors) {
        const formattedErrors = Object.keys(errorProducts.errors).reduce(
          (item: any, field) => {
            item[field] = errorProducts.errors[field];
            return item;
          },
          {}
        );
        form.setErrors(formattedErrors);
      }
    }
  }, [isErrorProducts]);

  useEffect(() => {
    console.log("selectedDataProduct,asd", selectedDataProduct);
  }, [selectedDataProduct]);

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={isDeleteModalProduct}
        onClose={handleModalClose}
        title={<h1 className="font-bold text-xl">Delete product</h1>}
        centered
        size={isMediumScreen ? "md" : ""}
        withCloseButton={false}
      >
        <ProductDetails />

        <div className="flex gap-x-2 justify-center items-center mt-4">
          <Button color="red" onClick={() => handleModalClose()}>
            Close
          </Button>
          <Button
            type="submit"
            loading={isLoadingProducts}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalProductDelete;
