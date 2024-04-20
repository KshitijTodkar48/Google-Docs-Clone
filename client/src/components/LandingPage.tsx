import { useState, useEffect } from "react" ;
import { Docs } from "./Docs";
import { io } from "socket.io-client";
import { Topbar } from "./Topbar";
import { Dialogbox } from "./Dialogbox";
  

interface DocumentType {
    _id: string;
    name: string;
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
                <div className="title-1"> Start a new document </div>
                <div> <Dialogbox /> </div>
            </div>

            {
                (documents.length > 0) && (
                <div className="Docs-container-2">
                    <div className="title-2"> Recent documents </div>
                    <div>
                    {
                        documents?.map((docs, index) => 
                            <Docs documentId={docs._id} docName={docs.name} key={index}/>
                        )
                    }
                    </div>
                </div>)
            }
        </div>
    )
}