import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { NavBar } from "../NavBar";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  titlePage?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  titlePage,
}): JSX.Element => {
  return (
    <Flex bgColor="gray.800" h="100vh">
      <Head>
        <title>
          {titlePage} - Simple Web Blog | OtoKlix FE Test by Muhammad Fauzul
          Hanif
        </title>
      </Head>

      <NavBar titlePage={titlePage} />

      <Box
        boxShadow="inner"
        bgColor="gray.900"
        mt={4}
        w="100vw"
        borderTopLeftRadius={32}
        p={8}
      >
        {children}
      </Box>
    </Flex>
  );
};
