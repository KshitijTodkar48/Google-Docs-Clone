import { useState, useEffect, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { TOOLBAR_OPTIONS, SAVE_INTERVAL_MS } from '../constants';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

export const TextEditor = () => {
    const [socket, setSocket] = useState<Socket>() ;
    const [quill, setQuill] = useState<Quill>() ;
    const { id: documentId } = useParams() ;
    
    useEffect(() => {
        const skt = io(import.meta.env.VITE_SERVER_URL) ;
        setSocket(skt) ;
        return () => {
            skt.disconnect() ;
        }
    }, [])

    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if(!wrapper) return ;
        wrapper.innerHTML = '' ;
    
        const editor = document.createElement("div") ;
        wrapper.append(editor) ;

        const qul = new Quill(editor, 
            { 
                theme: "snow", 
                modules: {
                toolbar: TOOLBAR_OPTIONS
              }
            });
        qul.disable() ;   
        qul.setText("Loading...") ;
        setQuill(qul) ;
    }, [])

    // Sending changes to server.
    useEffect(() => {
        if(!socket || !quill){
            return ;
        }

        // @ts-ignore
        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return ;
            socket.emit("send-changes", delta) ;
        }

        quill.on("text-change", handler) ;

        return () => {
            quill.off("text-change", handler) ;
        }

    }, [socket, quill])

    // Receiving changes from server.
    useEffect(() => {
        if(!socket || !quill){
            return ;
        }

        // @ts-ignore
        const handler = (delta) => {
            quill.updateContents(delta) ;
        }

        socket.on("receive-changes", handler) ;

        return () => {
            socket.off("receive-changes", handler) ;
        }

    }, [socket, quill])

    useEffect(() => {
        if(!socket || !quill){
            return ;
        }

        socket.once("load-document", document => {
            quill.setContents(document) ;
            quill.enable() ;
        })

        const documentName = localStorage.getItem(`document-name-for-${documentId}`) || "Untitled" ;
        socket.emit("get-document", { documentId, documentName }) ;

    }, [socket, quill, documentId])

    useEffect(() => {
        if(!socket || !quill){
            return ;
        }
        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents()) ;
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval) ;
            localStorage.clear() ;
        }
    }, [socket, quill])

    return(
        <div className="editorContainer" ref={wrapperRef}>

        </div>
    )
}