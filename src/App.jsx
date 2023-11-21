import { useEffect, useState } from "react";
import Home from "./views/home";
import TodoApp from "./views/todoApp";
import "./App.css";
import { Route, Routes, redirect } from "react-router-dom";
import { Switch } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);


  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<TodoApp />} />

      </Routes>
    </div>
  );
}

export default App;
