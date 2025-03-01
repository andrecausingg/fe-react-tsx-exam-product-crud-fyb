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
  setUpdateModalProduct,
} from "../../../../redux/features/product/productSlice";

// Api
import { useApiProducts } from "../../../../api/product/product";

// Tabler
import { IconUpload } from "@tabler/icons-react";

// Interface
import { ProductStore } from "../../../../interface/product/product";

const ModalProductUpdate: React.FC = () => {
  // Path
  const pathStorageImage = import.meta.env.VITE_IMAGE_BACKEND_URL;

  // Redux
  const dispatch = useAppDispatch();
  const { isUpdateModalProduct, selectedDataProduct } =
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

  // Close
  const handleModalClose = () => {
    form.reset();
    dispatch(setUpdateModalProduct());
  };

  const handleSubmit = (formValues: ProductStore) => {
    console.log("formValues update", formValues);
    const url = selectedDataProduct.url;
    const method = selectedDataProduct.method;

    mutateProducts({
      payload: formValues || {},
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
      dispatch(setUpdateModalProduct());
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
        opened={isUpdateModalProduct}
        onClose={handleModalClose}
        title={<h1 className="font-bold text-xl">Update product</h1>}
        centered
        size={isMediumScreen ? "md" : ""}
        withCloseButton={false}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {selectedDataProduct?.details.map((field: any, index: number) => {
            if (field.type === "text") {
              return (
                <div key={index} className="grid gap-3">
                  <TextInput
                    key={field.key}
                    label={field.label}
                    {...form.getInputProps(field.key)}
                    style={{
                      display: field.is_hidden ? "none" : "block",
                    }}
                    {...(field.is_required ? { withAsterisk: true } : {})}
                  />
                </div>
              );
            }

            if (field.type === "number") {
              return (
                <div key={index} className="grid gap-3">
                  <NumberInput
                    key={field.key}
                    label={field.label}
                    {...form.getInputProps(field.key)}
                    style={{
                      display: field.is_hidden ? "none" : "block",
                    }}
                    {...(field.is_required ? { withAsterisk: true } : {})}
                    min={field.min || 0}
                  />
                </div>
              );
            }

            if (field.type === "file") {
              return (
                <div key={index} className="grid gap-3">
                  <FileInput
                    key={field.key}
                    label={field.label}
                    {...form.getInputProps(field.key)}
                    style={{
                      display: field.is_hidden ? "none" : "block",
                    }}
                    leftSection={<IconUpload />}
                    {...(field.is_required ? { withAsterisk: true } : {})}
                  />
                </div>
              );
            }

            return null;
          })}

          <div className="flex gap-x-2 justify-center items-center mt-4">
            <Button color="red" onClick={() => handleModalClose()}>
              Close
            </Button>
            <Button type="submit" loading={isLoadingProducts}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalProductUpdate;
