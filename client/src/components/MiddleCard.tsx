import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Center,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import code from "../images/code.png";

export default function MiddleCard(props): JSX.Element {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={code} alt={`Picture of Code.`} layout={"fill"} />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {props.title}
          </Heading>
          <Text color={"gray.500"}>{props.text}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Text>
            Explore More <ArrowForwardIcon />
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
