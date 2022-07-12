import React from "react";
import { useNotes } from "../../Context/notes-context";
import { useTrash } from "../../Context/trash-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";

function Trash() {
  const { TrashList, setTrashList } = useTrash();
  const { deleteNotes } = useNotes();


  const trashNoteHandler = (item) => {
    // let obj = TrashList.find((i) => i._id === item._id);
    let newList = TrashList.filter((j)=>j._id !== item._id)
    setTrashList(newList)
  };

  return (
    <>
      <div className="p-1 notes flex">
        <Sidebar />

        <div className="flex flex-wrap w-100 h-100">
          {TrashList && TrashList.length < 1 ? (
            <div className="container">
              <h2>Trash is empty!!</h2>
            </div>
          ) : (
            TrashList &&
            TrashList.map((item) => {
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
