import Note from "../models/Note.js";


export async function getAllNotes(_, res) {
    try{
     const notes = await Note.find().sort("{created:-1}");
     res.status(200).json(notes);
    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getAllNoteById(req, res) {
    try{
        const notes = await Note.findById(req.params.id);
        if(!notes){
            res.status(404).json({message: "Note not Found"});
        }
        res.status(200).json(notes);
    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({
            title: title,
            content: content,
        })
        if(!note) {
            res.status(404).json({message: "Note not Found"});
            return;
        }
        await note.save();
        res.status(201).json({message:"Note created"});

    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNote(req, res) {

    try {
        const {id,title, content} = req.body;
        console.log(`id: ${req.params.id}, title: ${title}, content: ${content}`);
        const note = await Note.findByIdAndUpdate(req.params.id,{title, content});

        if(!note) {
            res.status(404).json({message: "Note not Found"});
            return;
        }

        res.status(200).json({message:"Note updated"});

    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }

}

export async function deleteNote(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Note was deleted"});

    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}