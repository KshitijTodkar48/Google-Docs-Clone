import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Img2 from "../assets/Create-New-Image.png"
import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid" 
import { useState } from "react"

export function Dialogbox() {
  const navigate = useNavigate() ;
  const [docName, setDocName] = useState<string>("") ;
    const createDoc = (docId: string) => {
      navigate(`/documents/${docId}`) ;
    }
    const handleSubmit = () => {
      const id = uuidV4() ;
      localStorage.setItem(`document-name-for-${id}`, docName) ;      
      createDoc(id) ;
    }
  return (
    <div className="border p-2 bg-white border-gray-300 h-[200px] w-[160px] rounded-md hover:border-blue-600">
        <Dialog>
        <DialogTrigger asChild>
          <img
              className="h-full w-full cursor-pointer"
              src={Img2}
              alt="createImg"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new document</DialogTitle>
            <DialogDescription>
              Enter a name for your document. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
                value={docName}
                onChange={(e) => { setDocName(e.target.value); }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button style={{"backgroundColor": "rgb(10, 110, 209)"}} type="submit" onClick={handleSubmit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
