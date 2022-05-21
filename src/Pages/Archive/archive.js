import React, { useEffect } from "react";
import { useNotes } from "../../Context/notes-context";
import { Link } from "react-router-dom";
import { useArchive } from "../../Context/archive-context";
import { Sidebar } from "../../Component/Sidebar/sidebar";

function Archive() {
  const { archiveList, getArchive, restoreArchive,deleteFromArchive } = useArchive();
  const { dispatch, deleteNotes } = useNotes();

  function removeFromArchiveHandler(id) {
    restoreArchive(id);
  }

  function deleteFromArchiveHandler(id){
      deleteFromArchive(id)
  }


  useEffect(() => {
    getArchive();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="text-center color-primary">Archive notes</h1>

      <div className="p-1 notes flex">
        <Sidebar />

        <div className="flex flex-wrap w-100 h-100">
          {archiveList && archiveList.length < 1 ? (
            <div className="container">
              <h2>Add notes</h2>
            </div>
          ) : (
            archiveList &&
            archiveList.map((item) => {
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
                        deleteFromArchiveHandler(item._id);
                      }}
                      className="text-small pointer"
                    >
                      Delete
                    </p>
                    <p
                      onClick={() => {
                        removeFromArchiveHandler(item._id);
                      }}
                      className="text-small pointer"
                    >
                      Restore
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

export { Archive };
