import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_HOST;
    const [notes, setNotes] = useState([]);

    const getNotes = async() => {
        const response = await fetch(`${host}/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async(title, description, author) => {
        const response = await fetch(`${host}/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, author })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const editNote = async(id, title, description, author) => {
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, author })
        });
        await response.json();

        //  Logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].author = author;
          break;
        }
      }
      setNotes(newNotes);
    }

    const deleteNote = async(id) => {
        await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
    }

    return(
        <noteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;