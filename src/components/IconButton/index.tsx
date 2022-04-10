import {
  Tooltip,
  TooltipProps,
  Text,
  TextProps,
  ButtonProps,
  Icon,
  IconProps,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FC } from "react";

interface IconButtonProps {
  isLoading?: boolean;
  text?: string;
  as?: any;
  iconProps?: IconProps;
  buttonProps?: ButtonProps;
  tooltipProps?: TooltipProps;
  textProps?: TextProps;
  isSubmitting?: boolean;
}

export const IconButton: FC<IconButtonProps> = ({
  text,
  isLoading,
  as,
  iconProps,
  buttonProps,
  tooltipProps,
  textProps,
  isSubmitting,
}): JSX.Element => {
  return (
    <Tooltip hasArrow {...tooltipProps}>
      <Button
        disabled={isSubmitting}
        _focus={{
          shadow: "none",
        }}
        _active={{
          bgColor: "none",
        }}
        p={0}
        {...buttonProps}
      >
        {isLoading ? <Spinner /> : <Icon as={as} {...iconProps} />}

        <Text {...textProps}>{text ? text : ""}</Text>
      </Button>
    </Tooltip>
  );
};
