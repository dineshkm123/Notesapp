'use client'

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



function Addnewnotes({ setcurrenteditednotesid, openDialogue, setOpenDialogue, loading, setloading, notesformdata, setnotesformdata, Handlesavenotesdata, currenteditednotesid }) {


  return (
    <Fragment>
      <Dialog open={openDialogue} onOpenChange={() => {
        setOpenDialogue(false)
        setnotesformdata({
          title: "",
          description: ""
        });
        setcurrenteditednotesid(null);
      }}>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currenteditednotesid ? 'edit blog' : "Add new notes"}{" "}
            </DialogTitle>

          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                name="title"
                placeholder="enter notes tittle"
                value={notesformdata.title}
                onChange={(event) => setnotesformdata(
                  {
                    ...notesformdata,
                    title: event.target.value
                  }
                )}

              />
            </div>
            <div>
              <Label className="text-right">
                Description
              </Label>
              <Input
                id="Description"
                className="col-span-3"
                name="description"
                value={notesformdata.description}
                onChange={(event) => setnotesformdata(
                  {
                    ...notesformdata,
                    description: event.target.value
                  }
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={Handlesavenotesdata} type="button">
              {loading ? 'saving changes' : 'save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
export default Addnewnotes;