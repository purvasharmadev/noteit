import React,{useState} from "react";
import { useNotes } from "../../Context/notes-context";
import { Link } from "react-router-dom";
import { useArchive } from "../../Context/archive-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";
import {useTrash} from "../../Context/trash-context"
import { TrashModal } from "../../Component/ModalForm/trash-modal";

function Notes() {
  const { state, dispatch, deleteNotes } = useNotes();
  const { postNotesToArchive } = useArchive();
  const {trashModal,setTrashModal} = useTrash();
  const [noteId,setNoteId] = useState()

  const postToArchiveHandler = (id) => {
    postNotesToArchive(id);
  };

  const deleteNotesHandler = (id)=>{
    setTrashModal(true);
    setNoteId(id)
  }

  let list = state.notesList;

  return (
    <>
          {trashModal && (
        <div className="modal-div">
          <TrashModal closeModal={setTrashModal} id={noteId} />
        </div>
      )}
      <h1 className="text-center color-primary">Notes</h1>
      <div className="p-1 notes flex">
        <Sidebar />

        {/* notes container */}
        <div className="flex flex-wrap w-100 h-100">
          {list && list.length < 1 ? (
            <div className="container">
              <h2>Add notes</h2>
            </div>
          ) : (
            list &&
            list.map((item) => {
              return (
                <div key={item._id} className="card m-1">
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
                      onClick={()=>deleteNotesHandler(item._id)}
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
