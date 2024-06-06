'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Addnewnotes from "@/components/addnewnotes";
import Image from "next/image";
import {
   Card,
   CardContent,
   CardDescription,
   CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
const initialnotesformdata = {
   title: "",
   description: ""
};
function Notesoverview({ noteslist }) {
   const [openDialogue, setOpenDialogue] = useState(false)
   const [loading, setloading] = useState(false)
   const [notesformdata, setnotesformdata] = useState(initialnotesformdata)
   const [currenteditednotesid, setcurrenteditednotesid] = useState(null)
   const router = useRouter();
   useEffect(() => {
      router.refresh()
   }, [])
   async function Handlesavenotesdata() {
      try {
         setloading(true)
         const apiresponse = currenteditednotesid !== null ?
            await fetch(`/api/updatenotes?id=${currenteditednotesid}`, {
               method: "PUT",
               body: JSON.stringify(notesformdata)
            })
            : await fetch("/api/addnotes", {
               method: 'POST',
               body: JSON.stringify(notesformdata),

            })

         const result = await apiresponse.json();
         if (result?.success) {
            setnotesformdata(initialnotesformdata)
            setOpenDialogue(false)
            setloading(false)
            setcurrenteditednotesid(null)
            router.refresh()
         }
      } catch (error) {

         console.log(error);
         setloading(false)
         setnotesformdata(initialnotesformdata)

      }
   }

   async function handledeletebyid(getcurrentid) {
      try {

         const apiresponse = await fetch(`/api/deletenotes?id=${getcurrentid}`, {
            method: "DELETE"
         })
         const result = await apiresponse.json();
         if (result?.success) {
            router.refresh()
         }
      } catch (error) {
         console.log(error);
      }
   }
   function handleedit(getcurrentnotes) {
      setcurrenteditednotesid(getcurrentnotes?._id);
      setnotesformdata({
         title: getcurrentnotes?.title,
         description: getcurrentnotes?.description,
      });
      setOpenDialogue(true)
   }
   return (

      <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">

         <div className="m-auto  text-5xl">  Dimaginer Notes</div>
         <div className="flex flex-row-reverse   ">

            <Image src={"/plus-square.svg"} width={50} height={50} onClick={() => setOpenDialogue(true)} className="	bg-cyan-100 rounded-lg"></Image>
         </div>




         <Addnewnotes
            openDialogue={openDialogue}
            setOpenDialogue={setOpenDialogue}
            loading={loading}
            setloading={setloading}
            notesformdata={notesformdata}
            setnotesformdata={setnotesformdata}
            Handlesavenotesdata={Handlesavenotesdata}
            currenteditednotesid={currenteditednotesid}
            setcurrenteditednotesid={setcurrenteditednotesid}
         />


         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-6 mt-5 w-2/3  m-auto ">
            {
               noteslist && noteslist.length > 0 ?
                  noteslist.map((notesitem, i) =>
                     <Card key={i} className=" p-5 backdrop-blur-md border-black bg-slate-300 text-black">
                        <CardContent>
                           <CardTitle className="mb-5 justify-centre opacity-100" >{notesitem.title}</CardTitle>
                           <CardDescription className="mt-5 flex gap-4  items-centre opacity-100 text-black"> {notesitem.description}</CardDescription>
                           <Button className="mr-5 mt-5" onClick={() => handleedit(notesitem)}>Edit</Button>
                           <Button onClick={() => handledeletebyid(notesitem._id)}> Delete</Button>
                        </CardContent>
                     </Card>
                  )
                  : null
            }
         </div>
      </div>
   );


}

export default Notesoverview;