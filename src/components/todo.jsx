import { useReducer, useRef, useState } from "react";

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
    <div>
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
                setStat(true);
              }}
            >
              {stat ? "Done" : "Undone"}{" "}
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
    </div>
  );
};
