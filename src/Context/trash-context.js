import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNotes } from "./notes-context";

const TrashContext = createContext();

function TrashProvider({ children }) {
  const { state, dispatch } = useNotes();
  const [trashModal, setTrashModal] = useState(false);

  const [TrashList, setTrashList] = useState([]);

  const postNotesToTrash = (id) => {
    let obj = state.notesList.find((item) => item._id === id);
    dispatch({ type: "notes_LIST", payload: state.notesList[obj] === 0 });
    setTrashList((prev) => [...prev, obj]);
  };


  return (
    <TrashContext.Provider
      value={{
        TrashList,
        setTrashList,
        postNotesToTrash,
        trashModal,
        setTrashModal,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
}

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
