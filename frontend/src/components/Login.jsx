import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Login() {
    const [input, setInput] = useState({
       
        email: "",
        password: ""
    });

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()   // use useNavigate to navigate from one route to other after the login 
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }



    const SigninHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            setLoading(true)
            const res =await axios.post('http://localhost:8000/api/v1/user/login',input,{
                headers:{
                    'Content-Type':'application/json'
                },
                 withCredentials:true
            })
            if(res.data.success){
                navigate("/");
                toast.success(res.data.message);
                
                  //Jaise hi form submit/account created , wase hi sab input field remove kr do
            setInput({
             
                email: "",
                password: ""
            })
          
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

          
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <form onSubmit={SigninHandler} className="space-y-6">
                    <div>
                        <h1 className="text-center text-2xl font-bold">Logo</h1>
                        <p className="text-center text-sm text-gray-600 mt-1">Login to see photos and videos of your friends</p>
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

{/* Setting the loading symbol ,when page loads */}
                 {
                       loading ? <Button>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                       Please wait
                        </Button>:
                          null
                 }
              


                    <Button type="submit" className="w-full py-2 px-4 bg-black font-bold text-white rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                       Log in
                    </Button>
                    <span className="text-center">Doesn't have an account? <Link to="/signup" className="text-blue-600">SignUp</Link> </span>

                </form>
            </div>
        </div>
    );
}

export default Login;
