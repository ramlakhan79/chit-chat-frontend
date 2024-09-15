import React, { useState } from "react";
import { InputRightElement, VStack } from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import constant from "../../constants";

axios.defaults.baseURL = constant.API_URL;
axios.defaults.withCredentials = true;

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  // const [pic, setpic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        description: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    if (password !== confirmpassword) {
      toast({
        title: "Password Do Not Match",
        description: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setLoading(true);
    if (!email.includes("@") || !email.includes("gmail.com")) {
      toast({
        title: "Please Fill the valid email eg: example@gmail.com",
        description: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password},
        config
      );
      toast({
        title: "Registration Successful",
        description: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  /*=========================================
          Picture Part Start
==========================================*/

  // const postDetails = (pics) => {
  //   setLoading(true);
  //   if (pics === undefined) {
  //     toast({
  //       title: "Please Select an Image",
  //       description: "Warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }

  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "Chit-Chat");
  //     data.append("cloud_name", "rkbcoder");
  //     // console.log(pic);
  //     fetch("https://api.cloudinary.com/v1_1/rkbcoder/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setpic(data.url.toString());
  //         console.log(data.url.toString());
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   } else {
  //     toast({
  //       title: "Please Select an Image",
  //       description: "Warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //     return;
  //   }
  // };

  /*=========================================
          Picture Part end
  ==========================================*/

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name "
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="emailID" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email "
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="passwordPW" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? " text" : "password"}
            placeholder="Enter Your Password "
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpasswordPW" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? " text" : "password"}
            placeholder="Enter Your Confirm Password "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* <FormControl id="picID" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
