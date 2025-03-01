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
        </div>
      </Modal>
    </>
  );
};

export default ModalProductView;
