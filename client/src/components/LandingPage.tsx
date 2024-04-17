import { useState, useEffect } from "react" ;
import { Docs, NewDocs } from "./Docs";
import { io } from "socket.io-client";
import { Topbar } from "./Topbar";

interface DocumentType {
    _id: string;
    data: {
        ops: any[];
    };
    __v: number;
}


export const LandingPage = () => {
    const [documents, setDocuments] = useState<DocumentType[]>([]) ;

    useEffect(() => {
        const socket = io("http://localhost:3000") ;

        socket.emit("get-all-documents") ;

        socket.on("all-documents", (allDocuments) => {
            console.log(allDocuments);
            
            setDocuments(allDocuments) ;
        });
        
        return () => {
            socket.disconnect() ;
        }
    }, []) ;

    return(
        <div className="LandingPage">
            <Topbar />
            <div className="Docs-container-1">
                <div className="title"> Start a new document </div>
                <div> <NewDocs /> </div>
            </div>

            <div className="Docs-container-2">
                <div className="title"> Recent documents </div>
                <div>
                    {
                        documents?.map((docs, index) => 
                            <Docs documentId={docs._id} key={index}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}