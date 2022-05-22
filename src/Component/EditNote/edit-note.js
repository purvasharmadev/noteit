import { useParams } from "react-router-dom";
import { useNotes } from "../../Context/notes-context";
import { useState, useEffect } from "react";

function EditNote() {
  const { id } = useParams();
  const { state, dispatch, editNotes } = useNotes();
  const [note, setNote] = useState([]);
  const [updatedNote, setUpdatedNote] = useState({
    title: state.title,
    tags: state.tags,
    priority: state.priority,
    notes: state.notes,
    color: state.color,
  });

  const getNote = () => {
    setNote(state.notesList.find((item) => item._id === id));
  };

  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editNotes(id, updatedNote);
  };

  return (
    <>
      <h1>Edit Notes</h1>
      <div className="flex w-100 flex-space-center p-1">
        {/* form */}
        <form
          onSubmit={handleFormSubmit}
          className="form-container w-50 text-left"
        >
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            name="title"
            placeholder="enter your name"
            value={state.title}
            onChange={(e) => {
              setUpdatedNote((prev) => ({ ...prev, title: e.target.value }));
              dispatch({ type: "title", payload: e.target.value });
            }}
          />
          <div className="flex">
            <div>
              <label htmlFor="tags">Tags </label>
              <select
                onChange={(e) => {
                  setUpdatedNote((prev) => ({ ...prev, tags: e.target.value }));
                  dispatch({ type: "tags", payload: e.target.value });
                }}
              >
                <option>{note.tags}</option>

                <option>Work</option>
                <option>Health</option>
                <option>Exercise</option>
                <option>Chores</option>
              </select>
            </div>
            <div>
              <label htmlFor="color">Color </label>
              <select
                onChange={(e) => {
                  setUpdatedNote((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }));
                  dispatch({ type: "color", payload: e.target.value });
                }}
              >
                <option>{note.color}</option>

                <option>Red</option>
                <option>Purple</option>
                <option>Blue</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority">Priority </label>
              <select
                onChange={(e) => {
                  setUpdatedNote((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }));
                  dispatch({ type: "priority", payload: e.target.value });
                }}
              >
                <option>{note.priority}</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <label htmlFor="notes">Note </label>
          <textarea
            className="input-textarea"
            type="text"
            name="notes"
            placeholder="enter your Note"
            value={state.notes}
            onChange={(e) => {
              setUpdatedNote((prev) => ({ ...prev, notes: e.target.value }));
              dispatch({ type: "notes", payload: e.target.value });
            }}
          />

          <button type="submit" className="btn btn-primary input-btn-left m-1">
            Update note
          </button>
        </form>
      </div>
    </>
  );
}

export { EditNote };
