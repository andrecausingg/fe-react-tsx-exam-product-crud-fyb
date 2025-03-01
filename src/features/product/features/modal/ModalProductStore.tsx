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
  setStoreModalProduct,
} from "../../../../redux/features/product/productSlice";
import { IconUpload } from "@tabler/icons-react";

// Interface
import { ProductStore } from "../../../../interface/product/product";

// Api
import { useApiProducts } from "../../../../api/product/product";

const ModalProductStore: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { isStoreModalProduct, dataProduct } =
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
    dispatch(setStoreModalProduct());
  };

  // Dynamic fields for form mantine
  useEffect(() => {
    const mappedDetails = dataProduct?.buttons
      .flatMap((item: any) => item.details)
      .map((detail: any) => ({
        key: detail.key,
        value: detail.value ?? "", // Set default value if null
      }));

    console.log("mappedDetails", mappedDetails);

    // Set form values if they have changed
    if (JSON.stringify(form.values) !== JSON.stringify(mappedDetails)) {
      form.setValues(mappedDetails);
    }

    const { method, url } =
      dataProduct?.buttons
        .filter((button: any) => button.button_name === "Create product") // Filter buttons
        .map((button: any) => ({
          method: button.method, // Extract method
          url: button.url, // Extract URL
          details: button.details.map((detail: any) => ({
            key: detail.key,
            value: detail.value ?? "", // Set default value if null
          })),
        }))?.[0] || {}; // Assuming there's only one button with the name "Create product"

    console.log("Method:", method);
    console.log("URL:", url);
    console.log("Mapped Details:", mappedDetails);
  }, [isStoreModalProduct]);

  const handleSubmit = (formValues: ProductStore) => {
    console.log("store submit: ", formValues);

    const { method, url } =
      dataProduct?.buttons
        .filter((button: any) => button.button_name === "Create product") // Filter buttons
        .map((button: any) => ({
          method: button.method, // Extract method
          url: button.url, // Extract URL
          details: button.details.map((detail: any) => ({
            key: detail.key,
            value: detail.value ?? "", // Set default value if null
          })),
        }))?.[0] || {}; // Assuming there's only one button with the name "Create product"

    console.log("Method:", method);
    console.log("URL:", url);

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
      dispatch(setStoreModalProduct());
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

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={isStoreModalProduct}
        onClose={handleModalClose}
        title={<h1 className="font-bold text-xl">Create product</h1>}
        centered
        size={isMediumScreen ? "md" : ""}
        withCloseButton={false}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {dataProduct?.buttons
            .filter((button: any) => button.button_name === "Create product")
            .map((item: any, index: number) => (
              <div key={index} className="grid gap-3">
                {item?.details?.map((field: any) => {
                  if (field.type === "text") {
                    return (
                      <TextInput
                        key={field.key}
                        label={field.label}
                        {...form.getInputProps(field.key)}
                        style={{
                          display: field.is_hidden ? "none" : "block",
                        }}
                        {...(field.is_required ? { withAsterisk: true } : {})}
                      />
                    );
                  }

                  if (field.type === "number") {
                    return (
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
                    );
                  }

                  if (field.type === "file") {
                    return (
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
                    );
                  }

                  return null;
                })}
              </div>
            ))}

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

export default ModalProductStore;
