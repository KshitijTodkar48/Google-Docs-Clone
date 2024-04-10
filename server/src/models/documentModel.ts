import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    _id: String,
    data: Object
});

export const Document = mongoose.model("document", documentSchema) ;