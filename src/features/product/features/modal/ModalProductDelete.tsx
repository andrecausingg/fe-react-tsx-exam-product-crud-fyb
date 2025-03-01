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
import { notifications } from "@mantine/notifications";

// Redux
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  selectNameProduct,
  setDeleteModalProduct,
} from "../../../../redux/features/product/productSlice";

// Api
import { useApiProducts } from "../../../../api/product/product";

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
        <div className="flex gap-x-4">
          <div>
            {selectedDataProduct?.details &&
            selectedDataProduct.details.length > 0 ? (
              selectedDataProduct.details
                .filter((detail: any) => detail.type === "file") // Filter out type "file"
                .map((detail: any) => (
                  <div key={detail.key}>
                    <img
                      src={`${pathStorageImage}${detail.value}`}
                      alt={detail.label}
                      width={120}
                      height={120}
                    />
                  </div>
                ))
            ) : (
              <p>No product details to display.</p>
            )}
          </div>

          <div className="flex flex-col gap-x-4">
            {selectedDataProduct?.details &&
            selectedDataProduct.details.length > 0 ? (
              selectedDataProduct.details
                .filter((detail: any) => detail.type !== "file") // Filter out type "file"
                .map((detail: any) => (
                  <div className="flex flex-col mt-2" key={detail.key}>
                    <label className="font-bold">{detail.label}</label>
                    <span>{detail.value}</span>
                  </div>
                ))
            ) : (
              <p>No product details to display.</p>
            )}
          </div>
        </div>

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
