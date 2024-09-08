import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

function Post() {
  const [text, setText] = useState("");
  const [open,setOpen] =useState(false);

  const changeEventHandler = (e) => {
    const inputText = e.target.value; // Input value for the post
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  return (
    <div className="my-8 w-full max-w-smn ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-base sm:text-lg font-semibold">username</h1>
        </div>
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

      <img
        className="rounded-lg my-2 w-full aspect-square object-cover"
        src="https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw"
        alt="Post"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 justify-center items-center">
          <FaRegHeart size={"22px"} className="text-gray-700 hover:text-red-600" />
          <MessageCircle onClick={()=>setOpen(true)} className="cursor-pointer text-gray-700 hover:text-gray-600" />
          <Send className="cursor-pointer text-gray-700 hover:text-gray-600" />
        </div>
        <Bookmark className="text-gray-700 hover:text-gray-600" />
      </div>

      <span className="font-medium block mb-2">200 likes</span>
      <p className="mb-2">
        <span className="font-medium mr-2">Username</span>
        caption
      </p>
      <span onClick={()=>setOpen(true)} className="text-blue-500 cursor-pointer">View all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />     {/*Sending the props  .. to the cmment  */}
 
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}     // jo bhi value input mai ayegi wo sab text vale usestate mai save ho jayega
          onChange={changeEventHandler}
          className="outline-none text-sm w-full border p-2 rounded-lg"
        />
        { 
         text && (<span className="text-[#3BADF8] cursor-pointer mt-2 block text-center">Post</span>         //  if(text is written) then Post likha aa jayega i.e span tag will run
        )}
      </div>
    </div>
  );
}

export default Post;
