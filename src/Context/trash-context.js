import { createContext, useContext, useState,useEffect } from "react";
import { useNotes } from "./notes-context";
import { getDataFromLocal } from "../Hooks/useLocalStorage";
import {toast} from "react-toastify";


const TrashContext = createContext();

function TrashProvider({ children }) {
  const { state, dispatch } = useNotes();
  const [trashModal, setTrashModal] = useState(false);

  const [TrashList, setTrashList] = useState(getDataFromLocal("trash", [])  );

  const postNotesToTrash = (id) => {
    let obj = state.notesList.find((item) => item._id === id);
    setTrashList((prev) => [...prev, obj]);
    let list = state.notesList.filter((item)=>item._id !== id)
    dispatch({type:"notes_LIST",payload:list})
    setTrashModal(false)
    toast.success("Note moved to trash!", {
      id: "post-trash-success",
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

    // Saving notes in localStorage
    useEffect(() => {
      // getNotes();
      localStorage.setItem("trash", JSON.stringify(TrashList));
    }, [TrashList]);

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
