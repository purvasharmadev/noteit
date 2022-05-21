import React, { useEffect } from "react";
import { useNotes } from "../../Context/notes-context";
import { Link } from "react-router-dom";
import { useTrash } from "../../Context/trash-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";

function Trash() {
  const { TrashList, setTrashList } = useTrash();
  const { dispatch, deleteNotes } = useNotes();

  console.log("tl ", TrashList);

  const trashNoteHandler = (item) => {
    let obj = TrashList.find((i) => i._id === item._id);
    setTrashList(() => TrashList[obj] === 0);
  };

  return (
    <>
      <h1 className="text-center color-primary">trash notes</h1>

      <div className="p-1 notes flex">
        <Sidebar />

        <div className="flex flex-wrap w-100 h-100">
          {TrashList && TrashList.length < 1 ? (
            <div className="container">
              <h2>Add notes</h2>
            </div>
          ) : (
            TrashList &&
            TrashList.map((item) => {
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
                      onClick={() => {
                        deleteNotes(item._id);
                        trashNoteHandler(item);
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

export { Trash };
