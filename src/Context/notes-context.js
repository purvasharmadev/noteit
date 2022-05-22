import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getDataFromLocal } from "../Hooks/useLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotesContext = createContext();

function NotesProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const navigateTo = useNavigate();
  // Reducer Function
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "title":
        return { ...state, title: action.payload };
      case "tags":
        return { ...state, tags: action.payload };
      case "color":
          return { ...state, color: action.payload };
      case "priority":
        return { ...state, priority: action.payload };
      case "notes":
        return { ...state, notes: action.payload };
      case "notes_LIST":
        return { ...state, notesList: action.payload };
      case "DUMMY_notes":
        return {
          ...state,
          title: "Note 1",
          tags: "Work",
          priority: "High",
          notes: "edit this template",
          color:"grey"
        };
      case "CLEAR_notes":
        return { ...state, title: "", tags: "",color:"", priority: "", notes: "" };
      default:
        return state;
    }
  };

  // eslint-disable-next-line
  // useReducer
  const [state, dispatch] = useReducer(reducerFn, {
    title: "",
    tags: "",
    notes: "",
    priority: "",
    color:"",
    notesList: getDataFromLocal("notes", []),
    tagsArr: ["Work", "Code", "Health", "Exercise", "Chores"],
    priorityArr: ["High", "Medium", "Low"],
  });

  async function postNotes() {
    try {
      const res = await axios.post(
        "/api/notes",
        {
          note: {
            title: state.title,
            tags: state.tags,
            notes: state.notes,
            color:state.color,
            priority:state.priority
          },
        },
        {
          headers: {
            "content-type": "text/json",
            authorization: localStorage.getItem("userToken"),
          },
        }
      );
      dispatch({ type: "notes_LIST", payload: res.data.notes });
      dispatch({ type: "CLEAR_notes"});
    } catch (error) {
      console.error(error.response.data.errors[0]);
    }
  }

  async function editNotes(id, newItem) {
    try {
      console.log("newItem ", newItem)
      const res = await axios.post(
        `/api/notes/${id}`,
        {
          note: newItem,
        },
        {
          headers: {
            "content-type": "text/json",
            authorization: localStorage.getItem("userToken"),
          },
        }
      );
      dispatch({ type: "notes_LIST", payload: res.data.notes });
      navigateTo("/notes");
      dispatch({ type: "CLEAR_notes" });
    } catch (error) {
      console.error(error.resposne.data.errors[0]);
    }
  }

  async function deleteNotes(id) {
    try {
      const res = await axios.delete(`/api/notes/${id}`, {
        headers: {
          "content-type": "text/json",
          authorization: localStorage.getItem("userToken"),
        },
      });
      dispatch({ type: "notes_LIST", payload: res.data.notes });
    } catch (error) {
      console.error(error.response.data.errors[0]);
    }
  }

  // Saving notes in localStorage
  useEffect(() => {
    if(state.notesList !== undefined){
      localStorage.setItem("notes", JSON.stringify(state.notesList));

    }else{
      localStorage.setItem("notes",[])
    }
  }, [state.notesList]);


  return (
    <NotesContext.Provider
      value={{
        state,
        dispatch,
        postNotes,
        editNotes,
        deleteNotes,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
