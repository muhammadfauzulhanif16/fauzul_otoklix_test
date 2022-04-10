import { FC, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Formik, FormikProps, Form, Field } from "formik";
import { ArrowEnterLeft } from "@emotion-icons/fluentui-system-regular";
import { object, string } from "yup";
import { Post } from "../../../app/type";
import { useRouter } from "next/router";
import { IconButton, Layout, PageHeader } from "../../../components";
import {
  useReadPostByIdQuery,
  useUpdatePostMutation,
} from "../../../app/services/post";

type InitialValues = {
  title: string;
  content: string;
};

const Edit: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    { id } = router.query,
    {
      data,
      isLoading: isReadingById,
      isFetching,
      isSuccess,
    } = useReadPostByIdQuery(id),
    [updatePost] = useUpdatePostMutation(),
    [valueTitle, setValueTitle] = useState(data && data.title),
    [valueContent, setValueContent] = useState(data && data.content),
    handleInputTitle = ({ target }: any) => {
      setValueTitle(target.value);
    },
    handleInputContent = ({ target }: any) => {
      setValueContent(target.value);
    };

  if (isReadingById && isFetching) {
    <IconButton
      isLoading
      buttonProps={{
        variant: "none",
        cursor: "default",
        color: "gray.100",
        w: "full",
        py: 32,
      }}
      text="Loading..."
      textProps={{
        ml: 4,
      }}
    />;
  }

  return (
    <Formik
      initialValues={{
        title: valueTitle,
        content: valueContent,
      }}
      validationSchema={object().shape({
        title: string().required("Required"),
        content: string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          updatePost({ id, values }).then(() =>
            router.push("/dashboard/posts")
          );
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }: FormikProps<any>): JSX.Element => (
        <Form>
          <Layout titlePage="Edit">
            <PageHeader
              iconButtonProps={{
                isSubmitting: isSubmitting,
                isLoading: isSubmitting,
              }}
              buttonProps={{
                type: "submit",
              }}
              icon={ArrowEnterLeft}
              pageHeaderTitle="Edit"
              iconButtonTitle="Submit"
              description="Change post"
            />

            <Field name="title">
              {({ field, form }: any): JSX.Element => (
                <FormControl
                  mb={8}
                  variant="floating"
                  id="title"
                  isRequired
                  isInvalid={form.errors.title && form.touched.title}
                  color="gray.100"
                >
                  <Input
                    {...field}
                    id="title"
                    placeholder=" "
                    // value={initialValues.title}
                    // onInput={handleInputTitle}
                  />

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
                  <Textarea
                    {...field}
                    id="content"
                    placeholder=" "
                    // value={initialValues.content}
                    // onInput={handleInputContent}
                  />
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

export default Edit;
