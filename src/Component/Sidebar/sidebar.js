import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useNotes } from "../../Context/notes-context";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../Component/ModalForm/note-modal";

function Sidebar() {
  const { openModal, setOpenModal } = useNotes();
  const location = useLocation();

  return (
    <div className="flex flex-column sidebar">
      {location.pathname === "/notes" ? (
        <button
        onClick={() => setOpenModal(true)}
        className="btn btn-primary mb-1"
      >
        <BsFillPencilFill /> Add Note
      </button>
      ) : (
        <Link to="/notes" className="btn btn-primary mb-1">
        <BsFillPencilFill /> All Notes
      </Link>

      )}

      <Link to="/archives" className="btn btn-primary mb-1">
        <BsFillPencilFill /> Archives
      </Link>
      <Link to="/trash" className="btn btn-primary mb-1">
        <BsFillPencilFill /> Trash
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
