import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";
import { ApiLink } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function home() {
  let navigate = useNavigate();

  const [message, setMessage] = React.useState("");
  useEffect(() => {
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
      <Button onClick={()=>navigate('tasks')} className="mb-4 primary-button">{"Get Started"}</Button>
      <footer>{"Made by christian Soto"}</footer>
    </div>
  );
}
