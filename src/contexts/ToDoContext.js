import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  toDos: [
    {
      id: 1,
      toDo: "what's the todo!!!",
      completed: false,
    },
  ],
  addToDo: (toDo) => {},
  updateToDo: (id, toDo) => {},
  deleteToDo: (id) => {},
  toggleToDo: (id) => {},
})
 function useToDo(){
  return useContext(ToDoContext);
}

export const ToDoContextProvider = ToDoContext.Provider;

export default useToDo;