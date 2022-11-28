import { Box, useToast } from "@chakra-ui/react";
import { ProductResponse } from "../../../@types/products/Product";
import ProductForm from "../Form";

const Edit = ({
  product,
  refreshList,
  setEditForm,
}: {
  product?: ProductResponse;
  refreshList: any;
  setEditForm: any;
}) => {
  const toast = useToast();

  const editProduct = async (data: any, id: string) => {
    const response = await (
      await fetch(process.env.NEXT_PUBLIC_API + `products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(data),
      })
    ).json();
    if (response.success) {
      toast({
        title: "Produto editado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEditForm.off();
      refreshList();
    } else {
      toast({
        title: "Erro ao editar produto!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const saveData = async (data: any, id: string) => {
    await editProduct(data, id);
  };

  return (
    <Box my={4}>
      <ProductForm
        setShowForm={setEditForm}
        saveData={saveData}
        isUpdate={true}
        currentProduct={product}
      />
    </Box>
  );
};

export default Edit;
