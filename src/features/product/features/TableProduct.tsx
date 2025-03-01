import React, { useEffect } from "react";

// Mantine
import { Container, ScrollArea, Table } from "@mantine/core";

// Tabler
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

// Redux
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectNameProduct,
  setViewModalProduct,
  setUpdateModalProduct,
  setDeleteModalProduct,
  setSelectedDataProduct,
} from "../../../redux/features/product/productSlice";

// Interface
import { selectedDataProduct } from "../../../interface/redux/product/product";
import ModalProductDelete from "./modal/ModalProductDelete";
import ModalProductView from "./modal/ModalProductView";
import ModalProductUpdate from "./modal/ModalProductUpdate";

const TableProduct: React.FC = () => {
  // Path
  const pathStorageImage = import.meta.env.VITE_IMAGE_BACKEND_URL;

  // Redux
  const dispatch = useAppDispatch();
  const { dataProduct, isDeleteModalProduct } =
    useAppSelector(selectNameProduct);

  // Campaign
  useEffect(() => {
    console.log("dataProduct", dataProduct);
  }, [dataProduct]);

  const handleSelectView = (value: selectedDataProduct) => {
    console.log("handleSelectView:", value);
    dispatch(setViewModalProduct());
    dispatch(setSelectedDataProduct(value));
  };
  const handleSelectUpdate = (value: selectedDataProduct) => {
    console.log("handleSelectUpdate:", value);
    dispatch(setUpdateModalProduct());
    dispatch(setSelectedDataProduct(value));
  };
  const handleSelectDelete = (value: selectedDataProduct) => {
    console.log("handleSelectDelete:", value);
    dispatch(setDeleteModalProduct());
    dispatch(setSelectedDataProduct(value));
    console.log("isDeleteModalProduct", isDeleteModalProduct);
  };

  return (
    <>
      <Container size="md" mx="auto">
        <ScrollArea h={400} style={{ width: "100%" }}>
          <Table
            miw={700}
            style={{ position: "relative", textAlign: "center" }}
          >
            {/* Sticky header */}
            <Table.Thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#3b82f6",
                zIndex: 10,
                height: "50px",
              }}
            >
              <Table.Tr>
                <Table.Th style={{ textAlign: "center", color: "white" }}>
                  Id
                </Table.Th>
                <Table.Th style={{ textAlign: "center", color: "white" }}>
                  Image
                </Table.Th>
                <Table.Th style={{ textAlign: "center", color: "white" }}>
                  Name
                </Table.Th>
                <Table.Th style={{ textAlign: "center", color: "white" }}>
                  Price
                </Table.Th>
                <Table.Th style={{ textAlign: "center", color: "white" }}>
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {dataProduct?.data.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      {item.id}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={`${pathStorageImage}${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      {item.name}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      {item.price}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      {item.actions.map((action: any, index: number) => {
                        switch (action.icon) {
                          case "IconEye":
                            return (
                              <IconEye
                                onClick={() => handleSelectView(action)} // Corrected: wrap in a function
                                key={index}
                                className="cursor-pointer hover:text-blue-500"
                              />
                            );
                          case "IconEdit":
                            return (
                              <IconEdit
                                key={index}
                                onClick={() => handleSelectUpdate(action)} // Corrected: wrap in a function
                                className="cursor-pointer hover:text-blue-500"
                              />
                            );
                          case "IconTrash":
                            return (
                              <IconTrash
                                key={index}
                                onClick={() => handleSelectDelete(action)} // Corrected: wrap in a function
                                className="cursor-pointer hover:text-blue-500"
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>

      <ModalProductUpdate />
      <ModalProductView />
      <ModalProductDelete />
    </>
  );
};

export default TableProduct;
