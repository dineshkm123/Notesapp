import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Notes = mongoose.models.Notes || mongoose.model('Notes', notesSchema);
export default Notes;
