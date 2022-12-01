import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Note = ({ note, updateNote }) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-4 my-2'>
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text"><small className="text-muted">{note.author}</small></p>
                    <div className="d-flex justify-content-between">
                        <i className="far fa-edit" onClick={()=>updateNote(note)}></i>
                        <i className="far fa-trash-alt" onClick={()=>deleteNote(note._id)}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;