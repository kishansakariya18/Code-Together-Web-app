import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import Router from "next/router";
import { login_api } from "../allApi";
import AlertBox from "./AlertBox";




export default function Login() {

  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false)
  const onCloseHandler = (e) => {
    setIsError(false)
    console.log('onCloseHandler Calling')
    Router.push('/login')
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log('Submit handler calling')

    const body = {
      email,
      password,
    };
    console.log(body);
    const user = await login_api(body);
    if (user.error) {
      setIsError(true);
    }
    if (user.token) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.user._id);

      setEmail("");
      setPassword("");
      alert("Login successfull!!");
      // setAlertMessage('success')
      
      Router.push("/");
      // window.location.reload();
    }
  };

  return (
    <>
     {isError ? <AlertBox status= 'error' onClose={onCloseHandler}/> : null}
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={submitHandler}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}
