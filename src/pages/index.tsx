import { Box, Flex, Heading, Text, GridItem, Grid } from "@chakra-ui/react";
import {
  ContentView,
  ArrowClockwise,
} from "@emotion-icons/fluentui-system-regular";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IconButton } from "../components";
import moment from "moment-timezone";
import { useReadAllPostsQuery } from "../app/services/post";
import { Post } from "../app/type";
import { Loading } from "../components/Loading";

const Home: NextPage<{}> = (): JSX.Element => {
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
    <Box bgColor="gray.800" h="100vh" color="gray.100">
      <Flex p={10} pos="absolute" w="full" justifyContent="space-between">
        <IconButton
          as={ArrowClockwise}
          iconProps={{
            w: 6,
            h: 6,
          }}
          text="Refetch"
          buttonProps={{
            w: 40,
            bgColor: "blue.200",
            color: "gray.800",
            _hover: {
              bgColor: "blue.300",
            },
            onClick: refetch,
          }}
          textProps={{
            ml: 4,
          }}
        />

        <IconButton
          as={ContentView}
          iconProps={{
            w: 6,
            h: 6,
          }}
          text="Dashboard"
          buttonProps={{
            w: 40,
            bgColor: "blue.200",
            color: "gray.800",
            _hover: {
              bgColor: "blue.300",
            },
            onClick: () => {
              router.push("/dashboard");
            },
          }}
          textProps={{
            ml: 4,
          }}
        />
      </Flex>

      <Flex
        h="60vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Text fontSize="xl" fontWeight="500" color="blue.200">
          Our Blog
        </Text>
        <Heading size="2xl" fontWeight="500" mt={6} mb={8}>
          Latest blog posts
        </Heading>
        <Text color="gray.400" fontSize="2xl">
          Don't miss our newsletter
        </Text>
      </Flex>

      {isError ? <Text>An error has occurred!</Text> : null}
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Grid
          bgColor="gray.800"
          templateColumns="repeat(3, 1fr)"
          gap={10}
          px={10}
          pb={10}
        >
          {isSuccess &&
            posts?.map(({ id, title, content, published_at }: Post) => (
              <GridItem
                key={id}
                onClick={() => router.push(`/post/${id}`)}
                cursor="pointer"
              >
                <Text fontWeight="500" color="blue.200">
                  {moment(published_at)
                    .tz("Asia/Jakarta")
                    .format("MMMM DD, YYYY")}
                </Text>

                <Text my={2} fontSize="2xl" fontWeight="500">
                  {title}
                </Text>

                <Text>{content}</Text>
              </GridItem>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
