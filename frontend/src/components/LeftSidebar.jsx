import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

// basically side bar ke har ek element ke pass icon h aur kuch text h.So make an array and use map function to display all elemnts
const sidebarItems=[
    { icon:<Home/>, text:"Home"},
    { icon:<Search/>, text:"Search"},
    { icon:<TrendingUp/>, text:"Explore"},
    { icon:<MessageCircle/>, text:"Messages"},
    { icon:<Heart/>, text:"Notifications"},
    { icon:<PlusSquare/>, text:"Create"},
    { icon:(<Avatar  className='w-6 h-6 rounded-full overflow-hidden'>
        <AvatarImage   src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>), text:"Profile"},
    { icon:<LogOut/>, text:"Logout"},

]

function LeftSidebar() {
const navigate=useNavigate();

    // MAking logout feature
    // const logoutHandler=async ()=>{
    //     try{
            
    //         const res=await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true});
    //         if(res.data.success){
               
    //             navigate('/login');
    //             toast.success(res.data.message);
    //         }
            


    //     }
    //     catch(error){
    //         toast.error(error.response.data.message)
    //     }
    // }

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during logout:', error); // Debugging line
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
        }
    };


// sidebarHandler logic
const sidebarHandler=(textType)=>{
if(textType === 'Logout') logoutHandler();
}


  return (
    <div className='flex flex-col gap-1 h-screen text-lg border-r w-[16%] border-gray-300 fixed z-10'>
         <h1 className='text-center'>LOGO</h1>

{
   
    sidebarItems.map((item,index)=>{
        return (
            <>
            
                  
            <div onClick={()=>sidebarHandler(item.text)} key={index} className=' flex  gap-5 px-8 font-semibold relative hover:bg-gray-100 cursor-pointer rounded-lg py-5 '>
                {item.icon}
                <span className='text-center'> {item.text} </span>
            </div>
            
            
           
            </>
        )
    })
}
    </div>
  )
}

export default LeftSidebar