import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiLink } from "../../constants";
import { redirect, useNavigate } from "react-router-dom";
import { color } from "framer-motion";

export default function home() {
  let navigate = useNavigate();

  const [message, setMessage] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('token', localStorage.getItem('token'));
      const response = await axios.post("http://localhost:3000/login", {
        username: email,
        password,
      },{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      );

      const { token,userdata} = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", userdata);
      navigate("tasks");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('aaa');
      navigate("tasks");
    }
    else
      getMessage();
  }, []);

  const getMessage = async () => {
    try {
      const res = await axios.get(ApiLink);
      setMessage(res.data.message);
    } catch (err) {
      console.log("error", err);
      setMessage("error");
    }
  };
  return (
    <div className="mt-auto mb-auto">
      <h1 className="homePage-title">{"Hello!"}</h1>
      <h2 className="message">{message}</h2>
      <h4 style={{color:'#ffffff' }}>{'Harcoded Users'}</h4>
      <p style={{color:'#ffffff' }}>{'Email: admin@admin.com' + '  Password: password1'}</p>
      <p style={{color:'#ffffff' }}>{'Email: user2@user.com' + '  Password: password2'}</p>

      <div>
        <Box p={4}>
          <FormControl>
            <FormLabel style={{ color: "#e45d8a" }}>Email</FormLabel>
            <Input
              style={{ color: "white" }}
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel style={{ color: "#e45d8a" }}>Password</FormLabel>
            <Input
              color="white"
              style={{ color: "white" }}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>

          <Button style={{ backgroundColor: "#e45d8a", color: "#ffffff"  }} mt={4} onClick={handleSubmit}>
            Log In
          </Button>
        </Box>
      </div>
      <footer>{"Made by christian Soto"}</footer>
    </div>
  );
}
