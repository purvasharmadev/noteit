import React, { useState, useEffect } from "react";
import { useNotes } from "../../Context/notes-context";
import { Link } from "react-router-dom";
import { useArchive } from "../../Context/archive-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";
import { useTrash } from "../../Context/trash-context";
import { TrashModal } from "../../Component/ModalForm/trash-modal";
import {getDataFromLocal} from "../../Hooks/useLocalStorage"

function Notes() {
  const { state, dispatch } = useNotes();
  const { postNotesToArchive } = useArchive();
  const { trashModal, setTrashModal } = useTrash();
  const [noteId, setNoteId] = useState();
  const [noteList, setNoteList] = useState(getDataFromLocal("notes", []));

  const postToArchiveHandler = (id) => {
    postNotesToArchive(id);
  };

  const deleteNotesHandler = (id) => {
    setTrashModal(true);
    setNoteId(id);
  };


  useEffect(() => {
    setNoteList(state.notesList);
  }, [state.notesList]);

  return (
    <>
      {trashModal && (
        <div className="modal-div">
          <TrashModal closeModal={setTrashModal} id={noteId} />
        </div>
      )}
      <h1 className="text-center color-primary">Notes</h1>
      <div className="flex flex-space-center">
        <div className="flex flex-space-evenly">
          <button
            onClick={() => {
              let list = state.notesList;
              setNoteList(list);
            }}
            className="btn btn-primary-outline m-1"
          >
            All
          </button>

          {state.tagsArr.map((item) => {
            return (
              <button
                onClick={() => {
                  let list = state.notesList.filter((i) => i.tags === item);
                  setNoteList(list);
                }}
                className="btn btn-primary-outline m-1"
              >
                {item}
              </button>
            );
          })}
          {state.priorityArr.map((item) => {
            return (
              <button
                onClick={() => {
                  let list = state.notesList.filter((i) => i.priority === item);
                  setNoteList(list);
                }}
                className="btn btn-primary-outline m-1"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-1 notes flex">
        <Sidebar />

        {/* notes container */}
        <div className="flex flex-wrap w-100 h-100">
          {noteList && noteList.length < 1 ? (
            <div className="container">
              <h2>Add notes</h2>
            </div>
          ) : (
            noteList &&
            noteList.map((item) => {
              return (
                <div style={{backgroundColor:item.color}} key={item._id} className="card m-1">
                  <div className="card-heading p-1 color-primary bold">
                    {item.title}
                  </div>
                  <div className="card-body color-primary p-1">
                    <p>{item.notes}</p>
                    <span className="tag"> {item.tags}</span>
                    {item.priority && (
                      <span className="tag">{item.priority}</span>
                    )}
                  </div>
                  <div className="flex flex-space-between color-primary bold p-1">
                    <p className="text-small pointer">
                      <Link
                        className="link color-primary"
                        onClick={() => {
                          dispatch({ type: "title", payload: item.title });
                          dispatch({ type: "notes", payload: item.notes });
                          dispatch({type:"color",payload:item.color});
                          dispatch({type:"tags",payload:item.tags});
                          dispatch({type:"priority",payload:item.priority});
                        }}
                        to={`/edit/${item._id}`}
                      >
                        Edit
                      </Link>
                    </p>

                    <p
                      // onClick={() => {
                      //   deleteNotes(item._id);
                      // }}
                      onClick={() => deleteNotesHandler(item._id)}
                      className="text-small pointer"
                    >
                      Delete
                    </p>
                    <p
                      onClick={() => {
                        postToArchiveHandler(item._id);
                      }}
                      className="text-small pointer"
                    >
                      Archive
                    </p>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export { Notes };
