import { FC, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Flex,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useReadPostByIdQuery } from "../../app/services/post";
import { Loading } from "../../components/Loading";

type PostState = {
  id: number;
  title: string;
  content: string;
};

interface PostDetailPageProps {
  post: PostState;
}

const PostDetailPage: FC<PostDetailPageProps> = (): JSX.Element => {
  const router = useRouter(),
    { id } = router.query,
    { data, isSuccess } = useReadPostByIdQuery(id);

  return (
    <Flex
      bgColor="gray.800"
      h="100vh"
      alignItems="center"
      pt={16}
      direction="column"
      px={32}
    >
      <Breadcrumb color="gray.100" pos="absolute" left={0} top={0} m={8}>
        <BreadcrumbItem>
          <BreadcrumbLink
            _focus={{
              shadow: "none",
            }}
            onClick={() => router.push("/")}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{isSuccess && data.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading color="blue.200" mb={12}>
        {isSuccess && data.title}
      </Heading>

      <Text fontSize="2xl" color="gray.100">
        {isSuccess && data.content}
      </Text>
    </Flex>
  );
};

export default PostDetailPage;
