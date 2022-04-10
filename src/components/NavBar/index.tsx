import { FC } from "react";
import { Grid, Flex } from "@chakra-ui/react";
import { NavList, NavListState } from "./NavList";
import { IconButton } from "../IconButton";
import { ContentView } from "@emotion-icons/fluentui-system-filled";
import { useRouter } from "next/router";

interface NavBarProps {
  titlePage?: string;
}

export const NavBar: FC<NavBarProps> = ({ titlePage }): JSX.Element => {
  const router = useRouter();

  return (
    <Flex px={2} direction="column" justifyContent="center">
      <IconButton
        as={ContentView}
        buttonProps={{
          pos: "absolute",
          top: 16,
          left: 1,
          variant: "none",
          onClick: () => router.push("/"),
        }}
        iconProps={{
          color: "blue.200",
          w: 12,
          h: 12,
        }}
      />

      <Grid gap={8}>
        {NavList.map(
          ({ label, icon }: NavListState, id: number): JSX.Element => (
            <IconButton
              key={id}
              as={icon}
              tooltipProps={{
                label: label,
                placement: "right",
                children: null,
              }}
              iconProps={{
                w: 6,
                h: 6,
              }}
              buttonProps={{
                bgColor: label == titlePage ? "blue.200" : "gray.800",
                color: label == titlePage ? "gray.800" : "gray.100",
                _hover: {
                  bgColor: "blue.200",
                  color: "gray.800",
                },
                _active: {
                  bgColor: "blue.200",
                },
                onClick: () =>
                  router.push(
                    label == "Home"
                      ? "/"
                      : label == "Dashboard"
                      ? `/${label.toLowerCase()}`
                      : `/dashboard/${label.toLowerCase()}`
                  ),
              }}
            />
          )
        )}
      </Grid>
    </Flex>
  );
};
