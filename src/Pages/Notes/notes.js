import React, { useState, useEffect } from "react";
import { useNotes } from "../../Context/notes-context";
import { Link } from "react-router-dom";
import { useArchive } from "../../Context/archive-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";
import { useTrash } from "../../Context/trash-context";
import { TrashModal } from "../../Component/ModalForm/trash-modal";
import { BsFillPencilFill,BsTrashFill,BsFillSave2Fill } from "react-icons/bs";


function Notes() {
  const { state, dispatch, noteList,setNoteList,setOpenModal } = useNotes();
  const { postNotesToArchive } = useArchive();
  const { trashModal, setTrashModal } = useTrash();
  const [noteId, setNoteId] = useState();

  const postToArchiveHandler = (id) => {
    postNotesToArchive(id);
  };

  const deleteNotesHandler = (id) => {
    setTrashModal(true);
    setNoteId(id);
  };

  useEffect(() => {
    setNoteList(state.notesList);
    //eslint-disable-next-line
  }, [state.notesList]);

  return (
    <>
      {trashModal && (
        <div className="modal-div">
          <TrashModal closeModal={setTrashModal} id={noteId} />
        </div>
      )}
      <div className="p-1 notes flex">
        <Sidebar />
     
        {/* notes container */}
        <div className="flex flex-wrap h-100 w-100">
          <div className=" text-right w-100 h-10">
          <span onClick={()=>setOpenModal(true)} className="text-normal p-1 pointer color-text"><BsFillPencilFill/> Add Notes</span>
          </div>
            <div className="flex flex-space-left w-100 flex-wrap ">

          {noteList && noteList.length < 1 ? (
            <div className="flex flex-space-center align-item-center w-100 flex-column">
              <img  height="300px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tomboy_logo.svg/1200px-Tomboy_logo.svg.png" alt="logo"/>
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
                       <BsFillPencilFill/> Edit
                      </Link>
                    </p>

                    <p
                      // onClick={() => {
                      //   deleteNotes(item._id);
                      // }}
                      onClick={() => deleteNotesHandler(item._id)}
                      className="text-small pointer"
                    >
                     <BsTrashFill/>  Delete
                    </p>
                    <p
                      onClick={() => {
                        postToArchiveHandler(item._id);
                      }}
                      className="text-small pointer"
                    >
                     <BsFillSave2Fill/> Archive
                    </p>
                  </div>

                </div>

              );
            })
          )}
        </div>
        </div>

      </div>
    </>
  );
}

export { Notes };
