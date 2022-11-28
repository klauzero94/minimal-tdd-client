import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Button,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  FormikProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";

interface FormProps {
  name: string;
  description: string;
  price: number;
}

function ProductForm({ setShowForm, saveData, isUpdate, currentProduct }: any) {
  function validateName(value: string) {
    let error;
    if (!value) {
      error = "O campo nome é obrigatório.";
    }
    return error;
  }

  function validatePrice(value: number) {
    let error;
    if (!value) {
      error = "O campo preço é obrigatório.";
    }
    return error;
  }

  return (
    <Formik
      initialValues={
        !isUpdate
          ? { name: "", description: "", price: 0 }
          : {
              name: currentProduct.name,
              description: currentProduct.description,
              price: currentProduct.price,
            }
      }
      onSubmit={(
        values: FormProps,
        { setSubmitting }: FormikHelpers<FormProps>
      ) => {
        setSubmitting(false);
        if (isUpdate) {
          saveData(values, currentProduct.id);
        } else {
          saveData(values);
        }
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<{ name: string }>;
            }) => (
              <FormControl
                isInvalid={
                  form.errors.name && form.touched.name ? true : undefined
                }
              >
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input {...field} id="name" placeholder="Insira o nome" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="price" validate={validatePrice}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<number>;
              form: FormikProps<{ price: number }>;
            }) => (
              <FormControl
                isInvalid={
                  form.errors.price && form.touched.price ? true : undefined
                }
              >
                <FormLabel htmlFor="price">Preço</FormLabel>
                <NumberInput
                  id="price"
                  onChange={(value) => form.setFieldValue("price", value)}
                  value={field.value}
                  precision={2}
                  step={0.2}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({
              field,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<{ description?: string }>;
            }) => (
              <FormControl>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Insira a descrição"
                />
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Salvar
          </Button>
          <Button ml={4} mt={4} onClick={setShowForm.off}>
            Cancelar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
