import "./note-modal.css";
import { useNotes } from "../../Context/notes-context";
import { useTrash } from "../../Context/trash-context";

export function TrashModal({ closeModal, id }) {
  const { state, dispatch, deleteNotes } = useNotes();
  const { postNotesToTrash, trashModal, setTrashModal } = useTrash();

  const postToTrashHandler = (id) => {
    console.log("from modal ", id);
    postNotesToTrash(id);
  };
  console.log("note tags ", state.tags);

  return (
    <div className="modal modal-trash">
      <div className="modal-body">
        <div className="modal-header flex flex-space-between align-item-center color-danger">
          <h3>Are you sure you want to delete ? </h3>
          <h3 onClick={() => closeModal(false)} className="alert-close-btn">
            ×
          </h3>
        </div>
        <div className="modal-text">
          You can move to trash instead or else note will be forever lost!
        </div>
        <div className="modal-footer">
          <button onClick={() => deleteNotes(id)} className="modal-btn">
            {" "}
            Permanently Delete{" "}
          </button>
          <button onClick={() => postToTrashHandler(id)} className="modal-btn">
            {" "}
            Move to trash{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
