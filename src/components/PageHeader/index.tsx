import { Flex, Heading, Text, Box, ButtonProps, Grid } from "@chakra-ui/react";
import { FC } from "react";
import { IconButton } from "../IconButton";
import { ArrowClockwise } from "@emotion-icons/fluentui-system-regular";

interface PageHeaderProps {
  icon?: any;
  pageHeaderTitle?: string;
  iconButtonTitle?: string;
  description?: string;
  onClick?: () => void;
  iconButtonProps?: any;
  buttonProps?: ButtonProps;
  refetch?: any;
}

export const PageHeader: FC<PageHeaderProps> = ({
  iconButtonProps,
  buttonProps,
  icon,
  pageHeaderTitle,
  iconButtonTitle,
  description,
  onClick,
  refetch,
}): JSX.Element => {
  return (
    <Grid mb={8} templateColumns="repeat(2, 1fr)" zIndex={999}>
      <Box>
        <Heading fontWeight={500} size="lg" mb={2} color="gray.100">
          {pageHeaderTitle}
        </Heading>
        <Text color="gray.300" fontSize="lg">
          {description}
        </Text>
      </Box>

      <Flex w="full" justifyContent="end">
        {pageHeaderTitle != "Add" && pageHeaderTitle != "Edit" ? (
          <IconButton
            as={ArrowClockwise}
            iconProps={{
              w: 6,
              h: 6,
            }}
            text="Refetch"
            buttonProps={{
              ...buttonProps,
              mr: 4,
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
        ) : (
          ""
        )}

        <IconButton
          {...iconButtonProps}
          text={iconButtonTitle}
          tooltipProps={{
            children: null,
          }}
          buttonProps={{
            ml: 4,
            ...buttonProps,
            w: 40,
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
    </Grid>
  );
};
