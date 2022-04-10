import React from "react";
import { IconButton } from "../IconButton";

export const Loading = () => {
  return (
    <IconButton
      isLoading
      buttonProps={{
        variant: "none",
        cursor: "default",
        w: "100%",
        bgColor: "gray.800",
      }}
      text="Loading..."
      textProps={{
        ml: 4,
      }}
    />
  );
};
