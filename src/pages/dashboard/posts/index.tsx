import { FC } from "react";
import { Add, ContentView } from "@emotion-icons/fluentui-system-regular";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Delete, Edit } from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { PageHeader } from "../../../components/PageHeader";
import { Layout } from "../../../components/Layout";
import { IconButton } from "../../../components/IconButton";
import {
  useDeletePostMutation,
  useReadAllPostsQuery,
  useUpdatePostMutation,
} from "../../../app/services/post";
import { Post } from "../../../app/type";
import { ThList } from "./ThList";
import { DateTimeFormat } from "../../../utils/datetime";

const Posts: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    toast = useToast(),
    {
      data: posts,
      isError,
      isLoading: isReading,
      refetch,
      isFetching,
      isSuccess,
    } = useReadAllPostsQuery(),
    [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  return (
    <Layout titlePage="Posts">
      <PageHeader
        refetch={refetch}
        icon={Add}
        pageHeaderTitle="Post List"
        iconButtonTitle="Add"
        description="All list of posts has been created"
        onClick={() => router.push("/dashboard/add")}
      />

      <TableContainer overflowY="auto" maxHeight="80%">
        <Table variant="simple" color="gray.100">
          <Thead pos="sticky" top={0} bgColor="gray.900" zIndex={2}>
            <Tr>
              {ThList.map((th, id) => (
                <Th key={id}>{th}</Th>
              ))}
            </Tr>
          </Thead>

          {isReading || isFetching ? null : (
            <Tbody>
              {isSuccess &&
                posts?.map(
                  (
                    { id, title, content, created_at, updated_at }: Post,
                    idx: number
                  ) => (
                    <Tr key={id}>
                      <Td>{idx + 1}</Td>
                      <Td>
                        <Text
                          cursor="pointer"
                          w={200}
                          _hover={{
                            textDecor: "underline",
                          }}
                          isTruncated
                          onClick={() => router.push(`/post/${id}`)}
                        >
                          {title}
                        </Text>
                      </Td>
                      <Td>
                        <Text w={200} isTruncated>
                          {content}
                        </Text>
                      </Td>
                      <Td>{DateTimeFormat(created_at)}</Td>
                      <Td>{DateTimeFormat(updated_at)}</Td>
                      <Td>
                        <IconButton
                          tooltipProps={{
                            children: null,
                            label: `Wanna delete?`,
                          }}
                          as={Delete}
                          isLoading={isDeleting}
                          buttonProps={{
                            bgColor: "red.500",
                            _hover: {
                              bgColor: "red.400",
                            },
                            _active: {
                              bgColor: "red.400",
                            },
                            mr: 2,
                            onClick: () => {
                              deletePost(id).then(() =>
                                router.push(`/dashboard/posts`)
                              );
                              toast({
                                title: "Post deleted",
                                description:
                                  'You\'re deleted a post. Please click "refetch" button!',
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                              });
                            },
                          }}
                          iconProps={{
                            w: 6,
                            h: 6,
                          }}
                        />
                        <IconButton
                          iconProps={{
                            w: 6,
                            h: 6,
                          }}
                          tooltipProps={{
                            children: null,
                            label: `Wanna change?`,
                          }}
                          as={Edit}
                          buttonProps={{
                            bgColor: "yellow.500",
                            _hover: {
                              bgColor: "yellow.400",
                            },
                            _active: {
                              bgColor: "yellow.400",
                            },
                            ml: 2,
                            onClick: () => router.push(`/dashboard/edit/${id}`),
                          }}
                        />
                      </Td>
                    </Tr>
                  )
                )}
            </Tbody>
          )}
        </Table>
      </TableContainer>

      {isReading || isFetching ? (
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
        />
      ) : (
        <>
          {posts?.length === 0 ? (
            <IconButton
              as={ContentView}
              text="No post data"
              buttonProps={{
                color: "gray.700",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
                variant: "none",
                w: "full",
                py: 32,
              }}
              iconProps={{
                w: 12,
                h: 12,
              }}
              textProps={{
                mt: 4,
                fontSize: 24,
              }}
            />
          ) : null}
        </>
      )}

      {isError ? (
        <IconButton
          as={ContentView}
          text="No post data"
          buttonProps={{
            color: "gray.700",
            display: "flex",
            flexDirection: "column",
            cursor: "default",
            variant: "none",
            py: 32,
            w: "100%",
          }}
          iconProps={{
            w: 12,
            h: 12,
          }}
          textProps={{
            mt: 4,
            fontSize: 24,
          }}
        />
      ) : null}
    </Layout>
  );
};

export default Posts;
