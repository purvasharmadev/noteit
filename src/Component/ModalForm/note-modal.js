import "./note-modal.css";
import { useNotes } from "../../Context/notes-context";
import {useState} from "react";

export function Modal({ closeModal }) {
  const { state, dispatch, postNotes, setOpenModal } = useNotes();
  const [error,setError] = useState(false)

  // Handle Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!state.title || !state.notes){
      console.log("input fields are empty!")
      setError(true)
    }else{
      postNotes();
      setOpenModal(false);
    }
  };
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-header flex flex-space-between align-item-center color-primary">
          <h3>Add note</h3>

          <h3 onClick={() => closeModal(false)} className="alert-close-btn">
            X
          </h3>
        </div>
        <form onSubmit={handleFormSubmit} className="form-container text-left">
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            name="title"
            placeholder="Enter Note Title"
            value={state.title}
            onChange={(e) => {
              dispatch({ type: "title", payload: e.target.value });
              setError(false)
            }}
          />
          <label htmlFor="notes">Note </label>
          <textarea
            type="text"
            name="notes"
            placeholder="enter your Note"
            value={state.notes}
            onChange={(e) => {
              dispatch({ type: "notes", payload: e.target.value });
              setError(false)
            }}
            className="input-textarea"
          />

          <div className="flex m-1">
            <div>
              <label htmlFor="tags">Tags </label>
              <select
                onChange={(e) => {
                  dispatch({ type: "tags", payload: e.target.value });
                }}
              >
                <option>{state.tags}</option>
                <option>Code</option>
                <option>Health</option>
                <option>Exercise</option>
                <option>Chores</option>
              </select>
            </div>
            <div>
              <label htmlFor="color">Color </label>
              <select
                onChange={(e) => {
                  dispatch({ type: "color", payload: e.target.value });
                }}
              >
                <option>{state.color}</option>
                <option>Red</option>
                <option>Purple</option>
                <option>Blue</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority">Priority </label>
              <select
                onChange={(e) => {
                  dispatch({ type: "priority", payload: e.target.value });
                }}
              >
                <option>{state.priority}</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          {error && <p className="error">Input fields are empty</p>}
          <div className="flex">
            <button
              onClick={() => dispatch({ type: "DUMMY_notes" })}
              className="btn btn-primary input-btn-left m-1"
            >
              {" "}
              Dummy notes{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary input-btn-left m-1"
            >
              Save notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
