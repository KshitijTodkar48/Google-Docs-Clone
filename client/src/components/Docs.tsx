import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import Img1 from "../assets/Google-Docs-logo.png"
import Img2 from "../assets/Create-New-Image.png"

export const Docs = ({ documentId }: { documentId: string }) => {
    const navigate = useNavigate() ;

    const openDoc = (id: string) => {
        navigate(`/documents/${id}`) ;
    }
    return(
        <div className="docs" onClick={() => {openDoc(documentId); }}>
            <img src={Img1} alt="icon"/>
            <div> {documentId} </div>
        </div>
    )
}

export const NewDocs = () => {
    const navigate = useNavigate() ;
    const createDoc = () => {
        navigate(`/documents/${uuidV4()}`) ;
    }
    return(
        <div className="docs newdocs" onClick={ createDoc }>
            <img src={Img2} alt="icon"/>
        </div>
    )
}