import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Formik, FormikProps, Form, Field } from "formik";
import { ArrowEnterLeft } from "@emotion-icons/fluentui-system-regular";
import { object, string } from "yup";
import { FC, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { PageHeader, Layout } from "../../../components";
import { useCreatePostMutation } from "../../../app/services/post";

type InitialValues = {
  title: string;
  content: string;
};

const Add: FC<{}> = (): JSX.Element => {
  const initialValues: InitialValues = {
      title: "",
      content: "",
    },
    [createPost] = useCreatePostMutation(),
    router = useRouter(),
    toast = useToast();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object().shape({
        title: string().required("Required"),
        content: string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }): void => {
        setTimeout(() => {
          createPost(values).then(() => router.push("/dashboard/posts"));
          toast({
            title: "Post created",
            description:
              'You\'re created a post. Please click "refetch" button!',
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          resetForm();
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }: FormikProps<any>): JSX.Element => (
        <Form>
          <Layout titlePage="Add">
            <PageHeader
              iconButtonProps={{
                isSubmitting: isSubmitting,
                isLoading: isSubmitting,
              }}
              buttonProps={{
                type: "submit",
              }}
              icon={ArrowEnterLeft}
              pageHeaderTitle="Add"
              iconButtonTitle="Submit"
              description="Added a post or more"
              onClick={() => router.push("/dashboard/add")}
            />

            <Field name="title">
              {({ field, form }: any): JSX.Element => (
                <FormControl
                  h={24}
                  variant="floating"
                  id="title"
                  isRequired
                  isInvalid={form.errors.title && form.touched.title}
                  color="gray.100"
                >
                  <Input {...field} id="title" placeholder=" " />

                  <FormLabel bgColor="gray.800">Title</FormLabel>

                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="content">
              {({ field, form }: any): JSX.Element => (
                <FormControl
                  variant="floating"
                  id="content"
                  isRequired
                  isInvalid={form.errors.title && form.touched.title}
                  color="gray.100"
                >
                  <Textarea {...field} id="content" placeholder=" " />
                  <FormLabel>Content</FormLabel>

                  <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Layout>
        </Form>
      )}
    </Formik>
  );
};

export default Add;
