import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Box,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { ProductResponse } from "../../../@types/products/Product";

const Products = ({
  products,
  deleteProduct,
  editProduct,
}: {
  products: Array<ProductResponse>;
  deleteProduct: any;
  editProduct: any;
}) => {
  return (
    <div>
      <Box my={4}>
        <Center>
          <h2>Lista de produtos recentes</h2>
        </Center>
      </Box>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Descrição</Th>
            <Th>Adicionado em</Th>
            <Th isNumeric>Preço</Th>
            <Th textAlign="right">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.createdAt}</Td>
              <Td isNumeric>{product.price}</Td>
              <Td textAlign="right">
                <ButtonGroup gap="2">
                  <IconButton
                    aria-label="Editar"
                    colorScheme="blue"
                    onClick={() => editProduct(product)}
                    icon={<MdModeEdit />}
                  />
                  <IconButton
                    aria-label="Excluir"
                    colorScheme="red"
                    onClick={() => deleteProduct(product.id)}
                    icon={<MdDelete />}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Products;
