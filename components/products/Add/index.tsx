import { useBoolean, Button, Box, useToast } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import ProductForm from "../Form";

const Add = ({ refreshList }: any) => {
  const [showForm, setShowForm] = useBoolean();
  const toast = useToast();

  const addProduct = async (data: any) => {
    const response = await (
      await fetch(process.env.NEXT_PUBLIC_API + "products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(data),
      })
    ).json();
    if (response.success) {
      toast({
        title: "Produto adicionado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setShowForm.off();
      refreshList();
    } else {
      toast({
        title: "Erro ao adicionar produto!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const saveData = async (data: any) => {
    await addProduct(data);
  };

  return (
    <Box my={4}>
      {!showForm ? (
        <Button
          colorScheme="blue"
          leftIcon={<MdAddCircle />}
          onClick={setShowForm.on}
        >
          Novo produto
        </Button>
      ) : null}
      {showForm ? (
        <ProductForm
          setShowForm={setShowForm}
          saveData={saveData}
          isUpdate={false}
        />
      ) : null}
    </Box>
  );
};

export default Add;
