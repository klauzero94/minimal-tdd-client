import { useEffect, useState } from "react";
import { Grid, GridItem, useBoolean, useToast } from "@chakra-ui/react";
import Header from "../components/navigation/Header";
import Products from "../components/products/List";
import Add from "../components/products/Add";
import Edit from "../components/products/Edit";
import { ProductResponse } from "../@types/products/Product";

// For test commit
export default function Home() {
  const [products, setProducts] = useState<Array<ProductResponse>>(
    new Array<ProductResponse>()
  );
  const [product, setProduct] = useState<ProductResponse>();
  const [editForm, setEditForm] = useBoolean();
  const toast = useToast();
  const getProducts = async () => {
    const response = await (
      await fetch(process.env.API_URL + `products`)
    ).json();
    const data: Array<ProductResponse> = response.data;
    setProducts(data);
  };

  const deleteProduct = async (id: string) => {
    const response = await (
      await fetch(process.env.API_URL + `products/${id}`, {
        method: "DELETE",
      })
    ).json();
    if (response.success) {
      toast({
        title: "Produto excluído com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: response.error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    getProducts();
  };

  const editProduct = async (product: ProductResponse) => {
    setEditForm.on();
    setProduct(product);
  };

  useEffect(() => {
    getProducts();
    setEditForm.off();
  }, [setEditForm]);

  return (
    <Grid
      templateAreas={`"header"
                      "main"`}
      gridTemplateRows={"auto"}
      gridTemplateColumns={"auto"}
      h="auto"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"main"} px={{ sm: 0, md: 20 }}>
        {editForm ? (
          <Edit
            refreshList={getProducts}
            product={product}
            setEditForm={setEditForm}
          />
        ) : (
          <Add refreshList={getProducts} />
        )}
        <Products
          products={products}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      </GridItem>
    </Grid>
  );
}
