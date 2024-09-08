import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Signup() {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }



    const SignupHandler = async (e) => {
        e.preventDefault();
       
        try {
            setLoading(true)
            const res =await axios.post('http://localhost:8000/api/v1/user/register',input,{
                headers:{
                    'Content-Type':'application/json'
                },
                 withCredentials:true
            })
            if(res.data.success){
               
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: ""
                })
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

            //Jaise hi form submit/account created , wase hi sab input field remove kr do
           
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <form onSubmit={SignupHandler} className="space-y-6">
                    <div>
                        <h1 className="text-center text-2xl font-bold">Logo</h1>
                        <p className="text-center text-sm text-gray-600 mt-1">Signup to see photos and videos of your friends</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={changeEventHandler}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {
                       loading ? <Button>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                       Please wait
                        </Button>:
                          null
                 }
              

                    <Button type="submit" className="w-full py-2 px-4 bg-black font-bold text-white rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                        Sign Up
                    </Button>
                    <span className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link> </span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
