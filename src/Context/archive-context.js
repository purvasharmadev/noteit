import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
import { useNotes } from "./notes-context";
import { getDataFromLocal } from "../Hooks/useLocalStorage";
import {toast} from "react-toastify";


const ArchiveContext = createContext();

function ArchiveProvider({ children }) {
  const { state, dispatch } = useNotes();

  const [archiveList, setArchiveList] = useState(getDataFromLocal("archive", []));

  async function getArchive() {
    try {
      const res = await axios.get("/api/archives", {
        headers: {
          "content-type": "text/json",
          authorization: localStorage.getItem("userToken"),
        },
      });
      setArchiveList(res.data.archives);

    } catch (error) {
      console.error(error.response.data.errors[0]);
      toast.danger(error.response.data.errors[0], {
        id: "getpost-archive-error",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }

  async function postNotesToArchive(id) {
    try {
      const res = await axios.post(
        `/api/notes/archives/${id}`,
        {
          note: {
            title: state.title,
            tags: state.tags,
            notes: state.notes,
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
      toast.success("Note archived!", {
        id: "post-archive-success",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      
    } catch (error) {
      console.error(error.response.data.errors[0]);
      toast.danger(error.response.data.errors[0], {
        id: "post-archive-error",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }


  async function restoreArchive(id) {
    try {
      const res = await axios.post(
        `/api/archives/restore/${id}`,
        {},
        {
          headers: {
            "content-type": "text/json",
            authorization: localStorage.getItem("userToken"),
          },
        }
      );
      setArchiveList(res.data.archives);

      dispatch({ type: "notes_LIST", payload: res.data.notes });
      toast.success("Note restored!", {
        id: "post-archive-error",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error.response.data.errors[0]);
      toast.danger(error.response.data.errors[0], {
        id: "post-restore-archive-error",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }

  async function deleteArchive(id) {
    try {
      const res = await axios.delete(
        `/api/archives/delete/${id}`,
        {
          headers: {
            "content-type": "text/json",
            authorization: localStorage.getItem("userToken"),
          },
        }
      );
      setArchiveList(res.data.archives);
      toast.error("Note deleted from archived!", {
        id: "post-delete-archive-success",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      
    } catch (error) {
      console.error(error.response.data.errors[0]);
      toast.danger(error.response.data.errors[0], {
        id: "post-archive-delete-error",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }

  // Saving archive in localStorage
  useEffect(() => {
    localStorage.setItem("archive", JSON.stringify(archiveList));
  }, [archiveList]);

  return (
    <ArchiveContext.Provider
      value={{
        archiveList,
        setArchiveList,
        getArchive,
        restoreArchive,
        postNotesToArchive,
        deleteArchive
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}

const useArchive = () => useContext(ArchiveContext);

export { ArchiveProvider, useArchive };
