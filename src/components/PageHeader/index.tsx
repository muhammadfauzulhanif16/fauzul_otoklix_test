import { Flex, Heading, Text, Box, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";
import { IconButton } from "../IconButton";

interface PageHeaderProps {
  icon?: any;
  pageHeaderTitle?: string;
  iconButtonTitle?: string;
  description?: string;
  onClick?: () => void;
  iconButtonProps?: any;
  buttonProps?: ButtonProps;
}

export const PageHeader: FC<PageHeaderProps> = ({
  iconButtonProps,
  buttonProps,
  icon,
  pageHeaderTitle,
  iconButtonTitle,
  description,
  onClick,
}): JSX.Element => {
  return (
    <Flex mb={8} justifyContent="space-between">
      <Box>
        <Heading fontWeight={500} size="lg" mb={2} color="gray.100">
          {pageHeaderTitle}
        </Heading>
        <Text color="gray.300" fontSize="lg">
          {description}
        </Text>
      </Box>

      <IconButton
        {...iconButtonProps}
        text={iconButtonTitle}
        tooltipProps={{
          children: null,
        }}
        buttonProps={{
          ...buttonProps,
          w: 1 / 8,
          justifyContent: "center",
          bgColor: "blue.200",
          color: "gray.800",
          _hover: {
            bgColor: "blue.300",
          },
          onClick: onClick,
        }}
        as={icon}
        iconProps={{
          w: 6,
          h: 6,
        }}
        textProps={{
          ml: 4,
        }}
      />
    </Flex>
  );
};
