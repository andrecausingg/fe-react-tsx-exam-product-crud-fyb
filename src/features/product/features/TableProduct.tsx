import React from "react";
import { Container, ScrollArea, Table } from "@mantine/core";

// Define TypeScript interface for data structure
interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

const data: Product[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    name: "Product 1",
    price: "$29.99",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    name: "Product 2",
    price: "$39.99",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    name: "Product 3",
    price: "$19.99",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/80",
    name: "Product 4",
    price: "$49.99",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/80",
    name: "Product 5",
    price: "$24.99",
  },
];

const TableProduct: React.FC = () => {
  return (
    <Container
      size="md"
      mx="auto"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollArea h={400} style={{ width: "100%", maxWidth: "800px" }}>
        <Table miw={700} style={{ position: "relative", textAlign: "center" }}>
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
            {data.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td style={{ textAlign: "center" }}>
                  {product.id}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {product.name}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {product.price}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>-</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};

export default TableProduct;
