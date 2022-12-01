import React, { useContext, useEffect, useState, useRef } from 'react'
import Note from './Note'
import noteContext from '../context/notes/noteContext';

const Home = () => {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id: "", title: "", description: "", author: ""});

  useEffect(() => {
    getNotes();
    //  eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    editNote(note.id, note.title, note.description, note.author);
    refClose.current.click();
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description, author: currentNote.author});
  }

  return (
    <div className="container mt-4">

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Add Title Here..." value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name='description' rows="3" placeholder="Add Description Here..." value={note.description} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input type="text" className="form-control" id="author" name='author' placeholder="Add Author Here..." value={note.author} onChange={onChange} />
                </div>
              </form>


            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        {notes.map((note) => {
          return <Note note={note} updateNote={updateNote} key={note._id} />
        })}
      </div>
    </div>
  )
}

export default Home;