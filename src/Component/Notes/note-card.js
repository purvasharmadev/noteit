import React from 'react'

function NoteCard(props) {
  return (
    <div key={props._id} className="card m-1">
    <div className="card-heading p-1 color-primary bold">
      {props.title}
    </div>
    <div className="card-body color-primary p-1">
      <p>{props.notes}</p>
    <span className="tag">  {props.tags}</span>
    {
      props.priority && <span className="tag">{props.priority}</span>
    }
    </div>
    <div className="flex flex-space-between color-primary bold p-1">
      <p className="text-small pointer">
      <Link className="link color-primary" onClick={
            ()=>{
              dispatch({ type: "title", payload: props.title });
              dispatch({ type: "notes", payload: props.notes });
            }
        } to={`/edit/${props._id}`}>Edit</Link>
      </p>
       
      <p
        onClick={() => {
            deleteNotes(props._id)
        }}
        className="text-small pointer"
      >
        Delete
      </p>
      <p
        onClick={() => {
            postToArchiveHandler(props._id)
        }}
        className="text-small pointer"
      >
        Archive
      </p>
    </div>
  </div>
  )
}

export default NoteCard