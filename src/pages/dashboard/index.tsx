import { FC } from "react";
import { Flex, Text, Spinner, Box } from "@chakra-ui/react";
import { ContentView } from "@emotion-icons/fluentui-system-regular";
import { Add } from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { PageHeader, IconButton, Layout } from "../../components";
import { useReadAllPostsQuery } from "../../app/services/post";

const Dashboard: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    {
      data: posts,
      isError,
      isLoading,
      refetch,
      isFetching,
      isSuccess,
    } = useReadAllPostsQuery();

  return (
    <Layout titlePage="Dashboard">
      <PageHeader
        refetch={refetch}
        icon={Add}
        pageHeaderTitle="Dashboard"
        iconButtonTitle="Add"
        description="All important data overview"
        onClick={() => router.push("/dashboard/add")}
      />

      <Flex
        borderRadius={16}
        p={6}
        bgColor="gray.800"
        direction="column"
        w={1 / 3}
        color="gray.100"
      >
        <Flex alignItems="center" mb={6}>
          <IconButton
            buttonProps={{
              variant: "none",
              cursor: "default",
              bgColor: "blue.200",
              color: "gray.800",
              mr: 6,
            }}
            as={ContentView}
            iconProps={{
              w: 8,
              h: 8,
            }}
          />

          <Text fontWeight={500}>Amount Added</Text>
        </Flex>

        <Box fontSize="2xl" fontWeight={500}>
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <Text>
              {isSuccess && posts?.length}{" "}
              {posts?.length != 0 ? "post" : "posts"}
            </Text>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Dashboard;
