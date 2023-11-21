import React, { useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Input,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { ApiLink, weekday } from "../../constants";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function todoApp() {
  let time = new Date().toLocaleTimeString();
  let navigate = useNavigate();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [day, setDay] = React.useState("");
  const [currentTime, setCurrentTime] = React.useState(time);
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [newTask2, setNewTask2] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editID, setEditiD] = React.useState("");
  var chage = false;
  const updateTime = () => {
    var times = new Date().toLocaleTimeString();
    setCurrentTime(times);
  };

  setInterval(() => {
    updateTime();
  }, 1000);

  useEffect(() => {
    if(!localStorage.getItem('token'))
      navigate('/');
    setTasks([]);
    getAllTasks();
    const d = new Date();
    let day = weekday[d.getDay()];
    setDay(day);
    console.log("updating");
  }, []);

  const getAllTasks = async () => {
    try {
      const res = await axios.get(ApiLink + "todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data.todos);
    } catch (err) {
      console.log("error", err);
    }
  };

  const addTask = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        ApiLink + "todos",
        {
          task: newTask,
          owner: localStorage.getItem("user"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("add res", res);
      await getAllTasks();
      setNewTask("");
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async (id) => {
    console.log("id", id);
    try {
      setIsLoading(true);
      const res = await axios.delete(ApiLink + `todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getAllTasks();
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };
  const editTask = async (id) => {
    console.log("id", id);
    try {
      setIsLoading(true);
      const res = await axios.put(
        ApiLink + `todos/${id}`,
        {
          task: newTask2,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res", res);
      await getAllTasks();
      setIsLoading(false);
      setEditiD("");
      setNewTask2("");
    } catch (err) {
      console.log("error", err);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const deleteAll = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(ApiLink + `todos/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("res", res);
      setTasks([]);
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div>
      <div>
        <h1 className="homePage-title">{day}</h1>
        <h2 className="message">{currentTime}</h2>
      </div>
      <div className="d-flex justify-content-between ">
        <Input
          value={newTask}
          className="input-task"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          width="-webkit-fill-available me-2"
          placeholder="Add Something ..."
        />
        <Button
          disabled={isloading}
          className="primary-button"
          onClick={() => {
            addTask();
          }}
        >
          {"Add"}
        </Button>
      </div>
      <div className="tableData mt-4 d-flex ms-auto">
        <Table
          className="ms-auto me-auto data-table"
          variant="simple"
          size="lg"
        >
          <Thead>
            <Tr>
              <Th>{"Id"}</Th>
              <Th>{"Task name"}</Th>
              <Th>{"Edit"}</Th>
              <Th>{"Delete"}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.length === 0 ? (
              <Tr>
                <Td>none</Td>
              </Tr>
            ) : (
              tasks.map((task, index) => {
                return (
                  <Tr key={index}>
                    <Td>{index}</Td>
                    <Td>{task.task}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          setEditiD(task.id);
                          onOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => {
                          deleteTask(task.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-around">
        <Button
          disabled={isloading}
          className=" mt-2 primary-button"
          onClick={() => deleteAll()}
        >
          {"Delete All"}
        </Button>
        <Button
          style={{ backgroundColor: "#e45d8a", color: "#ffffff" }}
          disabled={isloading}
          className=" mt-2 primary-button"
          onClick={() => logOut()}
        >
          {"Log out"}
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} className="dark-modal">
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newTask2}
              className="input-task"
              onChange={(e) => {
                setNewTask2(e.target.value);
              }}
              width="-webkit-fill-available me-2"
              placeholder="Add Something ..."
            />
          </ModalBody>

          <ModalFooter>
            <Button
              style={{ backgroundColor: "#e45d8a" }}
              mr={3}
              onClick={() => {
                editTask(editID);
                onClose();
              }}
            >
              {"Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
