import React from 'react'
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
import { MoreHorizontal } from 'lucide-react'


export default function Checks() {
  return (
    <div>

   
<div className='w-1/2 bg-blue-500 flex justify-between'> 
    <div >Hi</div>

    <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer text-xl hover:text-gray-600" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center p-4 bg-white rounded-lg shadow-lg">
            <Button
              variant="ghost"
              className="cursor-pointer w-full mb-2 text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-full mb-2 font-bold">
              Add to Favourite
            </Button>
            <Button variant="ghost" className="cursor-pointer w-full mb-2 font-bold">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
</div>

    </div>
  )
}
