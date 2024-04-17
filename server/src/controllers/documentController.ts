import { Document } from "../models/documentModel";

const defaultData = "";

export const getAllDocuments = async() => {
    const documents = await Document.find() ;
    return documents ;
}

export const findOrCreateDocument = async(id: string) => {
    if(!id){
        return ;
    }   
    const document = await Document.findById(id) ;
    if(document){
        return document ;
    }

    const newDocument = await Document.create({ _id: id, data: defaultData }) ;
    
    return newDocument ;
}

export const updateDocument = async(id: string, data: Object) => {
    if(!id){
        return ;
    }
    await Document.findByIdAndUpdate(id, data) ;
}