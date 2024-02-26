import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

const AlertBox = ({ status = "success", onClose }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <Box>
        <AlertTitle>Oops...Login Failure !!!</AlertTitle>
        <AlertDescription>
          Please Enter Valid Credentials for Login
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default AlertBox;
