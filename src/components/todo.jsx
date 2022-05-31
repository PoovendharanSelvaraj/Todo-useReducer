import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  border: 1px solid red;
  width: 100vh;
  height: fit-content;
  background: royalblue;
  border-radius: 5px;
  padding: 5px;

  h1 {
    color: white;
  }
  input {
    border-radius: 5px;
    height: 30px;
    width: 80%;
  }
  input:focus {
    outline-offset: 5px;
  }
  div {
    background-color: white;
    border-radius: 5px;
    width: 80%;
    margin: auto;
    color: teal;
  }
`;

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { name: action.name, status: action.status }];
    case "status":
      return state.filter((item, index) =>
        index === action.index ? !item.status : item.status
      );
    case "delete":
      return state.filter((item, index) => index !== action.index);
    default:
      return state;
  }
};

export const Todo = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const taskRef = useRef(null);
  const [stat, setStat] = useState(false);
  // useEffect(() => taskRef.current.focus());
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      name: taskRef.current.value,
      status: false
    });
    taskRef.current.value = "";
    console.log(tasks);
  };

  return (
    <Div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Todo</h1>
        <input type="text" placeholder="add task" ref={taskRef} />
      </form>

      {tasks.map((task, index) => {
        return (
          <div key={index}>
            {task.name}
            <button
              onClick={() => {
                dispatch({ type: "status", index });
                setStat(!stat);
              }}
            >
              {stat ? "UnDone" : "Done"}{" "}
            </button>
            <button
              onClick={() => {
                dispatch({ type: "delete", index });
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </Div>
  );
};
