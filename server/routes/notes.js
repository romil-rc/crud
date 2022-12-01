const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

//  Getting all notes
router.get('/', async(req, res)=>{
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
    console.log("All Notes")
})

//  Posting a note
router.post('/addnote', async(req, res)=>{
    // console.log(req);
    const { title, description, author } = req.body;
    const note = new Note({ title, description, author });
    const savedNote = await note.save();
    res.json(savedNote);
    console.log("Note sent");
})

//  Updating a note
router.put('/updatenote/:id', async(req, res)=>{
    const { title, description, author } = req.body;
    const newNote = {};
    if(title){ newNote.title = title};
    if(description){ newNote.description = description}
    if(author){ newNote.author = author}
    const note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json(note);
    console.log("Note Updated.");
})

//  Deleting a note
router.delete('/deletenote/:id', async(req, res)=>{
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json(note);
    console.log("Note deleted");
})

module.exports = router;