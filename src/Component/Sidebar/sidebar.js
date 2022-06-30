import React,{useState} from "react";
import "./sidebar.css"
import { BsLightbulb , BsTrashFill,BsFillSave2Fill,BsTagFill } from "react-icons/bs";
import { useNotes } from "../../Context/notes-context";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../Component/ModalForm/note-modal";

function Sidebar() {
  const { openModal, setOpenModal, state,setNoteList} = useNotes();
  const location = useLocation();
  const [active,setActive] = useState("notes")

  return (
    
    <div className="flex flex-column sidebar">
        <div onClick={() => {
              let list = state.notesList;
              setNoteList(list);
            }} className="mb-1 flex align-item-center p-0 row link" 
            id={active==="notes" ? "active":""}
            >
        <span><BsLightbulb/></span>
         <span>All Notes</span>
         </div>

      {/* {location.pathname === "/notes" ? (
        <div
        id={active==="notes" ? "active":""}
        onClick={() => {
          setOpenModal(true)
          setActive("notes")
        }}
        className="mb-1 flex align-item-center p-0 row link"
      >
        <span><BsFillPencilFill /></span>
         <span>Add Note</span>
      </div>
      ) : (
        <Link to="/notes" className="link" >
        <div className="mb-1 flex align-item-center p-0 row" >
        <span><BsLightbulb/></span>
         <span>All Notes</span>
         </div>

      </Link>


      )} */}

      <span className="divider"></span>
      <h4 className="color-grey">Labels</h4>
      {state.tagsArr.map((item) => {
            return (
              <div
              onClick={() => {
                let list = state.notesList.filter((i) => i.tags === item);
                setNoteList(list);
                setActive(item)
              }}
              id={active === item ? "active":""}
               className="mb-1 flex align-item-center p-0 row link">
              <span><BsTagFill /></span>
               <span>{item}</span>
               </div>
            );
          })}

          <span className="divider mb-1"></span>

      <Link to="/archives"   id={location.pathname==="/archives" ? "active":""}className="mb-1 flex align-item-center p-0 row link">
        <span><BsFillSave2Fill /></span>
         <span>Archives</span>
      </Link>
      <Link to="/trash"  id={location.pathname==="/trash" ? "active":""} className="mb-1 flex align-item-center p-0 row link">
        <span><BsTrashFill /></span>
         <span>Trash</span>
      </Link>

      <div className="text-left mb-1">
        {openModal && (
          <div className="modal-div">
            <Modal closeModal={setOpenModal} />
          </div>
        )}
      </div>
    </div>
  );
}

export { Sidebar };
