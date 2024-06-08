import React, { useState, useEffect } from "react";
import { ToDoContextProvider } from "./contexts/ToDoContext";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";

function App() {
  const [toDos, setToDos] = useState([]);

  const addToDo = (todo) => {
    setToDos((oldToDos) => [...oldToDos, { id: Date.now(), ...todo }]);
  };

  const updateToDo = (id, todo) => {
    setToDos((oldToDos) =>
      oldToDos.map((prevToDo) => (prevToDo.id === id ? todo : prevToDo))
    );
  };

  const deleteToDo = (id) => {
    setToDos((prevToDo) => prevToDo.filter((todo) => todo.id !== id));
  };

  const toggleToDo = (id) => {
    setToDos((oldToDos) =>
      oldToDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed }: todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("TODODKEy"));
    if (todos && todos.length > 0) {
      setToDos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TODODKEy", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <ToDoContextProvider
      value={{ toDos, addToDo, updateToDo, deleteToDo, toggleToDo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {toDos.map((todo) => (
              <div key={todo.id} className="w-full">
                <ToDoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  );
}

export default App;
