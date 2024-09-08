import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import React from 'react'

function CommentDialog({open,setOpen}) {

  return (
    <div>


<Dialog open={open}> 
    <DialogContent>
        <img src="https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw"
 alt="post_img" />
    </DialogContent>
</Dialog>
    </div>
  )
}

export default CommentDialog