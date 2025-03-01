import React from "react";

// Redux
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectNameProduct } from "../../../redux/features/product/productSlice";
import { Card, Grid, Text, Skeleton } from "@mantine/core";

const ProductDetails: React.FC = () => {
  // Path
  const pathStorageImage = import.meta.env.VITE_IMAGE_BACKEND_URL;

  // Redux
  const dispatch = useAppDispatch();
  const { selectedDataProduct } = useAppSelector(selectNameProduct);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          {selectedDataProduct?.details &&
          selectedDataProduct.details.length > 0 ? (
            selectedDataProduct.details
              .filter((detail: any) => detail.type === "file") // Filter out type "file"
              .map((detail: any) => (
                <div key={detail.key}>
                  {detail.value ? (
                    <img
                      src={`${pathStorageImage}${detail.value}`}
                      alt={detail.label}
                      width={120}
                      height={120}
                    />
                  ) : (
                    <Grid>
                      <Grid.Col span={12} sm={6} md={4} lg={3}>
                        <Card shadow="sm" padding="lg">
                          <Skeleton height={200} radius="md" />
                          <Text mt="sm">
                            <Skeleton height={20} width="70%" />
                          </Text>
                          <Text mt="xs">
                            <Skeleton height={20} width="50%" />
                          </Text>
                        </Card>
                      </Grid.Col>
                    </Grid>
                  )}
                </div>
              ))
          ) : (
            <div className="text-center">
              <p>No product details to display.</p>
            </div>
          )}
        </div>

        <div className="flex gap-x-4">
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
    </>
  );
};

export default ProductDetails;
