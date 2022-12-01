import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom'

const AddNote = () => {

  const context = useContext(noteContext);
  const { addNote } = context;
  
  const [note, setNote] = useState({title: "", description: "", author: ""});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.author);
    setNote({title: "", description: "", author: ""});
    navigate('/');
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className='container my-3'>
      <h2>Add a Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title"  placeholder="Add Title Here..." onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name='description' rows="3" placeholder="Add Description Here..." onChange={onChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-control" id="author" name='author' placeholder="Add Author Here..." onChange={onChange} />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote;