import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";

import { FC } from "react";

const MyApp: FC<AppProps> = ({Component, pageProps}) => {
  return (

    <ChakraProvider resetCSS theme={theme}>
      <Component { ...pageProps} />
    </ChakraProvider>

    
  );
}

export default MyApp;
