import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    _id: String,
    name: String,
    data: Object
});

export const Document = mongoose.model("document", documentSchema) ;