import React from "react";
import {useNotes} from "../../Context/notes-context"
import { Link } from "react-router-dom";
import {Modal} from "../../Component/ModalForm/note-modal"
import {BsFillPencilFill} from "react-icons/bs"

function Notes() {
    const {state,dispatch,deleteNotes,openModal,setOpenModal}= useNotes()



  let list = state.notesList;

  return (
    <>
      <div className="w-100 p-1 notes">
        <div className="flex">
        <button onClick={() => setOpenModal(true)} className="btn btn-primary">
       <BsFillPencilFill/>  Add Note
      </button>
        </div>

        <div className="text-left mb-1">
      

      {openModal && (
        <div className="modal-div">
          <Modal
            closeModal={setOpenModal}
          />
        </div>
      )}

        </div>

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
                  <span className="tag">  {item.tags}</span>
                  {
                    item.priority && <span className="tag">{item.priority}</span>
                  }
                  </div>
                  <div className="flex flex-space-between color-primary bold p-1">
                    <p className="text-small pointer">
                    <Link className="link color-primary" onClick={
                          ()=>{
                            dispatch({ type: "title", payload: item.title });
                            dispatch({ type: "notes", payload: item.notes });
                          }
                      } to={`/edit/${item._id}`}>Edit</Link>
                    </p>
                     
                    <p
                      onClick={() => {
                          deleteNotes(item._id)
                      }}
                      className="text-small pointer"
                    >
                      Delete
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